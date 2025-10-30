let empresaSelecionada = null;

function abrirModalConfirmacao(id) {
  empresaSelecionada = id;
  document.getElementById('modalConfirmacao').style.display = 'block';
}

function fecharModalConfirmacao() {
  document.getElementById('modalConfirmacao').style.display = 'none';
  empresaSelecionada = null;
}

function confirmarExclusao() {
  if (empresaSelecionada !== null) {
    excluirRegistroEmpresa(empresaSelecionada);
    fecharModalConfirmacao();
  }
}
