sessionStorage.album_id = "130";

fetch("http://musics.logikstik.odns.fr/api/albums/" + sessionStorage.album_id, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(function (json) {
        let jaquette = document.querySelector("#jaquette");
        console.log(json);

        jaquette.src = json.picture;
        for (let cnt = 0; json.tracks[cnt]; cnt += 1) {
            fetch("http://musics.logikstik.odns.fr" + json.tracks[cnt], {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => response.json())
            .then(function(json) {
                let my_ul = document.querySelector("ul");
                let my_li = document.createElement("li");

                my_li.textContent = json.name;
                my_ul.appendChild(my_li); 
            })
        }
    })