// /AreaRestrita/js/modal-confirmacao.js

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalConfirmacao");
  const botoesCancelar = modal.querySelectorAll(".cancelar");
  const botoesConfirmar = modal.querySelectorAll(".confirmar");

  function abrirModal() {
    modal.style.display = "flex";
  }

  function fecharModal() {
    modal.style.display = "none";
  }

  function confirmarExclusao() {
    fecharModal();
    alert("Item excluído com sucesso!");
  }

  // Botões "Excluir" na tabela
  const botoesExcluir = document.querySelectorAll(".btn-excluir");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", abrirModal);
  });

  // Botões "Cancelar" dentro do modal
  botoesCancelar.forEach((botao) => {
    botao.addEventListener("click", fecharModal);
  });

  // Botões "Confirmar" dentro do modal
  botoesConfirmar.forEach((botao) => {
    botao.addEventListener("click", confirmarExclusao);
  });

  // Fechar ao clicar fora do conteúdo (no fundo escuro)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      fecharModal();
    }
  });

  // Fechar com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      fecharModal();
    }
  });
});
