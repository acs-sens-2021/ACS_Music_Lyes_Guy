let btn = document.querySelector(".connecter");
let user = document.querySelector(".mail");
let mdp = document.querySelector(".mdp");

btn.addEventListener("click", function () {
    fetch("http://musics.logikstik.odns.fr/api/login", {
            method: "POST",
            body: JSON.stringify({
                username: user.value,
                password: mdp.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        .then(function (response) {
            return (response.json());
        })
        .then(function (json) {
            sessionStorage.setItem("token", json.token);
            window.location.replace("./accueil.html");
        })
});