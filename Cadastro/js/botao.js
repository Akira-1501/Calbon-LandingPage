// Pega todos os links da sidebar
const sidebarItems = document.querySelectorAll(".sidebar-item");

// Pega a URL atual (apenas o nome do arquivo, ex: "inserir.html")
const currentPage = window.location.pathname.split("/").pop();

sidebarItems.forEach(item => {
  const itemPage = item.getAttribute("href");

  // Se o href do link for igual ao arquivo atual → ativa
  if (itemPage === currentPage) {
    item.classList.add("active");
  }
});
