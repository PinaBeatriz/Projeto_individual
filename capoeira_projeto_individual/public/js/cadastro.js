function cadastrar() {
    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var erro1 = true;
    var confirmacaoSenhaVar = input_confSenha.value;

    // Verificando se há algum campo em branco
    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "" ) {
      
        // colocar div para sinalizar campos em branco
        div_msg.innerHTML = "Preencha todos os campos para cadastrar";
      return;
    } 

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", { 
      method: "POST",// metodo post ele insere no bd
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ // manda o json pro usuarios cadastrar que é um endpoint
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
        

        if (resposta.ok) {
          
          // colocar div para sinalizar que o cadastro foi realizado com sucesso

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

        } else {

          // colocar div para sinalizar erro

          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      }); // ele pega o erro 

    return false;
  }


  // metodo mvc 
  // model onde é feito as instruções sql
  // view rota que evai ligar o fetch na Controller
  // controller liga a model na rota (view)
