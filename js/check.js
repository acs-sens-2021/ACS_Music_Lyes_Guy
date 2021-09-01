// Vérification si l'utilisateur est connecté et donc possède un token

if (!sessionStorage.getItem("token")) {
    window.location.replace("../index.html");
}