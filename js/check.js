// Vérification si l'utilisateur est connecté et donc possède un token

fetch("http://musics.logikstik.odns.fr/api/artists", {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(function (response) {
        return (response.json());
    })
    .then(function (json) {
        if (json == null) {
            window.location.replace("../index.html");
        }
    })