const arduinoIP = 'http://192.168.1.214/';
let ultimaHoraSalva = null; 

function loadingDivExpose(){

    const structLoading = `
    <section class="displayFlex">
            <div class="lds-ring">
                <div></div><div></div><div></div><div></div>
            </div>
            <span>Carregando...</span>
        </section>`

let tempBlock = document.getElementById('status-temperature')
tempBlock.innerHTML = structLoading

let humiBlock = document.getElementById('status-umidity')
humiBlock.innerHTML = structLoading

let pwrBlock= document.getElementById('status-power')
pwrBlock.innerHTML = structLoading

currBlock = document.getElementById('status-current')
currBlock.innerHTML = structLoading;

}

loadingDivExpose()

/* Função para buscar dados do Arduino */
async function buscarSensorDados() {


    try {
        const respostaArduino = await fetch(arduinoIP);

        if (!respostaArduino.ok) {

                console.error(`Erro na requisição: ${respostaArduino.statusText}`);

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

        saveDataByHour(dado);


    } catch (erro) {
        console.log('Erro ao buscar dados do Arduino:', erro);

    }
}

function statusErrorDiv(textError){

    const divStatusError  = document.getElementById("status-error")

    divStatusError.innerText = textError

}

// Função para salvar uma leitura a cada hora para os gráficos diários
function saveDataByHour(dado) {

    const agora = new Date();
    const horarioAtual = agora.getHours();

    // se a hora atual for diferente da última hora salva, armazena os dados
    if (horarioAtual !== ultimaHoraSalva) {
        ultimaHoraSalva = horarioAtual; // atualizando a última hora salva

        const arrayDadosSensor = JSON.parse(localStorage.getItem('historicoDiario')) || [];

        const horarioFormatado  = agora.toLocaleTimeString(); 
        const novoDado = { horario: horarioFormatado , ...dado }; //(...) operador do espalhamento, para adicionar tds as propriedades do objeto dado

        //adicao do novo dado ao array
       arrayDadosSensor.push(novoDado);

    localStorage.setItem('historicoDiario', JSON.stringify(arrayDadosSensor));
    console.log('Dados salvos:', novoDado); // Log para confirmar que os dados foram salvos

}
}

setInterval(buscarSensorDados, 5000);

buscarSensorDados();



function pegandoDataTempoAtual() {

    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    
    return `${horas}:${minutos} - ${dia}/${mes}/${ano}`;
}

function saveAlertToLocalStorage(alertData) {

    let alerts = JSON.parse(localStorage.getItem("alerts")); // Recupera o array já inicializado
    //usando jsonParse pois tranforma a string em um (array/objeto) para podermos manipula-lo

    alerts.push(alertData); // Adiciona o novo alerta ao array de
    
    localStorage.setItem("alerts", JSON.stringify(alerts)); // Atualiza o localStorage
}

function createAlert(textAlert, typeAlert, dataSensor, tempOrHighDiv) {
    const alertsDiv = document.getElementById("alertsDiv");

    let alertDiv = document.getElementById(tempOrHighDiv);

    if (!alertDiv) {

        alertDiv = document.createElement("div");
        alertDiv.id = tempOrHighDiv;
        alertsDiv.appendChild(alertDiv);
    }

    alertDiv.innerHTML = "";

    const alertHTML = document.createElement("div");
    alertHTML.className = `alert alert-${typeAlert} d-flex align-items-center`;
    alertHTML.role = "alert";
    alertHTML.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <h5><strong>${textAlert}: ${dataSensor} &nbsp;&nbsp;</strong></h5>
        <small class="ms-auto">${pegandoDataTempoAtual()}</small>
    `;

    alertDiv.appendChild(alertHTML);

    const alertData = {
        typeAlert: typeAlert,
        textAlert: textAlert,
        dataSensor: dataSensor,
        dateTime: pegandoDataTempoAtual()
    };

    saveAlertToLocalStorage(alertData);
}




// funções de alerta

function definindoAlertaTemperaturaAlta(dado){

    const tempHigh = parseFloat(localStorage.getItem('tempHigh'));

if (dado.temperatura >= tempHigh) {

    createAlert("Temperatura Muito alta !!", "danger", `${dado.temperatura}°C`, "alertTemperatureDiv");

}
    }


    function definindoTemperaturaAtipica(dado){

        const isTempAlertEnabled = localStorage.getItem("alertTempChecked") === "true";

        if (isTempAlertEnabled) {

            const tempMax = parseFloat(localStorage.getItem("humidityMax"));
            const tempHigh = parseFloat(localStorage.getItem("humidityHigh"));
    
            if (dado.temperatura > tempMax && dado.temperatura < tempHigh) {
                createAlert("Temperatura Atipica !!", "warning", `${dado.temperatura}°C`, "alertTemperatureDiv");
            }
        }

}


function definindoAlertaUmidadeAlta(dado){


        const humidityHigh = parseFloat(localStorage.getItem('humidityHigh'));

        if (dado.umidade >= humidityHigh) {

        createAlert("Umidade Muito Alta !!", "danger", `${dado.umidade}%`, "alertHumidityDiv");

    }

}
function definindoUmidadeAtipica(dado) {

    const isHumidityAlertEnabled = localStorage.getItem("alertHumidityChecked") === "true";

    if (isHumidityAlertEnabled) {
        const humidityMax = parseFloat(localStorage.getItem("humidityMax"));
        const humidityHigh = parseFloat(localStorage.getItem("humidityHigh"));

        if (dado.umidade > humidityMax && dado.umidade < humidityHigh) {
            createAlert("Umidade Atípica!!", "warning", `${dado.umidade}%`, "alertHumidityDiv");
        }
    }
}



//------------------------------------------------------------------------//


