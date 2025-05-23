function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;


    if (email != null && nome != null) {
        console.log("Usuario autenticado") // verifica se o session storage esta vazio se não ta vazio tem conexão entao userr autenticado
    } else {
        window.location = "../login.html"; // se não manda para o login
    }
}

function limparSessao() {// limpa a session storage e manda para o login
    sessionStorage.clear();
    window.location = "../login.html";
}
