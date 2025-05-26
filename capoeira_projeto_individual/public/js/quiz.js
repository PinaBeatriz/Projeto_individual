function iniciar() {
    document.querySelector('.intro').style.display = 'none';  // Esconde introdução
    document.querySelector('.app').style.display = 'block';   // Mostra quiz
    startQuiz(); // Começa o quiz
}

const questoes = [
    {
        pergunta:"Qual é o nome do instrumento que lidera a roda de capoeira?",
        respostas:[
            {id:1, text: "Atabaque", correct:false},
            {id:2, text: "Pandeiro", correct:false},
            {id:3, text: "Berimbau", correct:true},
            {id:4, text: "Piano", correct:false},
        ]
    },
    {
        pergunta:"Como é chamada a roda onde se pratica a capoeira?",
        respostas:[
            {id:1, text: "Círculo de luta", correct:false},
            {id:2, text: "Roda de capoeira", correct:true},
            {id:3, text: "Grupo marcial", correct:false},
            {id:4, text: "Tatame", correct:false},
        ]
    },
    {
        pergunta:"Qual é o nome do golpe clássico em que o capoeirista gira com uma perna estendida?",
        respostas:[
            {id:1, text: "Martelo", correct:false},
            {id:2, text: "Meia-lua de compasso", correct:true},
            {id:3, text: "Chapa", correct:false},
            {id:4, text: "Ponte", correct:false},
        ]
    },
    {
        pergunta:"De qual país a capoeira se originou?",
        respostas:[
            {id:1, text: "Angola", correct:false},
            {id:2, text: "Brasil", correct:true},
            {id:3, text: "Portugal", correct:false},
            {id:4, text: "Africa", correct:false},
        ]
    },
]

const questao_elemento = document.getElementById("question"); // puxa o id do h2 do html aqui vai alterar as questoes

const botao_resposta = document.getElementById("answer-buttons");// puxa o id da div acima dos botoes do html aqui vai alterar as resposta 

const botaoproximo = document.getElementById("next-btn");

var questao_atual_index = 0;
var acertos = 0;

function startQuiz(){
    questao_atual_index = 0; // começa em 0 posição na lista
    acertos = 0; // começa a conatgem de acertos em 0
    botaoproximo.innerHTML = "Proxima"; // muda o innerhtml para proximo
    mostrar_questao();

}
//garantir que o botão proximo esteja sempre escondido
function resetState(){
    botaoproximo.style.display = "none";

    //a cada nova questão todoso os botoes sejam excluidos
    //Array.from() serve para converter qualquer coleção iterável (que pode se repetir) em um array de vdd
     // Pega todos os filhos de botao_resposta como array
    const respostas = Array.from(botao_resposta.children);

    // Para cada botão de resposta, remove ele
    for (let i = 0; i < respostas.length; i++) {
        botao_resposta.removeChild(respostas[i]); //respostas[i] = cada um dos botões de resposta que está dentro da div com id="answer-buttons".
    }//botao_resposta.removeChild = remove esse elemento do HTML.

}

function mostrar_questao(){
    resetState();
    //pega a questao que esta sendo apontada pelo mostrada pela var questao_atual
    var questao_atual = questoes[questao_atual_index]// variavel que pega da lista questões o indice da questão atual (var questao_atual_index que começa em 0)
    var contador_questao = questao_atual_index +1; //começa em 0 e vai somando 1
    
    questao_elemento.innerHTML = contador_questao +". " + questao_atual.pergunta; // sai em tela o numero da pergunta mais a pergunta na posição x da lista

    // para percorrer as chaves de respostas
    //  o for  para criar os botões
    for (var i = 0; i < questao_atual.respostas.length; i++) {
        const resposta = questao_atual.respostas[i];
        const button = document.createElement("button");// cria de forma dinamica todos os botoes que o while exclui
        button.innerHTML = resposta.text;
        button.dataset.id = resposta.id; // dataset guarda infos, nesse caso guarda o id do botão usado depois para ver é vdd ou falso a resposta
        button.classList.add("btn");//adiciona a classe CSS chamada btn ao botão criado.
        button.addEventListener('click', selectAnswer); // cham a função selectAnswer criada a baixo| .addEventListener	Um jeito de ouvir eventos (como clique, tecla, etc.)
        botao_resposta.appendChild(button);//Coloque esse botão que eu acabei de criar dentro do contêiner onde os botões de resposta vão aparecer.
    }
}

function selectAnswer(evento){
        
    var botaoSelecionado = evento.target;//guarda  o botão que foi clicado, para que eu possa saber qual foi a resposta escolhida. 
    
    var idSelecionado = botaoSelecionado.dataset.id;// pega o ID do botão clicado (vem do dataset)

    var questaoAtual = questoes[questao_atual_index];// pega a questão atual

    // procura dentro das respostas qual tem o "correct: true"
    var respostaCorreta = null;//guarda a resposta correta, quando a gente encontrar.
    for (var i = 0; i < questaoAtual.respostas.length; i++) {// passa por todas as respostas da pergunta atual
        if (questaoAtual.respostas[i].correct === true) {// olha se a resposta atual do loop é a resposta correta
            respostaCorreta = questaoAtual.respostas[i];//Se achou a certa, guarda essa resposta dentro da variável respostaCorreta
            break; // achou a correta, pode parar
        }
    }

    // compara se o botão clicado tem o mesmo ID da resposta correta
    if (idSelecionado == respostaCorreta.id) {
        botaoSelecionado.classList.add("correct"); // adiciona a classe de certo
        acertos++; // soma um ponto
    } else {
        botaoSelecionado.classList.add("incorrect"); // adiciona a classe de errado
    }

    // Desativa todos os botões para não deixar clicar de novo
    var botoes = botao_resposta.children;
    for (var i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;
    }

    // Mostra o botão de próxima pergunta
    botaoproximo.style.display = "block";

    // aqui dentro vai o que acontece quando clicar no botão "Próxima"
    botaoproximo.addEventListener("click", function () {
    questao_atual_index++; // passa para a próxima pergunta

    if (questao_atual_index < questoes.length) {
        mostrar_questao(); // mostra a próxima
    } else {
        mostrar_resultado(); // se acabou, mostra o resultado
    }
    });

}

function mostrar_resultado() {
    resetState();
    questao_elemento.innerHTML = `Você acertou ${acertos} de ${questoes.length} perguntas!`;
    botaoproximo.innerHTML = "Jogar Novamente";
    botaoproximo.style.display = "block";

    botaoproximo.addEventListener("click", startQuiz);// Reinicia o quiz se clicar de novo
}



startQuiz();