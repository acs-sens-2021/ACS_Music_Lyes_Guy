let btn = document.querySelector(".valider");
let u_name = document.querySelector(".nom");
let user = document.querySelector(".mail");
let mdp = document.querySelector(".mdp");

btn.addEventListener("click", function () {
    if (u_name.value && user.value && mdp.value) {
        var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$/;

        if (mdp.value.match(decimal)) {
            let error_mdp = document.querySelector(".center");


            u_name.style.border = "solid black 1.5px";
            user.style.border = "solid black 1.5px";
            mdp.style.border = "solid black 1.5px";
            error_mdp.style.border = "none";
            error_mdp.textContent = "";
            fetch("http://musics.logikstik.odns.fr/api/users", {
                    method: "POST",
                    body: JSON.stringify({
                        name: u_name.value,
                        email: user.value,
                        password: mdp.value
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
                .then(function (response) {
                    if (response.status != 201) {
                        u_name.style.border = "3px solid red";
                        user.style.border = "3px solid red";
                        mdp.style.border = "3px solid red";
                    }
                })
        } else {
            let error_mdp = document.querySelector(".center");

            error_mdp.style.border = "solid black 1.5px";
            error_mdp.textContent = "Veuillez respecter le format de mot de passe de l'ANSSI (au minimum 12 caractères avec une majuscule, une minuscule, un chiffre et un caractère spécial)";
        }
    } else {
        u_name.style.border = "solid black 1.5px";
        user.style.border = "solid black 1.5px";
        mdp.style.border = "solid black 1.5px";
        if (!u_name.value) {
            u_name.style.border = "3px solid red";
        }
        if (!user.value) {
            user.style.border = "3px solid red";
        }
        if (!mdp.value) {
            mdp.style.border = "3px solid red";
        }
    }
});