function cadastrar() {
  var nomeVar = input_nome.value;
  var emailVar = input_email.value;
  var senhaVar = input_senha.value;
  var confirmacaoSenhaVar = input_confSenha.value;

  if (nomeVar != "" && emailVar != "" && senhaVar != "" && confirmacaoSenhaVar != ""){
    if (senhaVar.length >= 6 && senhaVar.length <= 15) {
      if (!emailVar.includes(" ") && emailVar.includes("@") && emailVar.includes(".com")){
          if (senhaVar == confirmacaoSenhaVar) {
            fetch("/usuarios/cadastrar", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
              }),
            })
              .then(function (resposta) {
                console.log("resposta: ", resposta);
              
                if (resposta.ok) {
                  
                  setTimeout(() => {
                    window.location = "login.html";
                  }, 1000);
                } else {
                  console.log("Houve um erro ao tentar realizar o cadastro!");
                }
              })
              .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
              });
        } else {
          alert("Senhas diferentes!");
        }
      }else {
        alert("Insira um email válido");
      }  
    }else{
      alert("A senha deve ter no mínimo 6 caracteres e no máximo 15 caracteres");
    }
  } else {
      alert("Preencha todos os campos");
  }
}



// metodo mvc
// model onde é feito as instruções sql
// view rota que evai ligar o fetch na Controller
// controller liga a model na rota (view)
