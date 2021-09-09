let url = window.location.href;
let next = url.substring(url.lastIndexOf("next=") + 5, url.lastIndexOf("?prev"));
let prev = url.substring(url.lastIndexOf("prev=") + 5);
let bnext = document.querySelector(".bnext");
let bprev = document.querySelector(".bprev");

bnext.href = "./play.html?id=" + next;
console.log(bnext.href);

bprev.href ="./play.html?id=" + prev;

sessionStorage.track_id = url.substring(url.lastIndexOf("id=") + 3, url.lastIndexOf("?next"));
console.log(sessionStorage.track_id);

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