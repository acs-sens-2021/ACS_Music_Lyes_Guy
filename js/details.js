let url = window.location.href;

sessionStorage.album_id = url.substring(url.lastIndexOf('=') + 1);

fetch("http://musics.logikstik.odns.fr/api/albums/" + sessionStorage.album_id, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (json) {
        let jaquette = document.querySelector("#jaquette");
        let my_ul = document.querySelector("ul");

        jaquette.src = json.picture;
        console.log(json.tracks);

        // Fetch du nom d'artiste
        fetch("http://musics.logikstik.odns.fr" + json.artist, {
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

        // boucle pour la liste des tracks
        for (let cnt = 0; json.tracks[cnt]; cnt += 1) {
            fetch("http://musics.logikstik.odns.fr" + json.tracks[cnt], {
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

                    balise.href = "./play.html?id=" + json.id;
                    balise.style.gridColumn = "1";
                    balise.style.gridRow = cnt + 1;

                    balise = temp_clone.querySelector("li");
                    balise.textContent = (cnt + 1) + " - " + json.name;


                    my_ul.appendChild(temp_clone);
                })
        }
    })