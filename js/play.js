let url = window.location.href;

sessionStorage.track_id = url.substring(url.lastIndexOf('=') + 1);

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