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
            if (response.status == 401) {
                return (null);
            }
            return (response.json());
        })
        .then(function (json) {
            if (json == null) {
                let user = document.querySelector(".mail");
                let mdp = document.querySelector(".mdp");

                user.style.border = "solid red 2px";
                mdp.style.border = "solid red 2px";
            } else {
                sessionStorage.setItem("token", json.token);
                window.location.replace("./accueil.html");
            }
        })
});