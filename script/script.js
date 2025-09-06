function toggleClassBasedOnViewportWidth() {
  if (projectContainerElement) {
    if (window.innerWidth < 768.5) {
      projectContainerElement.classList.remove("container");
    } else {
      projectContainerElement.classList.add("container");
    }
  }

  if (footerTextElement) {
    if (window.innerWidth < 801) {
      footerTextElement.classList.add("mb-3");
    } else {
      footerTextElement.classList.remove("mb-3");
    }
  }

  if (footerSpanElement) {
    if (window.innerWidth < 991) {
      footerSpanElement.classList.replace("ps-2", "ps-1");
    } else {
      footerSpanElement.classList.replace("ps-1","ps-2");
    }
  }
}

function activateHamburger() {
  document.querySelector(".hamburger").classList.toggle("active");
  document.querySelector(".nav-menu").classList.toggle("active");
}

let projectContainerElement = document.querySelector("#projects-display");
let footerTextElement = document.querySelector(".contact-me-box div");
let footerSpanElement = document.querySelector(
  ".contact-me-box span.text-muted"
);
toggleClassBasedOnViewportWidth();

let hamburgerElement = document.querySelector(".hamburger");
hamburgerElement.addEventListener("click", activateHamburger);

window.addEventListener("resize", toggleClassBasedOnViewportWidth);
