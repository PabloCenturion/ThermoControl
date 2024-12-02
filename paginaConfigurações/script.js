function createAlert(textAlert, typeAlert, dataSensor, divId) {

    const showingAlert = document.getElementById(divId);

    const alertData = {
        typeAlert: typeAlert,
        textAlert: textAlert,
        dataSensor: dataSensor,
        dateTime: pegandoDataTempoAtual()
    };

    const alertStruct = `
        <div class="alert alert-${typeAlert} d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <h5><strong>${textAlert}: ${dataSensor}°C &nbsp;&nbsp;</strong></h5>
              <small class="ms-auto">${pegandoDataTempoAtual()}</small>
        </div>`

    showingAlert.innerHTML = alertStruct

    saveAlertToLocalStorage(alertData)

}

// inicializando o localStorage com um array vazio

if (!localStorage.getItem("alerts")) {
    localStorage.setItem("alerts", JSON.stringify([])); // Inicializa com um array vazio
    //uso do JSON.stringify para transformar o array em uma string, pois o localStorage não consegue armazenar uma estrutura array ou objetos.

}

function saveAlertToLocalStorage(alertData) {

    let alerts = JSON.parse(localStorage.getItem("alerts")); // Recupera o array já inicializado
    //usando jsonParse pois tranforma a string em um (array/objeto) para podermos manipula-lo

    alerts.push(alertData); // Adiciona o novo alerta ao array de
    
    localStorage.setItem("alerts", JSON.stringify(alerts)); // Atualiza o localStorage
}


function loadAlertsFromLocalStorage() {
    // Pegando o id da div que vai mostrar o histórico de alertas
    const divAlertStorage = document.getElementById("div-alert-storage");

    // Requisição de array de alertas do localStorage
    const alertsStorage = JSON.parse(localStorage.getItem("alerts"));

    alertsStorage.forEach(alert => {
        const alertHTML = `
            <div class="alert alert-${alert.typeAlert} d-flex align-items-center" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <h5><strong>${alert.textAlert}: ${alert.dataSensor} &nbsp;&nbsp;</strong></h5>
                <small class="ms-auto">${alert.dateTime}</small>
            </div>`;
        divAlertStorage.innerHTML += alertHTML;
    });
}

loadAlertsFromLocalStorage();

function pegandoDataTempoAtual() {

    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    
    return `${horas}:${minutos} - ${dia}/${mes}/${ano}`;
}

    function saveChanges() {

        const tempMin = parseFloat(document.getElementById("temp-good-min").value);
        const tempMax = parseFloat(document.getElementById("temp-good-max").value);
        const tempHigh = parseFloat(document.getElementById("temp-high").value);
        const humidityMin = parseFloat(document.getElementById("humidity-good-min").value);
        const humidityMax = parseFloat(document.getElementById("humidity-good-max").value);
        const humidityHigh = parseFloat(document.getElementById("humidity-high").value);
    
        const alertEnergy = document.getElementById("alert-energy").checked;
        const alertAC = document.getElementById("alert-ac").checked;
        const alertTempAtypical = document.getElementById("alert-temp").checked;
        const alertHumidityAtypical = document.getElementById("alert-humidity").checked;
    
        localStorage.setItem('tempMin', tempMin);
        localStorage.setItem('tempMax', tempMax);
        localStorage.setItem('tempHigh', tempHigh);
        localStorage.setItem('humidityMin', humidityMin);
        localStorage.setItem('humidityMax', humidityMax);
        localStorage.setItem('humidityHigh', humidityHigh);
        localStorage.setItem('alertEnergy', alertEnergy);
        localStorage.setItem('alertAC', alertAC);
        localStorage.setItem('alertTempAtypical', alertTempAtypical);
        localStorage.setItem('alertHumidityAtypical', alertHumidityAtypical);
    
        alert("Configurações salvas com sucesso");
    }

    // funções de alerta
    function definindoAlertaTemperaturaAlta(dado){

        const tempHigh = parseFloat(localStorage.getItem('tempHigh'));

    if (dado.temperatura >= tempHigh) {

        createAlert("Temperatura Muito alta !!", "danger", `${dado.temperatura}°C`, "alertTemp");

    }
        }


        function definindoTemperaturaAtipica(dado){

            const tempMax = parseFloat(localStorage.getItem('tempMax'));
            const tempHigh = parseFloat(localStorage.getItem('tempHigh'));


            if(dado.temperatura > tempMax && dado.temperatura < tempHigh){


                createAlert("Temperatura Atipica !!", "warning", `${dado.temperatura}°C`, "alertTemp");
            }
    
    }

    function definindoAlertaUmidadeAlta(dado){

        const humidityHigh = parseFloat(localStorage.getItem('humidityHigh'));

        if (dado.umidade >= humidityHigh) {


        createAlert("Umidade Muito Alta !!", "danger", `${dado.umidade}%`, "alertHumidity");
}
    }
    function definindoUmidadeAtipica(dado){
        
        const humidityMax = parseFloat(localStorage.getItem('humidityMax'));
        const humidityHigh = parseFloat(localStorage.getItem('humidityHigh'));



        if(dado.umidade > humidityMax && dado.umidade < humidityHigh){


            createAlert("Umidade Atipica !!", "warning", `${dado.umidade}%`, "alertHumidity");
    }
}

    function definindoEnergiaBaixa(dado) {


    if (dado.potencia < 100) {


        createAlert("Energia do ar-condicionado caiu!", "warning", `${dado.potencia.toFixed(2)}W`, "alertDefault");
    }
}


function exibirValoresInput(){

    const inputGoodTempMin = document.getElementById("temp-good-min")
    const inputGoodTempMax = document.getElementById("temp-good-max")
    const inputHighTemp = document.getElementById("temp-high")

    inputGoodTempMin.value = localStorage.getItem("tempMin")
    inputGoodTempMax.value = localStorage.getItem("tempMax")
    inputHighTemp.value = localStorage.getItem("tempHigh")

    const inputGoodHumidityMin = document.getElementById("humidity-good-min")
    const inputGoodHumidityMax = document.getElementById("humidity-good-max")
    const inputHighHumidity = document.getElementById("humidity-high")

    inputGoodHumidityMin.value = localStorage.getItem("humidityMin")
    inputGoodHumidityMax.value = localStorage.getItem("humidityMax")
    inputHighHumidity.value = localStorage.getItem("humidityHigh")

}

exibirValoresInput()
