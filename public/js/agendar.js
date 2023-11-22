window.addEventListener("load",main)
function main(){
    const form = document.querySelector("form")
    form.addEventListener("submit", isEmpty)
    form.reset()
}
function isEmpty(evento) {
    evento.preventDefault(); 
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        if (input.value === "") {
            input.style.border = "2px solid red";
        } else {
            input.style.border = ""; 
        }
    });

    if (!verificarCamposVazios(inputs)) {
        enviaDadosParaOBackend();
        limparCamposDoFormulario();
    }
}
function limparCamposDoFormulario() {
    const formulario = document.querySelector("form")
    formulario.reset(); 
  }
  

function verificarCamposVazios(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            return true; 
        }
    }
    return false; 
}

async function enviaDadosParaOBackend() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("mail").value;
    const telefone = document.getElementById("telefone").value;
    const marca = document.getElementById("marca").value;
    const ano = document.getElementById("ano").value;
    const modelo = document.getElementById("modelo").value;
    const placa = document.getElementById("placa").value;
    const comentario = document.getElementById("Comentario").value;
    const data = document.getElementById("data").value;

    const dados = {
        name,
        email,
        telefone,
        marca,
        ano,
        modelo,
        placa,
        comentario,
        data
    };

    const resultado = await fetch('http://localhost:3334/api/agendados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)    
    });
    console.log(resultado);
}   
