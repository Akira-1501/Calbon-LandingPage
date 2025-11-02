// Funcionalidade do carrossel para a seção de equipe
document.addEventListener('DOMContentLoaded', function() {
    // Obter todos os containers de carrossel
    const carrossels = document.querySelectorAll('.container-cartoes-equipe');
    
    carrossels.forEach(carrossel => {
        const idCarrossel = carrossel.id;
        const setaEsquerda = document.querySelector(`.seta-carrossel-esquerda[data-carrossel="${idCarrossel}"]`);
        const setaDireita = document.querySelector(`.seta-carrossel-direita[data-carrossel="${idCarrossel}"]`);
        
        if (!setaEsquerda || !setaDireita) return;
        
        // Calcular quantidade de scroll (largura de um card + gap)
        const quantidadeScroll = () => {
            const primeiroCartao = carrossel.querySelector('.cartao-equipe');
            if (!primeiroCartao) return 300;
            const larguraCartao = primeiroCartao.offsetWidth;
            const espacamento = 30; // Espaçamento entre cards
            return larguraCartao + espacamento;
        };
        
        // Handler do clique na seta esquerda
        setaEsquerda.addEventListener('click', () => {
            carrossel.scrollBy({
                left: -quantidadeScroll(),
                behavior: 'smooth'
            });
        });
        
        // Handler do clique na seta direita
        setaDireita.addEventListener('click', () => {
            carrossel.scrollBy({
                left: quantidadeScroll(),
                behavior: 'smooth'
            });
        });
        
        // Opcional: Controlar visibilidade das setas baseado na posição do scroll
        const atualizarVisibilidadeSeta = () => {
            const estaNoInicio = carrossel.scrollLeft <= 10;
            const estaNoFim = carrossel.scrollLeft >= carrossel.scrollWidth - carrossel.clientWidth - 10;
            
            setaEsquerda.style.opacity = estaNoInicio ? '0.5' : '1';
            setaEsquerda.style.pointerEvents = estaNoInicio ? 'none' : 'auto';
            
            setaDireita.style.opacity = estaNoFim ? '0.5' : '1';
            setaDireita.style.pointerEvents = estaNoFim ? 'none' : 'auto';
        };
        
        // Verificação inicial
        atualizarVisibilidadeSeta();
        
        // Atualizar no scroll
        carrossel.addEventListener('scroll', atualizarVisibilidadeSeta);
        
        // Atualizar no redimensionamento da janela
        window.addEventListener('resize', () => {
            atualizarVisibilidadeSeta();
        });
    });
});