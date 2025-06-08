function entrar() {
        var emailVar = input_email.value;
        var senhaVar = input_senha.value;

        if (emailVar == "" || senhaVar == "") {
            div_msg.innerHTML = "Preencha todos os campos para cadastrar";
            return false;
        }

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL = json.email;
                    sessionStorage.NOME = json.nome;
                    sessionStorage.ID_USER = json.id_user;
                     setTimeout(function () {
                        window.location = "jogos.html"; // caminho para o arquivo do quiz
                     }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }