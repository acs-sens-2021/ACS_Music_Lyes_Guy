// Création du contenu à display sur le carousel de la page d'Accueil

fetch("http://musics.logikstik.odns.fr/api/albums/?order[created_at]=desc&page=1", {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (json) {
        for (let cnt = 0; cnt < 20; cnt += 1) {
            // Je cherche mon "elements" qui va contenir mes diapo et je créé une diapo
            let elems = document.querySelector(".elements");
            let elem = document.createElement("div");
            let pict = document.createElement("img");

            // J'ajoute la classe "element" (sans le S) à ma div
            elem.classList.add("element");
            // J'indique l'image source et le alt de mon image de diapo
            pict.src = json[cnt].picture;
            pict.alt = json[cnt].id;
            // Je donne un Z-Index & je met le width 100%
            pict.style.width = "100%";
            pict.style.zIndex = "200";
            // J'ajoute la classe img_diapo à mon image de diapo
            pict.classList.add("img_diapo");
            // Je colle mon image dans mon elem puis je colle mon elem dans ma liste "elements"
            elem.appendChild(pict);
            elems.appendChild(elem);
        }
        // J'appelle la fonction du carousel qui permet son fonctionnement
        my_carousel();
    })



// Ajouts des dernières musiques écoutées dans les 8 cases

fetch("http://musics.logikstik.odns.fr/api/albums/?order[recently_played]=desc", {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (json) {
        // Boucle qui va placer dans chaque case : l'image source et le nom en guise d'alt
        for (let cnt = 1; cnt <= 8; cnt += 1) {
            let case_name = ".acase" + cnt;
            let my_case = document.querySelector(case_name);

            my_case.src = json[cnt - 1].picture;
            my_case.alt = json[cnt - 1].id;
            console.log(json[cnt - 1]);
        }
    })


// Mise en place du carousel

function my_carousel() {
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
}



// Mise en place de la redirection des images du carousel et des cases vers les pages correspondantes 
// avec les bonnes data.

let case1 = document.querySelector(".acase1");
let case2 = document.querySelector(".acase2");
let case3 = document.querySelector(".acase3");
let case4 = document.querySelector(".acase4");
let case5 = document.querySelector(".acase5");
let case6 = document.querySelector(".acase6");
let case7 = document.querySelector(".acase7");
let case8 = document.querySelector(".acase8");

case1.addEventListener("click", function () {
    sessionStorage.album_id = this.alt;
    window.location = "./details.html";
})

case2.addEventListener("click", function () {
    sessionStorage.album_id = case2.alt;
    window.location = "./details.html";
})

case3.addEventListener("click", function () {
    sessionStorage.album_id = case3.alt;
    window.location = "./details.html";
})

case4.addEventListener("click", function () {
    sessionStorage.album_id = case4.alt;
    window.location = "./details.html";
})

case5.addEventListener("click", function () {
    sessionStorage.album_id = case5.alt;
    window.location = "./details.html";
})

case6.addEventListener("click", function () {
    sessionStorage.album_id = case6.alt;
    window.location = "./details.html";
})

case7.addEventListener("click", function () {
    sessionStorage.album_id = case7.alt;
    window.location = "./details.html";
})

case8.addEventListener("click", function () {
    sessionStorage.album_id = case8.alt;
    window.location = "./details.html";
})