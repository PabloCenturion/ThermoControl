const ctxTemp = document.getElementById('graficoTemperatura').getContext('2d');

const graficoTemperatura = new Chart(ctxTemp, {

    type: 'line', // Tipo de gráfico - linha para monitoramento ao longo do tempo
    data: {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00","5:00", "6:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], // Exemplo de horários
        datasets: [{
            label: 'Temperatura (°C)',
            data: [22, 24, 23, 25, 24], // Dados de temperatura para cada horário
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo
            borderColor: 'rgba(255, 99, 132, 1)', // Cor da linha
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperatura (°C)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Horário'
                }
            }
        }
    }
});
