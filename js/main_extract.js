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
            let elem = document.createElement("a");
            let pict = document.createElement("img");

            console.log(json[cnt].id);
            // J'ajoute la classe "element" (sans le S) à ma div
            elem.classList.add("element");
            elem.href = "./details.html?id=" + json[cnt].id;
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
        // Boucle qui va placer chaque case : le lien, l'image source et le nom en guise d'alt
        for (let cnt = 1; cnt <= 8; cnt += 1) {
            let wrapp = document.querySelector(".awrapper");
            let c_case = document.createElement("a");
            let img_case = document.createElement("img");
            let class_case = "acase" + cnt;

            c_case.classList.add(class_case);
            c_case.href = "./details.html?id=" + json[cnt - 1].id;
            img_case.src = json[cnt - 1].picture;
            img_case.alt = json[cnt - 1].id;
            img_case.style.width = "100%";
            c_case.appendChild(img_case);
            wrapp.appendChild(c_case);
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