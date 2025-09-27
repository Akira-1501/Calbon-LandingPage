import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Config Firebase - preencha com suas credenciais
const firebaseConfig = {
  // sua config aqui
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const estadosBR = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
const cargos = ["Gerente","Analista de Dados","Desenvolvedora Front-End","Gestor de Projetos","Analista de RH","Administrador de Redes","Coordenadora de TI","Analista de Segurança","UX Designer","Engenheiro de Software","QA Tester","Desenvolvedor Back-End","Product Owner","Scrum Master","Designer Gráfico","DevOps Engineer"];

const form = document.getElementById('formEditarFuncionario');
const inputCracha = document.getElementById('numero_cracha');
const inputNome = document.getElementById('nome');
const inputSobrenome = document.getElementById('sobrenome');
const inputEmail = document.getElementById('email');
const selectCargo = document.getElementById('cargo_id');
const selectLocalizacao = document.getElementById('localizacao_id');

const toastElm = document.getElementById('toast');
const toastIcon = document.getElementById('toastIcon');
const toastMsg = document.getElementById('toastMsg');

function showToast(msg, icon) {
  toastMsg.textContent = msg;
  toastIcon.src = icon;
  toastElm.classList.remove('hidden');
  setTimeout(() => toastElm.classList.add('hidden'), 3000);
}

// Preenche selects de cargo e localização
function preencherSelects() {
  cargos.forEach(c => {
    const option = document.createElement('option');
    option.value = c;
    option.text = c;
    selectCargo.appendChild(option);
  });

  estadosBR.forEach(e => {
    const option = document.createElement('option');
    option.value = e;
    option.text = e;
    selectLocalizacao.appendChild(option);
  });
}

// Pega parâmetro da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Carrega dados do funcionário pelo crachá
async function carregarFuncionario(id) {
  const funcionarioRef = ref(db, `funcionarios/${id}`);
  const snapshot = await get(funcionarioRef);

  if (!snapshot.exists()) {
    alert('Funcionário não encontrado!');
    window.location.href = 'visualizar.html';
    return;
  }

  const f = snapshot.val();
  inputCracha.value = f.numero_cracha;
  inputNome.value = f.nome;
  inputSobrenome.value = f.sobrenome;
  inputEmail.value = f.email;

  // Setar selects
  selectCargo.value = f.cargo;
  selectLocalizacao.value = f.localizacao;
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Validar selects
  if (!cargos.includes(selectCargo.value)) {
    alert('Selecione um cargo válido');
    return;
  }

  if (!estadosBR.includes(selectLocalizacao.value)) {
    alert('Selecione uma localização válida');
    return;
  }

  // Montar email automático (nome + último sobrenome + @calbon.com)
  const nome = inputNome.value.trim();
  const sobrenome = inputSobrenome.value.trim();
  const ultimoSobrenome = sobrenome.split(' ').pop().toLowerCase();
  const email = `${nome.toLowerCase()}.${ultimoSobrenome}@calbon.com`;

  // Atualizar no Firebase
  const id = inputCracha.value;
  const funcionarioRef = ref(db, `funcionarios/${id}`);

  try {
    await update(funcionarioRef, {
      nome,
      sobrenome,
      email,
      cargo: selectCargo.value,
      localizacao: selectLocalizacao.value
    });
    showToast('Funcionário atualizado com sucesso!', 'img/check.svg');
    setTimeout(() => window.location.href = 'visualizar.html', 1500);
  } catch (err) {
    alert('Erro ao atualizar: ' + err.message);
  }
});

window.addEventListener('load', () => {
  preencherSelects();
  const id = getQueryParam('id');
  if (!id) {
    alert('ID do funcionário não informado');
    window.location.href = 'visualizar.html';
    return;
  }
  carregarFuncionario(id);
});
