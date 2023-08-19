const input1 = document.getElementById("input1")
const input2 = document.getElementById("input2")
const button = document.getElementById("btn")
const form = document.querySelector("form")
const txt = document.getElementById("txt")

const url = 'https://api.bluelytics.com.ar/v2/latest';

fetch(url)
    .then(response => response.json())
    .then(data => {
        let blueDollarValue =  data.blue.value_avg
        txt.innerText = 'El valor actual del Dólar es : ' + blueDollarValue

        //Dólares a Pesos
        form.addEventListener("submit", async (e) => {
            e.preventDefault()
            if (input1.value === '')return

            button.setAttribute('aria-busy', 'true')
            const dolares = parseFloat(input1.value)
            const pesos = dolares * blueDollarValue
            
            await new Promise(resolve => setTimeout(resolve, 100))
            
            input2.value = pesos
            
            button.setAttribute('aria-busy', 'false')
            input1.value = ''
        })
        //Pesos a Dólares
        form.addEventListener("submit", async (e) => {
            e.preventDefault()
            if (input2.value === '')return

            button.setAttribute('aria-busy', 'true')
            
            const pesos = parseFloat(input2.value);
            const dolares = pesos / blueDollarValue
            
            await new Promise(resolve => setTimeout(resolve, 100))
            
            input1.value = dolares
            
            button.setAttribute('aria-busy', 'false')
            input2.value = ''
        })
    })
    .catch(error => {
        console.error('Ocurrió un error:', error)
    })