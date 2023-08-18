const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const button = document.getElementById("btn");
const form = document.querySelector("form");
const txt = document.getElementById("txt");

const url = 'https://api.bluelytics.com.ar/v2/latest';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const blueDollarValue =  data.blue.value_avg;
        txt.innerText = 'El valor actual del Dólar es : ' + blueDollarValue
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            button.setAttribute('aria-busy', 'true');
            
            const dólares = parseFloat(input1.value);
            const pesos = dólares * blueDollarValue;
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            input2.value = pesos;
            
            button.setAttribute('aria-busy', 'false');
        });
    })
    .catch(error => {
        console.error('Ocurrió un error:', error);
    });

