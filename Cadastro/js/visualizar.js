const tabelaBody = document.querySelector('#tabelaFuncionarios tbody');
const buscaInput = document.getElementById('busca');
const selectQtd = document.getElementById('selectQtd');
const controlesPag = document.getElementById('controlesPag');

// Criar toast dinamicamente para notificações
function showToast(msg) {
  const existingToast = document.getElementById('custom-toast');
  if(existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.id = 'custom-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.background = '#23232a';
  toast.style.border = '1px solid #0cacbf';
  toast.style.color = '#fff';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '6px';
  toast.style.zIndex = 1000;
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 0 10px rgba(12, 172, 191, 0.7)';
  toast.textContent = msg;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.5s ease';
    toast.style.opacity = '0';
  }, 2500);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
let paginaAtual = 1;
let itensPorPagina = parseInt(selectQtd.value);
let filtroNome = '';

// Detecta se veio de inserção recente via sessionStorage para mostrar toast
if(sessionStorage.getItem('insercaoSucesso')) {
  const f = JSON.parse(sessionStorage.getItem('funcionarioInserido'));
  if(f) {
    showToast(`Usuário ${f.nome} ${f.sobrenome} inserido com sucesso!`);
  }
  sessionStorage.removeItem('insercaoSucesso');
  sessionStorage.removeItem('funcionarioInserido');
}

document.getElementById('btnCadastrar').addEventListener('click', () => {
  window.location.href = 'inserir.html';
});

selectQtd.addEventListener('change', () => {
  itensPorPagina = parseInt(selectQtd.value);
  paginaAtual = 1;
  renderTabela();
});

buscaInput.addEventListener('input', () => {
  filtroNome = buscaInput.value.toLowerCase();
  paginaAtual = 1;
  renderTabela();
});

function renderTabela() {
  tabelaBody.innerHTML = '';

  const filtrados = funcionarios.filter(f => f.nome.toLowerCase().includes(filtroNome));
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const pagina = filtrados.slice(inicio, inicio + itensPorPagina);

  for (let i = 0; i < pagina.length; i++) {
    const funcionario = pagina[i];
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${funcionario.numeroCracha}</td>
      <td>${funcionario.nome}</td>
      <td>${funcionario.sobrenome}</td>
      <td>${funcionario.email}</td>
      <td>${funcionario.cargo}</td>
      <td>${funcionario.localizacao}</td>
      <td>
        <div class="menu-acoes" style="position: relative;">
          <button class="botao-acoes" onclick="abrirMenu(${i})" aria-label="Abrir menu de ações">⋮</button>
          <div id="menu-${i}" class="popup-menu" style="display:none; position: absolute; right: 0; top: 24px; background: #23232a; border: 1px solid #2b2b36; border-radius: 4px; min-width: 110px; z-index: 10; flex-direction: column;">
            <button onclick="editarFuncionario('${funcionario.numeroCracha}')">Editar</button>
            <button onclick="removerFuncionario(${i})">Remover</button>
          </div>
        </div>
      </td>
    `;

    tabelaBody.appendChild(tr);
  }

  renderControles(filtrados.length);
}

function abrirMenu(id) {
  // Fecha todos os menus antes
  document.querySelectorAll('.popup-menu').forEach(el => el.style.display = 'none');

  const menu = document.getElementById(`menu-${id}`);
  if (menu) {
    menu.style.display = 'flex';
  }

  setTimeout(() => {
    document.addEventListener('click', fecharMenuFora, { once: true });
  }, 0);
}

function fecharMenuFora(event) {
  if (!event.target.closest('.menu-acoes')) {
    document.querySelectorAll('.popup-menu').forEach(el => el.style.display = 'none');
  }
}

function editarFuncionario(numeroCracha) {
  window.location.href = `editar.html?cracha=${numeroCracha}`;
}

function removerFuncionario(indexNaPagina) {
  const filtrados = funcionarios.filter(f => f.nome.toLowerCase().includes(filtroNome));
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const realIndex = inicio + indexNaPagina;

  if (realIndex < 0 || realIndex >= funcionarios.length) return;

  const func = funcionarios[realIndex];
  funcionarios.splice(realIndex, 1);
  localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
  renderTabela();
  showToast(`Usuário ${func.nome} ${func.sobrenome} excluído com sucesso!`);
}

function renderControles(total) {
  controlesPag.innerHTML = '';
  const totalPaginas = Math.ceil(total / itensPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === paginaAtual ? 'pagina-ativa' : '';
    btn.onclick = () => {
      paginaAtual = i;
      renderTabela();
    };
    controlesPag.appendChild(btn);
  }
}

window.abrirMenu = abrirMenu;
window.fecharMenuFora = fecharMenuFora;
window.editarFuncionario = editarFuncionario;
window.removerFuncionario = removerFuncionario;

renderTabela();
