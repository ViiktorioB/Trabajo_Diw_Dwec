usuarioLog = localStorage.getItem('userLog');
userJSON = JSON.parse(usuarioLog);
let nombrePerfil = document.getElementById('nombrePerfil');
let mailPerfil = document.getElementById('mailPerfil');
let levelPerfil = document.getElementById('levelPerfil');

if (nombrePerfil, mailPerfil, levelPerfil) {
    nombrePerfil.innerText = userJSON[0].name;
    mailPerfil.innerText = userJSON[0].email;
    levelPerfil.innerText = userJSON[0].level;
}

