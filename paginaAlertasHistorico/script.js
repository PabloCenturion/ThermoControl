function clearStorage() {
    localStorage.removeItem("alerts");
    alert("Todos os alertas foram excluídos");
}

const umaSemanaEmMilissegundos = 7 * 24 * 60 * 60 * 1000; // 7 dias

setInterval(clearStorage, umaSemanaEmMilissegundos);


// inicializando o localStorage com um array vazio

if (!localStorage.getItem("alerts")) {
    localStorage.setItem("alerts", JSON.stringify([])); // Inicializa com um array vazio
    //uso do JSON.stringify para transformar o array em uma string, pois o localStorage não consegue armazenar uma estrutura array ou objetos.

}



function loadAlertsFromLocalStorage() {
    
    const divAlertStorage = document.getElementById("div-alert-storage");

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
