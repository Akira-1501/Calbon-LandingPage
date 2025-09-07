document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });
});

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // remover active
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        // ativar clicado
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

window.addEventListener('scroll', () => {
    const ulList = document.getElementById('ul-list');
    if (!ulList) return; // se não existe, não faz nada

    if (window.scrollY > 50) {
        ulList.classList.add('ul-list-scrolled');
    } else {
        ulList.classList.remove('ul-list-scrolled');
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll('.tab-time');
  const tabContents = document.querySelectorAll('.tab-content-time');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(this.dataset.tab).classList.add('active');
    });
  });
});