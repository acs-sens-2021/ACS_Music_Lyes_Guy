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
        for (let cnt = 0; json.tracks[cnt]; cnt += 1) {
            fetch("http://musics.logikstik.odns.fr" + json.tracks[cnt], {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
                .then((response) => response.json())
                .then(function (json) {
                    let my_li = document.createElement("li");
                    let my_link = document.createElement("a");

                    my_link.href = "./play.html?id=" + json.id;
                    my_li.textContent = json.name;
                    my_link.appendChild(my_li);
                    my_ul.appendChild(my_link);
                })
        }
    })