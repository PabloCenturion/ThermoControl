


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

    if(document.querySelector("#alert-temp").checked){

        localStorage.setItem("alertTempChecked", true)

    }else{

        localStorage.setItem("alertTempChecked", false)
    }

    if(document.querySelector("#alert-humidity").checked){

        localStorage.setItem("alertHumidityChecked", true)

    }else{

        localStorage.setItem("alertHumidityChecked", false)
    }

    // Salva as configurações no localStorage
    localStorage.setItem('tempMin', tempMin);
    localStorage.setItem('tempMax', tempMax);
    localStorage.setItem('tempHigh', tempHigh);
    localStorage.setItem('humidityMin', humidityMin);
    localStorage.setItem('humidityMax', humidityMax);
    localStorage.setItem('humidityHigh', humidityHigh);

    alert("Configurações salvas com sucesso");
}

    const alertHumidityCheckbox = document.getElementById("alert-humidity");
    const alertTempCheckbox = document.getElementById("alert-temp");




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

    console.log(localStorage.getItem("humidityMin"))



}


    exibirValoresInput()





//teste chat




