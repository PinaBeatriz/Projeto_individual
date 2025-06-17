const fkUser = sessionStorage.ID_USER;
  const grafico = document.getElementById("grafico").getContext("2d");
  let chartGrafiico;

  var pontos = 0;

  function carregarGrafico() {
    let fkQuiz = selectQuiz.value;

    msg.innerHTML = '';

    fetch(`/pontuacao/buscarPontuacao/${fkUser}/${fkQuiz}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
       
        if (data.length == 0) {
          console.log('dados vazio')
          var mensagem = document.getElementById('msg')
          mensagem.innerHTML = `Você não possui pontuações nesse quiz.`;
          if (chartGrafiico) {
            chartGrafiico.destroy();
          }
          return;
        }else{
          pontos = data[data.length - 1].qtd_acertos;
          divpontos.innerHTML = pontos *100;
        }

        const labels = [];
        const acertos = [];
        const erros = [];

        for (let i = 0; i < data.length; i++) {
          labels.push(`Tentativa ${i + 1}`);
          acertos.push(data[i].qtd_acertos);
          erros.push(data[i].qtd_erros);
        }

        if (chartGrafiico) {
          chartGrafiico.destroy();
        }

        chartGrafiico = new Chart(grafico, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Acertos",
                data: acertos,
                backgroundColor: "#efaa3c",
                borderColor: "#FCA311",
                borderWidth: 5,
              },
              {
                label: "Erros",
                data: erros,
                backgroundColor: "#14213D",
                borderColor: "#2e4982",
                borderWidth: 5,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.2)",
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.2)",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
            },
          },
        });
      });
  }

  function carregarRanking() {
   
  let fkQuiz = selectQuiz.value;

  fetch(`/pontuacao/top3/${fkQuiz}`)
    .then(response => response.json())
    .then(data => {
      ranking.innerHTML = "<h2>Ranking Top 8</h2>";

      if (data.length === 0) {
        ranking.innerHTML += "<p>Sem pontuações ainda.</p>";
        return;
      }

      data.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "ranking-item";
        div.innerHTML = `${index + 1}º - ${item.nome} (${item.qtd_acertos} acertos)`;
        ranking.appendChild(div);
      });
    });
}