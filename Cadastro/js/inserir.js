const estadosBR = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
    "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];
  
  const cargos = [
    "Gerente", "Desenvolvedor", "Analista", "Analista de Dados",
    "Desenvolvedora Front-End", "Gestor de Projetos", "Analista de RH",
    "Administrador de Redes", "Coordenadora de TI", "Analista de Segurança",
    "UX Designer", "Engenheiro de Software", "QA Tester",
    "Product Owner", "Scrum Master", "Designer Gráfico", "DevOps Engineer"
  ];
  
  const form = document.getElementById('formFuncionario');
  const inputNome = document.getElementById('nome');
  const inputSobrenome = document.getElementById('sobrenome');
  const inputSenha = document.getElementById('senha_hash');
  const inputCargo = document.getElementById('cargo_id');
  const inputLocalizacao = document.getElementById('localizacao_id');
  
  function gerarCrachaAleatorio() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let cracha = '';
    for (let i = 0; i < 8; i++) {
      cracha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return cracha;
  }
  
  function montarEmail(nome, sobrenome) {
    const ultimoSobrenome = sobrenome.trim().split(' ').pop().toLowerCase();
    const nomeLower = nome.trim().toLowerCase();
    return `${nomeLower}.${ultimoSobrenome}@calbon.com`;
  }
  
  function validarSiglaEstado(sigla) {
    return estadosBR.includes(sigla.toUpperCase());
  }
  
  function validarCargo(cargo) {
    return cargos.includes(cargo.trim());
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const nome = inputNome.value.trim();
    const sobrenome = inputSobrenome.value.trim();
    const senha = inputSenha.value.trim();
    const cargo = inputCargo.value.trim();
    const localizacao = inputLocalizacao.value.trim().toUpperCase();
  
    if (!validarCargo(cargo)) {
      alert('Cargo inválido. Escolha um cargo da lista ou digite corretamente.');
      return;
    }
  
    if (!validarSiglaEstado(localizacao)) {
      alert('Sigla de estado inválida. Use uma das 27 siglas brasileiras.');
      return;
    }
  
    const numeroCracha = gerarCrachaAleatorio();
    const email = montarEmail(nome, sobrenome);
  
    // Pega a lista atual do localStorage
    const lista = JSON.parse(localStorage.getItem('funcionarios')) || [];
  
    // Novo funcionário
    const novoFuncionario = {
      numeroCracha,
      nome,
      sobrenome,
      email,
      senha_hash: senha,
      cargo,
      localizacao
    };
  
    // Adiciona o novo funcionário
    lista.push(novoFuncionario);
  
    // Salva tudo no localStorage
    localStorage.setItem('funcionarios', JSON.stringify(lista));
  
    // Salva no sessionStorage para mostrar o toast na página visualizar.html
    sessionStorage.setItem('insercaoSucesso', 'true');
    sessionStorage.setItem('funcionarioInserido', JSON.stringify(novoFuncionario));
  
    // Redireciona para visualizar.html onde o toast será mostrado
    window.location.href = 'visualizar.html';
  });
  