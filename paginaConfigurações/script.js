function createAlert(textAlert, typeAlert, temperature, divId) {

    const showingAlert = document.getElementById(divId);
    const divAlert  =  document.getElementById("alerts-history");

    const alertStruct = `
        <div class="alert alert-${typeAlert} d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <strong><h5>${textAlert}: ${temperature}°C &nbsp;&nbsp;</strong> 
              <small class="ms-auto">${pegandoDataTempoAtual()}</small></h5>
        </div>`

    showingAlert.innerHTML = alertStruct

    divAlert.innerHTML += alertStruct
    saveAlertToLocalStorage(alertStruct)

}

function saveAlertToLocalStorage(alertStruct) {


//a função começa pegando com uma tentativa(pois t) de pegar alertas armazenados e converte de string para objetos, pois o alertStruct não é 100% string

    let alerts = JSON.parse(localStorage.getItem("alerts")) || [];

    console.log(alerts); //printando array de alertas para verificar se o alertStruct foi convertido corretamente

//salva o novo alerta ao array de alertas e converte de volta a string para printa-los dps na função onload
    alerts.push(alertStruct);
    localStorage.setItem("alerts", JSON.stringify(alerts));

}


// Função para carregar os alertas do localStorage ao carregar a página
function loadAlertsFromLocalStorage() {

    //pegando o id da div que vai mostrar o historico de alertas
    const divAlert = document.getElementById("alerts-history");

    //requisição de array de alertas do localStorage 
    const alerts = JSON.parse(localStorage.getItem("alerts")) || [];

    //estrutura de repetição forEach para percorrer o array de alertas e printalos todos na tela quando a tela for recarregada
    alerts.forEach(alert => {
        divAlert.innerHTML += alert;
    });
}

window.onload = function() {
    loadAlertsFromLocalStorage();
};

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
        const divNonInfo = document.getElementById("alertNoWarning");        

    if (dado.temperatura >= tempHigh) {

        divNonInfo.style.display = "none";

        createAlert("Temperatura Muito alta !!", "danger", `${dado.temperatura}°C`, "alertTemp");
        

    }
        }

        function definindoTemperaturaAtipica(dado){

            const tempMax = parseFloat(localStorage.getItem('tempMax'));
            const tempHigh = parseFloat(localStorage.getItem('tempHigh'));
            const divNonInfo = document.getElementById("alertNoWarning");


            if(dado.temperatura > tempMax && dado.temperatura < tempHigh){

                divNonInfo.style.display = "none";

                createAlert("Temperatura Atipica !!", "warning", `${dado.temperatura}°C`, "alertTemp");
            }
    
    }

    function definindoAlertaUmidadeAlta(dado){

        const humidityHigh = parseFloat(localStorage.getItem('humidityHigh'));
        const divNonInfo = document.getElementById("alertNoWarning");

        if (dado.umidade >= humidityHigh) {

            divNonInfo.style.display = "none";

        createAlert("Umidade Muito Alta !!", "danger", `${dado.umidade}%`, "alertHumidity");
}
    }
    function definindoUmidadeAtipica(dado){
        
        const humidityMax = parseFloat(localStorage.getItem('humidityMax'));
        const humidityHigh = parseFloat(localStorage.getItem('humidityHigh'));

        const divNonInfo = document.getElementById("alertNoWarning");


        if(dado.umidade > humidityMax && dado.umidade < humidityHigh){

            divNonInfo.style.display = "none"

            createAlert("Umidade Atipica !!", "warning", `${dado.umidade}%`, "alertHumidity");
    }
}

    function definindoEnergiaBaixa(dado) {

        const divNonInfo = document.getElementById("alertNoWarning");

    if (dado.potencia < 100) {

        const divNonInfo = document.getElementById("alertNoWarning");

        createAlert("Energia do ar-condicionado caiu!", "warning", `${dado.potencia.toFixed(2)}W`, "alertDefault");
    }
}




