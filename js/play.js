let url = window.location.href;
let bnext = document.querySelector(".bnext");
let bprev = document.querySelector(".bprev");

let max_next = sessionStorage.max_track.substring(sessionStorage.max_track.lastIndexOf('/') + 1);
let max_prev = sessionStorage.min_track.substring(sessionStorage.min_track.lastIndexOf('/') + 1);

sessionStorage.track_id = url.substring(url.lastIndexOf("id=") + 3, url.lastIndexOf("*"));

let prev = url.substring(url.lastIndexOf("prev=") + 5);
let next;

if ((parseInt(sessionStorage.track_id) - 1) >= max_prev) {
    next = url.substring(url.lastIndexOf("next=") + 5, url.lastIndexOf("?prev"));
} else {
    next = url.substring(url.lastIndexOf("next=") + 5);
}

nb = (Math.floor(chance.floating({
    min: max_prev,
    max: max_next
})))

let rand_button = document.querySelector(".mp_case4");

rand_button.href = "./play.html?id=" + nb + "*";

if ((nb + 1) <= max_next) {
    rand_button.href += "?next=" + (nb + 1);
}

if ((nb - 1) >= max_prev) {
    rand_button.href += "?prev=" + (nb - 1);
}

if ((parseInt(sessionStorage.track_id) + 1) <= max_next) {
    bnext.href = "./play.html?id=" + next + "*";
    if ((parseInt(sessionStorage.track_id) + 2) <= max_next) {
        bnext.href += "?next=" + (parseInt(next) + 1);
    }
    bnext.href += "?prev=" + sessionStorage.track_id;
}

if ((parseInt(sessionStorage.track_id) - 1) >= max_prev) {
    bprev.href = "./play.html?id=" + prev + "*";
    bprev.href += "?next=" + sessionStorage.track_id;
    if ((parseInt(sessionStorage.track_id) - 2) >= max_prev) {
        bprev.href += "?prev=" + (parseInt(prev) - 1);
    }
}

fetch("http://musics.logikstik.odns.fr/api/tracks/" + sessionStorage.track_id, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (json) {
        let music = document.querySelector(".n_musique");

        music.textContent = "Titre : ";
        music.textContent += json.name;
        fetch("http://musics.logikstik.odns.fr" + json.album, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => response.json())
            .then(function (json) {
                let album = document.querySelector(".n_album");
                let jaquette = document.querySelector("#jaquette");

                jaquette.src = json.picture;
                album.textContent = "Album : \n";
                album.textContent += json.name;
                fetch("http://musics.logikstik.odns.fr" + json.artist, {
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    })
                    .then((response) => response.json())
                    .then(function (json) {
                        let artist = document.querySelector(".n_artiste");

                        artist.textContent = "Artiste : "
                        artist.textContent += json.username;
                    })
            })
    })