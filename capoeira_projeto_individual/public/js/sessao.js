function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;


    if (email != null && nome != null) {
        cadastro.innerHTML = "Olá, " + nome;
        cadastro.removeATTribute("href")
        // console.log("Usuario autenticado") // verifica se o session storage esta vazio se não ta vazio tem conexão entao userr autenticado
    } else {
        quiz.style.display = "none";
    }
}

function limparSessao() {// limpa a session storage e manda para o login
    sessionStorage.clear();
    window.location = "../index.html";
    window.location = "../sobreMim.html";
    window.location = "../cadastro.html";
    window.location = "../login.html";
}
