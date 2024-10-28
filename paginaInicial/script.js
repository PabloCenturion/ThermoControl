const arduinoIP = 'http://192.168.1.214/';

/* Função para buscar dados do Arduino */
async function buscarSensorDados() {
    try {
        const respostaArduino = await fetch(arduinoIP);
        if (!respostaArduino.ok) {
            throw new Error(`Erro na requisição: ${respostaArduino.statusText}`);
        }

        const dado = await respostaArduino.json();
        console.log(dado); 

        document.getElementById('status-temperature').innerText = `${dado.temperatura}°C`;
        document.getElementById('status-umidity').innerText = `${dado.umidade}%`;
        document.getElementById('status-power').innerText = `${dado.potencia.toFixed(2)}W`;
        document.getElementById('status-current').innerText = `${dado.corrente.toFixed(2)}A`;

        definindoAlertaTemperaturaAlta(dado);
        definindoTemperaturaAtipica(dado);
        definindoAlertaUmidadeAlta(dado);
        definindoUmidadeAtipica(dado);
        definindoEnergiaBaixa(dado);

    } catch (erro) {
        console.log('Erro ao buscar dados do Arduino:', erro);
    }
}

setInterval(buscarSensorDados, 5000);

window.onload = buscarSensorDados;