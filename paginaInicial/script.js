const arduinoIP = 'http://192.168.68.6/';
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

function hideLoading(){

let tempBlock = document.getElementById('status-temperature')
tempBlock.innerHTML = ''

let humiBlock = document.getElementById('status-umidity')
humiBlock.innerHTML = ''

let pwrBlock= document.getElementById('status-power')
pwrBlock.innerHTML = ''

currBlock = document.getElementById('status-current')
currBlock.innerHTML = '';

}

/* Função para buscar dados do Arduino */
async function buscarSensorDados() {

    loadingDivExpose()

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
        definindoEnergiaBaixa(dado);


        saveDataByHour(dado);


    } catch (erro) {
        console.log('Erro ao buscar dados do Arduino:', erro);
        statusErrorDiv("Dificuldade ao se Conectar com Servidor, aguarde um momento")

    }finally{

        hideLoading()

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


// Tratando Exibição de alertas

const structNonAlert = `
    <div class="block-alert-non">
        <div id="alertNoWarning" class="alert non-info d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <strong><h5>Sem Avisos No Momento</h5></strong>
            <small class="ms-auto"></small>
        </div>
    </div>`;

const containerMain = document.querySelector(".container-main")
const alertTemp = document.getElementById('alertTemperatureDiv');
const alertHumidity = document.getElementById('alertHumidity');

if(!containerMain.document.querySelector(".alertTemperatureDiv") || !containerMain.document.querySelector(".alertHumidity") ){

    
    alertTemp.innerHTML = structNonAlert;

}




























// // Estrutura de alertas quando não há dados
// const alertTemp = document.getElementById('alertTemp');
// const alertHumidity = document.getElementById('alertHumidity');
// const structNonAlert = `
//     <div class="block-alert-non">
//         <div id="alertNoWarning" class="alert non-info d-flex align-items-center" role="alert">
//             <i class="bi bi-exclamation-triangle-fill me-2"></i>
//             <strong><h5>Sem Avisos No Momento</h5></strong>
//             <small class="ms-auto"></small>
//         </div>
//     </div>`;
// alertTemp.innerHTML = structNonAlert;
