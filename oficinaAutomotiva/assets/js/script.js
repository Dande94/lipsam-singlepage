const btnMobile = document.getElementById('btnMobile');

function toggleMenu(){
    const nav = document.getElementById('headerMenu');
    nav.classList.toggle('active');
}

btnMobile.addEventListener('click', toggleMenu);