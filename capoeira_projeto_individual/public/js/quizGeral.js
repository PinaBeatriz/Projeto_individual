// Função para iniciar o quiz esconde a tela de introdução e mostra o quiz
function iniciar() {
    document.querySelector('.intro').style.display = 'none';  // Esconde a seção de introdução
    document.querySelector('.app').style.display = 'block';   // Exibe a seção do quiz
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

// Seleciona elementos do  que serão usados para exibir perguntas, respostas e botões
const questao_elemento = document.getElementById("question"); //  onde a pergunta será mostrada
const botao_resposta = document.getElementById("answer-buttons"); // Div onde os botões de resposta serão colocados
const botaoproximo = document.getElementById("next-btn"); // Botão para passar para a próxima pergunta

let questao_atual_index = 0; // Índice da questão atual
let acertos = 0; // Número de acertos do jogador
let erros=0;    // Número de erros do jogador
let questoes_embaralhadas = []; // Array para armazenar as questões embaralhadas

// Função que embaralha as questões usando Math.round para gerar índices aleatórios
function embaralharQuestoes(array) {
    const novoArray = [...array]; // Cria uma cópia do array original para não modificar o original e embaralha os itens 
    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.round(Math.random() * i); // Gera índice aleatório entre 0 e i
        const temp = novoArray[i];
        novoArray[i] = novoArray[j];
        novoArray[j] = temp; 
    }
    return novoArray; // Retorna o array embaralhado
}

// Função que inicia ou reinicia o quiz
function startQuiz() {
    questao_atual_index = 0; // Reseta o índice da questão para o começo
    acertos = 0; // Reseta o número de acertos
    erros = 0;// Reseta o número de erros
    botaoproximo.innerHTML = "Próxima"; // Define texto do botão próximo
    questoes_embaralhadas = embaralharQuestoes(questoes); // Embaralha as questões
    mostrar_questao(); // Mostra a primeira questão
}

// Função para limpar o estado anterior antes de mostrar nova questão
function resetState() {
    botaoproximo.style.display = "none"; // Esconde o botão próximo
    const respostas = Array.from(botao_resposta.children); // Pega todos os botões de resposta atuais
    for (let i = 0; i < respostas.length; i++) {
        botao_resposta.removeChild(respostas[i]); // Remove todos os botões de resposta para limpar a tela
    }
}

// Função que exibe a questão atual e cria os botões de resposta
function mostrar_questao() {
    resetState(); // Limpa perguntas e respostas anteriores
    var questao_atual = questoes_embaralhadas[questao_atual_index]; // Pega a questão atual do array embaralhado
    var contador_questao = questao_atual_index + 1; // Número da questão (exibição começa em 1)
    questao_elemento.innerHTML = contador_questao + ". " + questao_atual.pergunta; // Mostra a pergunta

    // Para cada resposta da questão, cria um botão e adiciona na tela
    for (var i = 0; i < questao_atual.respostas.length; i++) {
        const resposta = questao_atual.respostas[i];
        const button = document.createElement("button"); // Cria botão para resposta
        button.innerHTML = resposta.text; // Texto do botão é o texto da resposta
        button.dataset.id = resposta.id; // Guarda o id da resposta no dataset do botão
        button.classList.add("btn"); // Adiciona classe para estilização
        button.addEventListener('click', selectAnswer); // Adiciona evento para quando clicar no botão
        botao_resposta.appendChild(button); // Adiciona botão na div das respostas
    }
}

// Função que trata a seleção de uma resposta pelo usuário
function selectAnswer(evento) {
    var botaoSelecionado = evento.target; // Botão clicado
    var idSelecionado = botaoSelecionado.dataset.id; // Id da resposta selecionada
    var questaoAtual = questoes_embaralhadas[questao_atual_index]; // Questão atual

    // Busca qual é a resposta correta da questão atual
    var respostaCorreta = null;
    for (var i = 0; i < questaoAtual.respostas.length; i++) {
        if (questaoAtual.respostas[i].correct === true) {
            respostaCorreta = questaoAtual.respostas[i];
            break;
        }
    }

    // Verifica se a resposta selecionada está correta
    if (idSelecionado == respostaCorreta.id) {
        botaoSelecionado.classList.add("correct"); // Marca o botão como correto
        acertos++; // Incrementa o número de acertos
    } else {
        botaoSelecionado.classList.add("incorrect"); // Marca o botão como incorreto
        erros++;
    }

    // Desabilita todos os botões após uma resposta ser escolhida
    var botoes = botao_resposta.children;
    for (var i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;
    }

    // Mostra o botão "Próxima" para avançar para a próxima questão
    botaoproximo.style.display = "block";

    // Define a ação do botão próximo
    botaoproximo.onclick = function () {
        questao_atual_index++; // Avança o índice da questão
        if (questao_atual_index < questoes_embaralhadas.length) {
            mostrar_questao(); // Mostra próxima questão se ainda houver
        } else {
            mostrar_resultado(); // Caso contrário, mostra o resultado final
        }
    };
}

// Função que exibe o resultado final do quiz
function mostrar_resultado() {
    resetState(); // Limpa as respostas da última questão
    // Mostra quantas questões o usuário acertou
    let pontos = acertos * 100;
    let porcentagemAcertos = (acertos /4)*100;
    questao_elemento.innerHTML = `Você teve ${porcentagemAcertos}% de acertos! Veja os resultados`;
    botaoproximo.innerHTML = "Ver resultados"; // Altera o botão para reiniciar o quiz
    botaoproximo.style.display = "block"; // Exibe o botão

    botaoproximo.onclick = function () {
        window.location.href = "dashboard.html";
    };

    let fkQuiz = 1;

    const dados = {
        acertosServer: acertos,
        errosServer : erros,
        fkUser: sessionStorage.ID_USER,
        fkQuizServer: fkQuiz,
        pontosServer: pontos,
    }

    fetch("/pontuacao/marcarPontuacao", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
        

        if (resposta.ok) {
            console.log("Pontuacao enviada ao Banco de Dados!")
        } else {
          console.log("Houve um erro ao cadastrar pontuacao!");
        }
      })
    
      .then((dados) => {
        console.log(`Dados enviados:`, dados);
      })
      
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      }); 

    return false;

    
}

// Inicia o quiz automaticamente ao carregar o script
startQuiz();
