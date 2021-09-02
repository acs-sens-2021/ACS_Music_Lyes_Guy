// Création du contenu à display sur la page d'Accueil

let my_token = "Basic " + sessionStorage.getItem("token");

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
            pict.alt = json[cnt].name;
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
// 
fetch("http://musics.logikstik.odns.fr/api/albums/?order[recently_played]=desc&page1", {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (json) {
        for (let cnt = 1; cnt <= 8; cnt += 1) {
            // je défini le nom de la case que je vais chercher (ex: acase1, acase2 etc) en assemblant
            // le compteur & ".acase" puis je vais la chercher
            let case_name = ".acase" + cnt;
            let my_case = document.querySelector(case_name);

            // Je défini l'image source et le alt de ma "acase"
            my_case.src = json[cnt].picture;
            my_case.alt = json[cnt].name;
        }
    })


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