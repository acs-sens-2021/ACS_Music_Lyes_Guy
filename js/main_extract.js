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
            let _link = document.createElement("a");
            let elem = document.createElement("div");
            let pict = document.createElement("img");

            _link.href = "./details.html";
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
            _link.appendChild(pict);
            elem.appendChild(_link);
            elems.appendChild(elem);
        }
        // J'appelle la fonction du carousel qui permet son fonctionnement
        my_carousel();
    })

fetch("http://musics.logikstik.odns.fr/api/tracks/?order=recently_played", {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (json) {
        // Boucle qui va placer dans chaque case : l'image source et le nom en guise d'alt
        for (let cnt = 1; cnt <= 8; cnt += 1) {
            fetch("http://musics.logikstik.odns.fr" + json[cnt].album, {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
                .then((response) => response.json())
                .then(function (json) {
                    // On choisi la case numéro [cnt]
                    let case_name = ".image_track" + cnt;
                    let my_case = document.querySelector(case_name);

                    // On met l'image source et l'alt de l'image à la case [cnt]
                    my_case.src = json.picture;
                    my_case.alt = json.name;
                })
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