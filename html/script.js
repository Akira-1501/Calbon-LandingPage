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

// window.addEventListener('scroll', function () {
//     let imagemHeader = this.document.getElementsByClassName('logoheader');

//     if (window.scrollY > 50) {
//         imagemHeader[0].src = '../assets/icone-logo.png';
//         imagemHeader[0].style.opacity = '0.8';
//     } else {
//         imagemHeader[0].src = '../assets/icone-logo-azulEscuro.png';
//         imagemHeader[0].style.opacity = '0.8';
//     }
// });

window.addEventListener('scroll', () => {
    let ulList = this.document.getElementById('ul-list');

    if (window.scrollY > 50) {
        ulList.classList.add('ul-list-scrolled');
    }
    else {
        ulList.classLit.remove('ul-list-scrolled');
    }
});