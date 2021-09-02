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
            let elems = document.querySelector(".elements");
            let elem = document.createElement("div");
            let pict = document.createElement("img");

            elem.classList.add("element");
            pict.src = json[cnt].picture;
            pict.alt = json[cnt].name;
            pict.style.width = "100%";
            pict.style.zIndex = "200";
            pict.classList.add("img_diapo");
            elem.appendChild(pict);
            elems.appendChild(elem);
        }
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
            let case_name = ".acase" + cnt;
            console.log(case_name);
            let my_case = document.querySelector(case_name);

            console.log(my_case);
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