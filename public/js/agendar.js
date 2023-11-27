window.addEventListener("load",main)
function main(){
    const form = document.querySelector("form")
    const inputDate = document.getElementById('data');
    definirMinimo(inputDate);
    inputDate.addEventListener('change', validarSelecao);
    form.addEventListener("submit", isEmpty)
    form.reset()   
}

// Função para verificar se a data é um sábado ou domingo
function isFimDeSemana(date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 é domingo, 6 é sábado
}

// Lógica para definir o mínimo a partir de amanhã, excluindo finais de semana
function definirMinimo(inputDate) {
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);

  // Verifica se amanhã é um fim de semana, se for, avança para a próxima segunda-feira
  while (isFimDeSemana(amanha)) {
    amanha.setDate(amanha.getDate() + 1);
  }

  // Formata a data para o formato esperado pelo input date (YYYY-MM-DD)
  const dataFormatada = amanha.toISOString().split('T')[0];

  // Define o atributo 'min' do input para permitir apenas datas a partir de amanhã, excluindo finais de semana
  inputDate.setAttribute('min', dataFormatada);
}

function validarSelecao(inputDate) {
    const dataSelecionada = new Date(inputDate.value);
    while (isFimDeSemana(dataSelecionada)) {
      dataSelecionada.setDate(dataSelecionada.getDate() + 1);
      inputDate.value = dataSelecionada.toISOString().split('T')[0];
    }
  }
  





function geradorDeID(){
    return new Date().getTime().toString()
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
    const id = geradorDeID();
    const name = document.getElementById("name").value;
    const email = document.getElementById("mail").value;
    const telefone = document.getElementById("telefone").value;
    const marca = document.getElementById("marca").value;
    const ano = document.getElementById("ano").value;
    const modelo = document.getElementById("modelo").value;
    const placa = document.getElementById("placa").value.replace(/-/g, '').trim();
    const comentario = document.getElementById("Comentario").value;
    const data = document.getElementById("data").value;

    const dados = {
        id,
        name,
        email,
        telefone,
        marca,
        ano,
        modelo,
        placa,
        comentario,
        data,
        entregue : false,
        avaliacao : false,
        orcamento : false,
        execucao : false,
        entrega : false,
        descricao : '',
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
