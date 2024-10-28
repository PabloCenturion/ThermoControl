   //função global para criar alertas do bootstrap

   function createAlert(textAlert, typeAlert, temperature, divId) {

    const showingAlert = document.getElementById(`${divId}`);
    const historyAlerts = document.getElementById("alerts-history");

    const alertStruct = `
        <div class="alert alert-${typeAlert} d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>${textAlert}: ${temperature}°C &nbsp;&nbsp;</strong>
            <small class="ms-auto">${pegandoDataTempoAtual()}</small>
        </div>`;
    showingAlert.innerHTML = alertStruct;

}


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

    function definindoEnergiaBaixa() {
    if (dado.potencia < 100) {
        createAlert("Energia do ar-condicionado caiu!", "warning", `${dado.potencia.toFixed(2)}W`, "alertDefault");
    }
}


