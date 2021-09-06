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
            let temp = document.querySelector(".temp_elem");
            let temp_clone = document.importNode(temp.content, true);
            let balise = temp_clone.querySelector("a");

            // Je colle le lien avec l'album_id dans mon href
            balise.href = "./details.html?id=" + json[cnt].id;

            // Je redéfini ma balise sur l'img du template
            balise = temp_clone.querySelector("img");

            // J'indique l'image source et le alt de mon image de diapo
            balise.src = json[cnt].picture;
            balise.alt = json[cnt].id;
            
            // Je donne un Z-Index & je met le width 100%
            balise.style.width = "100%";
            balise.style.zIndex = "200";
            
            // Je colle mon template dans ma liste "elements"
            elems.appendChild(temp_clone);
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
        let wrapp = document.querySelector(".awrapper");

        for (let cnt = 1; cnt <= 8; cnt += 1) {
            // Je créé un clone de mon template
            let temp = document.querySelector(".temp_case");
            let temp_clone = document.importNode(temp.content, true);
            let balise = temp_clone.querySelector("a");
            let class_case = "acase" + cnt;

            // Je remplis les données de la balise a de mon template
            balise.href = "./details.html?id=" + json[cnt - 1].id;
            balise.classList.add(class_case);

            // Je redéfini ma variable balise sur l'img du template et la remplis avec les data correspondantes
            balise = temp_clone.querySelector("img");
            balise.src = json[cnt - 1].picture;
            balise.alt = json[cnt - 1].id;
            balise.style.width = "100%";

            // J'ajoute mon clone de template dans mon wrapper pour cases
            wrapp.appendChild(temp_clone);
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