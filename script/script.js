function activateHamburger(){
document.querySelector(".hamburger").classList.toggle("active");
document.querySelector(".nav-menu").classList.toggle("active");
}

let hamburgerElement = document.querySelector(".hamburger");
hamburgerElement.addEventListener("click",activateHamburger);