   //função global para criar alertas do bootstrap

   function createAlert(textAlert, typeAlert, temperature) {
    const alertsAction = document.getElementById("alertsAction");

    const alertStruct = `
        <div class="alert alert-${typeAlert} d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>${textAlert}: ${temperature}°C &nbsp;&nbsp;</strong>
            <small class="ms-auto">${pegandoDataTempoAtual()}</small>
        </div>`;

    alertsAction.innerHTML = alertStruct;
}


function pegandoDataTempoAtual() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
}

createAlert("Temperatura Alta!", "danger", 45);

    // define o horário atual
    document.getElementById("alert-time").textContent = pegandoDataTempoAtual();
    
    function definindoAlertaTemperaturaAlta(){

     let temperaturaMax = document.getElementById("temp-high").value

     temperaturaMax = parseFloat(temperaturaMax);

    if (dado.temperatura > temperaturaMax) {

        createAlert("Temperatura Muito alta !!", "danger")

    }
        }

        function definindoTemperaturaAtipica(){

            let temperaturaMin = document.getElementById("temp-good-min").value
            let temperaturaMax = document.getElementById("temp-good-max").value

            temperaturaMin = parseFloat(temperaturaMin);
            temperaturaMax = parseFloat(temperaturaMax);

            if(dado.temperatura < temperaturaMin || dado.temperatura > temperaturaMax){

                createAlert("Temperatura Atipica !!", "warning")
        }
    }

    function definindoAlertaUmidadeAlta(){

        let umidadeHigh = document.getElementById("humidity-high").value

        umidadeHigh = parseFloat(umidadeHigh);

        if (dado.umidade > umidadeHigh) {

        createAlert("Umidade Muito Alta !!", "danger")
}
    }
    function definindoUmidadeAtipica(){

        let umidadeHigh = document.getElementById("humidity-high").value
        let umidadeMax = document.getElementById("humidity-good-max").value

        umidadeHigh = parseFloat(umidadeHigh);
        umidadeMax = parseFloat(umidadeMax);

        if(dado.umidade > umidadeMax && dado.umidade < umidadeHigh){

            createAlert("Umidade Atipica !!", "warning")
    }
}



