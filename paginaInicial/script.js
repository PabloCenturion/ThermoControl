 /*Aqui, você define o endereço IP do Arduino (ou qualquer dispositivo conectado)
        que estará servindo os dados.*/

        const arduinoIP = 'http://192.168.1.214/'; 

        /*Esta função é assíncrona (usando async), o que significa que ela pode aguardar
         operações que levam tempo (como fazer uma requisição a outro servidor).*/

        async function buscarSensorDados() {

            try {

                /*Aqui, o código usa fetch para fazer uma requisição HTTP ao IP do Arduino
                O await faz com que o JavaScript espere a resposta do Arduino antes de
                continuar com a execução.*/
                const respostaArduino = await fetch(arduinoIP);

                /*Caso a requisição não tenha sido bem-sucedida (por exemplo, o Arduino está fora do ar),
                 o código verifica se o status da resposta é "ok". Se não for (!), ele lança um erro com uma 
                 mensagem indicando o status da resposta.*/

                /*A propriedade ok é um atributo da resposta(response) do fetch contém um Boolean 
                informando se a resposta foi bem-sucedida true ou false. */

                if (!respostaArduino.ok) {
                    throw new Error(`Erro na requisição: ${respostaArduino.statusText}`);

                }

                //Conversão da resposta em JSON
                /*utilização do json() pois estamos pegando dados de uma requisição HTTP e 
                transformando num objeto JavaScript que pode ser manipulado no código.*/

                const dado = await respostaArduino.json();

                console.log(dado); // Verifique a estrutura dos dados

                document.getElementById('status-temperature').innerText = `${dado.temperatura}°C`
                document.getElementById('status-umidity').innerText = `${dado.umidade}%`
                document.getElementById('status-power').innerText = `${dado.potencia.toFixed(2)}W`
                document.getElementById('status-current').innerText = `${dado.corrente.toFixed(2)}A`

        /*Se algum erro ocorrer durante a requisição 
        o código captura o erro e o exibe no console do navegador, permitindo depurar a situação.*/

            } catch (erro) {
                console.log('Erro ao buscar dados do Arduino:', erro);
            }
        }


        /* O setInterval chama a função buscarSensorDados a cada 5 segundos,
        garantindo que a página seja atualizada automaticamente com as leituras mais recentes do Arduino*/
        setInterval(buscarSensorDados, 5000);


        // Busca os dados imediatamente ao carregar a página
        window.onload = buscarSensorDados;

