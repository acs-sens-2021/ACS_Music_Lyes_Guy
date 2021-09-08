let btn = document.querySelector(".valider");
let u_name = document.querySelector(".nom");
let user = document.querySelector(".mail");
let mdp = document.querySelector(".mdp");

btn.addEventListener("click", function () {
    if (u_name.value && user.value && mdp.value) {
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
            if (response.status != 401) {
                u_name.style.border = "3px solid red";
                user.style.border = "3px solid red";
                mdp.style.border = "3px solid red";
            }
        })
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