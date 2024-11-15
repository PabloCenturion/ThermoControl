const arduinoIP = 'http://192.168.1.214/';
let ultimaHoraSalva = null; 


const structLoading = `<section class="displayFlex"> <div class="lds-ring"><div></div><div></div><div></div><div></div></div> <span>Carregando...</spans><section>`

        document.getElementById('status-temperature').innerHTML = structLoading;
        document.getElementById('status-umidity').innerHTML = structLoading;
        document.getElementById('status-power').innerHTML = structLoading;
        document.getElementById('status-current').innerHTML = structLoading;
        
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


        saveDataByHour(dado);


    } catch (erro) {
        console.log('Erro ao buscar dados do Arduino:', erro);

    }
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



























// Estrutura de alertas quando não há dados
const alertTemp = document.getElementById('alertTemp');
const alertHumidity = document.getElementById('alertHumidity');
const structNonAlert = `
    <div class="block-alert-non">
        <div id="alertNoWarning" class="alert non-info d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <strong><h5>Sem Avisos No Momento</h5></strong>
            <small class="ms-auto"></small>
        </div>
    </div>`;
alertTemp.innerHTML = structNonAlert;
