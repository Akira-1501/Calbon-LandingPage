/**
 * Sistema de Navegação do Sidebar
 * Gerencia o estado ativo dos itens do menu lateral
 */

/**
 * Inicialização quando a página carrega
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarSidebar();
});

/**
 * Inicializa o sistema de navegação do sidebar
 */
function inicializarSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    // Remover classe active de todos os itens
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Identificar a página atual
    const paginaAtual = identificarPaginaAtual();
    
    // Aplicar classe active no item correto
    if (paginaAtual) {
        const itemAtivo = document.querySelector(`a[href*="${paginaAtual}"]`);
        if (itemAtivo && itemAtivo.classList.contains('sidebar-item')) {
            itemAtivo.classList.add('active');
        }
    }
    
    // Adicionar efeito de clique nos itens
    adicionarEfeitoClique(sidebarItems);
}

/**
 * Identifica qual página está sendo exibida atualmente
 */
function identificarPaginaAtual() {
    const pathname = window.location.pathname;
    
    // Mapear caminhos para identificadores de página
    const mapeamentoPaginas = {
        '/Cadastro/inicio.html': 'inicio.html',
        '/Cadastro/visualizar-funcionario.html': 'visualizar-funcionario.html',
        '/Cadastro/visualizar-empresa.html': 'visualizar-empresa.html',
        '/Cadastro/inserir.html': 'inserir.html',
        '/Cadastro/editar.html': 'editar.html'
    };
    
    // Verificar mapeamento direto
    if (mapeamentoPaginas[pathname]) {
        return mapeamentoPaginas[pathname];
    }
    
    // Verificar se contém algum dos caminhos
    for (const [caminho, identificador] of Object.entries(mapeamentoPaginas)) {
        if (pathname.includes(identificador)) {
            return identificador;
        }
    }
    
    // Fallback: extrair nome do arquivo da URL
    const nomeArquivo = pathname.split('/').pop();
    if (nomeArquivo && nomeArquivo !== '') {
        return nomeArquivo;
    }
    
    return null;
}

/**
 * Adiciona efeito visual ao clicar nos itens do sidebar
 */
function adicionarEfeitoClique(sidebarItems) {
    sidebarItems.forEach(item => {
        // Pular item de logout
        if (item.href && item.href.includes('LandingPage')) {
            return;
        }
        
        item.addEventListener('click', function(e) {
            // Se for um link interno, adicionar efeito de clique
            if (this.href && this.href.includes('Cadastro')) {
                // Adicionar efeito de clique
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.8';
                
                // Remover efeito após 150ms
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.opacity = '';
                }, 150);
                
                // Adicionar classe active temporariamente
                sidebarItems.forEach(sidebarItem => {
                    sidebarItem.classList.remove('active');
                });
                this.classList.add('active');
                
                // Se for uma navegação para outra página, mostrar loading
                if (this.href !== window.location.href) {
                    mostrarLoadingNavegacao();
                }
            }
        });
        
        // Adicionar efeito de hover melhorado
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(2px)';
                this.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });
}

/**
 * Mostra indicador de carregamento durante navegação
 */
function mostrarLoadingNavegacao() {
    // Criar overlay de loading
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-navegacao';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 16, 28, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(2px);
    `;
    
    // Criar spinner
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(28, 213, 234, 0.3);
        border-top: 3px solid #1cd5ea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Adicionar CSS da animação
    if (!document.querySelector('#loading-spinner-style')) {
        const style = document.createElement('style');
        style.id = 'loading-spinner-style';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    loadingOverlay.appendChild(spinner);
    document.body.appendChild(loadingOverlay);
    
    // Remover loading após 1 segundo (tempo estimado de navegação)
    setTimeout(() => {
        if (loadingOverlay.parentNode) {
            loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
    }, 1000);
}

/**
 * Destacar item do sidebar baseado na URL atual (função auxiliar)
 */
function destacarItemAtual() {
    const pathname = window.location.pathname;
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    // Remover active de todos
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Aplicar active baseado na URL
    let itemAtivo = null;
    
    if (pathname.includes('inicio.html')) {
        itemAtivo = document.querySelector('a[href*="inicio.html"]');
    } else if (pathname.includes('visualizar-funcionario.html')) {
        itemAtivo = document.querySelector('a[href*="visualizar-funcionario.html"]');
    } else if (pathname.includes('visualizar-empresa.html')) {
        itemAtivo = document.querySelector('a[href*="visualizar-empresa.html"]');
    } else if (pathname.includes('inserir.html')) {
        itemAtivo = document.querySelector('a[href*="inserir.html"]');
    } else if (pathname.includes('editar.html')) {
        itemAtivo = document.querySelector('a[href*="editar.html"]');
    }
    
    if (itemAtivo) {
        itemAtivo.classList.add('active');
    }
}

// Exportar função para uso global (se necessário)
window.destacarItemAtual = destacarItemAtual;





