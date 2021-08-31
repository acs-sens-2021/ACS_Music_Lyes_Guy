let btn = document.querySelector(".valider");
let u_name = document.querySelector(".nom");
let user = document.querySelector(".mail");
let mdp = document.querySelector(".mdp");

btn.addEventListener("click", function () {
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
});