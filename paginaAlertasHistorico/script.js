function clearStorage() {
    localStorage.removeItem("alerts");
    alert("Todos os alertas foram excluídos");
}

const umaSemanaEmMilissegundos = 7 * 24 * 60 * 60 * 1000; // 7 dias

setInterval(clearStorage, umaSemanaEmMilissegundos);