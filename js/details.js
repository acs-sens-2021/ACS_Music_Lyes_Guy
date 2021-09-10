let url = window.location.href;

sessionStorage.album_id = url.substring(url.lastIndexOf('=') + 1);

fetch("http://musics.logikstik.odns.fr/api/albums/" + sessionStorage.album_id, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (music) {
        let jaquette = document.querySelector("#jaquette");
        let my_ul = document.querySelector("ul");
        let album = document.querySelector(".name_album");

        album.textContent = "Album : " + music.name;
        jaquette.src = music.picture;

        console.log(music);
        // Fetch du nom d'artiste
        fetch("http://musics.logikstik.odns.fr" + music.artist, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => response.json())
            .then(function (json) {
                let artist = document.querySelector(".name_artist");

                artist.textContent = "Artiste : ";
                artist.textContent += json.username;
            })

        let cnt2 = 0;

        sessionStorage.min_track = music.tracks[cnt2];
        // boucle pour la liste des tracks

        for (let cnt = 0; music.tracks[cnt]; cnt += 1) {
            fetch("http://musics.logikstik.odns.fr" + music.tracks[cnt], {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
                .then((response) => response.json())
                .then(function (json) {
                    let temp = document.querySelector(".tmp_link");
                    let temp_clone = document.importNode(temp.content, true);
                    let balise = temp_clone.querySelector("a");

                    balise.href = "./play.html?id=" + json.id + "*";

                    if (music.tracks[cnt + 1]) {
                        let next;

                        next = music.tracks[cnt + 1];
                        next = next.substring(next.lastIndexOf('/') + 1);
                        balise.href += "?next=" + next;
                    }
                    if (music.tracks[cnt - 1]) {
                        let prev;

                        prev = music.tracks[cnt - 1];
                        prev = prev.substring(prev.lastIndexOf('/') + 1);
                        balise.href += "?prev=" + prev;
                    }

                    balise.style.gridColumn = "1";
                    balise.style.gridRow = cnt + 1;

                    balise = temp_clone.querySelector("li");
                    balise.textContent = (cnt + 1) + " - " + json.name;

                    my_ul.appendChild(temp_clone);
                    cnt2 = cnt;
                })
                .then(function () {
                    sessionStorage.max_track = music.tracks[cnt2];
                })
        }
    })