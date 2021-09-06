sessionStorage.track_id = "1201";

fetch("http://musics.logikstik.odns.fr/api/tracks/" + sessionStorage.track_id, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (json) {
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
                album.textContent = json.name;
                fetch("http://musics.logikstik.odns.fr" + json.artist, {
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    })
                    .then((response) => response.json())
                    .then(function (json) {
                        let artist = document.querySelector(".n_artiste");

                        console.log(json);
                        artist.textContent = json.username;
                    })
            })
    })