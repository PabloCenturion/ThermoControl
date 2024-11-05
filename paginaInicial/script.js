const arduinoIP = 'http://10.35.221.159/';

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

        const structLoading = `<section class="displayFlex"> <div class="lds-ring"><div></div><div></div><div></div><div></div></div> <span>Carregando...</spans><section>`

        document.getElementById('status-temperature').innerHTML = structLoading;
        document.getElementById('status-umidity').innerHTML = structLoading;
        document.getElementById('status-power').innerHTML = structLoading;
        document.getElementById('status-current').innerHTML = structLoading;
    }
}

setInterval(buscarSensorDados, 5000);

window.onload = buscarSensorDados;

    const alertTemp = document.getElementById('alertTemp');
    const alertHumidity = document.getElementById('alertHumidity');
    const alertNonInformation = document.querySelector(".container-blocks");

        const structNonAlert = `
            <div class="block-alert-non">
            <div id="alertNoWarning" class="alert non-info d-flex align-items-center" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong><h5>Sem Avisos No Momento</h5></strong>
                <small class="ms-auto"></small>
            </div>
        </div>`;

            alertTemp.innerHTML = structNonAlert;
            alertHumidity.innerHTML = structNonAlert.style.display = 'none';

