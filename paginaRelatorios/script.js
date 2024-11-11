// Variáveis globais para armazenar gráficos
let grafico;

// Função para atualizar o gráfico baseado no tipo selecionado
function atualizarGrafico(tipo) {

    // Limpa o gráfico anterior
    if (grafico) {
        grafico.destroy(); // Se já existe um gráfico, destrua-o antes de criar um novo
    }

// Captura os dados do localStorage
const dadosSensores = JSON.parse(localStorage.getItem("historicoDiario")) || [];
///////////////////////////////////////////////////////////////////////////////

// o metodo map() seleciona o dado especifico do array e retorna um novo array

const listaHorarios = dadosSensores.map(dado => dado.horario);
const listaTemperaturas = dadosSensores.map(dado => dado.temperatura);
const listaUmidades = dadosSensores.map(dado => dado.umidade);
const listaPotencias = dadosSensores.map(dado => dado.potencia);
const listaCorrentes = dadosSensores.map(dado => dado.corrente);

console.log(listaCorrentes) //conferindo  novo array

console.log(dadosSensores)

// Cria um novo gráfico com base na seleção
const ctx = document.getElementById("grafico").getContext("2d");

switch (tipo) {

    case "0": // Temperatura
        grafico = new Chart(ctx, {
            type: "line",
            data: {
                labels: listaHorarios,
                datasets: [{
                    label: "Temperatura (°C)",
                    data: listaTemperaturas,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        break;

    case "1": // Umidade
        grafico = new Chart(ctx, {
            type: "line",
            data: {
                labels: listaHorarios,
                datasets: [{
                    label: "Umidade (%)",
                    data: listaUmidades,
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        break;

    case "2": // Corrente
        grafico = new Chart(ctx, {
            type: "line",
            data: {
                labels: listaHorarios,
                datasets: [{
                    label: "Corrente (A)",
                    data: listaCorrentes,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        break;

    case "3": // Potência
        grafico = new Chart(ctx, {
            type: "line",
            data: {
                labels: listaHorarios,
                datasets: [{
                    label: "Potência (W)",
                    data: listaPotencias,
                    borderColor: "rgba(255, 206, 86, 1)",
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        break;

    default:
        break;
}
}

// Adiciona evento ao select
document.getElementById("tipoGrafico").addEventListener("change", function () {

const tipoSelecionado = this.value;

atualizarGrafico(tipoSelecionado);

});

// Chama a função uma vez para exibir o gráfico padrão ao carregar a página
atualizarGrafico("0"); // Exibe o gráfico de temperatura por padrão


function deleteData(){

    localStorage.removeItem("historicoDiario");

    alert("Todos os dados foram excluídos");

}

const umaSemanaEmMilissegundos = 7 * 24 * 60 * 60 * 1000;

setInterval(deleteData, umaSemanaEmMilissegundos);