
function abrirModal() {
  const modal = document.getElementById('modalConfirmacao');
  modal.style.display = 'flex';
}

function fecharModal() {
  const modal = document.getElementById('modalConfirmacao');
  modal.style.display = 'none';
}

function confirmarExclusao() {
  fecharModal();
  alert("Item excluído com sucesso!");
}
