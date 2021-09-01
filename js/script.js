// Carousel

const diapo = document.querySelector(".diapo");

let timer, elements, slides, slideWidth;

elements = document.querySelector(".elements");

slides = Array.from(elements.children);

let next = document.querySelector("#nav-droite");
let prev = document.querySelector("#nav-gauche");

let cnt = 0

slideWidth = diapo.getBoundingClientRect().width;

next.addEventListener("click", slideNext);
prev.addEventListener("click", slidePrev);

function slideNext() {
    cnt += 1;
    if (cnt == slides.length) {
        cnt = 0;
    }

    let decal = -slideWidth * cnt;
    elements.style.transform = `translateX(${decal}px`
}

function slidePrev() {
    cnt -= 1;
    if (cnt < 0) {
        cnt = slides.length - 1;
    }
    let decal = -slideWidth * cnt;
    elements.style.transform = `translateX(${decal}px`;
}

