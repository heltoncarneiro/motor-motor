window.addEventListener("load", main)

function main(){
    const form = document.querySelector("form")
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const placa = document.getElementById('placa').value.replace(/-/g, '').trim();
        const resposta = await fetch(`http://localhost:3334/api/agendados/${placa}`);
        const descricao = document.querySelector('p.descricao')
        if (resposta.ok) {
            const dados = await resposta.json();
            renderizar(dados)
        } else {
            const entregue = document.querySelector(".entregue").style.backgroundColor = "#fff"
            const avaliacao = document.querySelector(".avaliacao").style.backgroundColor = "#fff"
            const orcamento = document.querySelector(".orcamento").style.backgroundColor = "#fff"
            const execucao = document.querySelector(".execucao").style.backgroundColor = "#fff"
            const entrega = document.querySelector(".entrega").style.backgroundColor = "#fff" 
            descricao.textContent = "placa não encontrada no registro"
        }
    });
}

function renderizar(dados){
    const descricao = document.querySelector('p.descricao')
    descricao.textContent = dados.descricao
    if(dados.entregue === true){
        const entregue = document.querySelector(".entregue")
        entregue.style.backgroundColor = "#D15555"
    }
    if(dados.avaliacao === true){
        const avaliacao = document.querySelector(".avaliacao")
        avaliacao.style.backgroundColor = "#D15555"
    }
    if(dados.orcamento === true){
        const orcamento = document.querySelector(".orcamento")
        orcamento.style.backgroundColor = "#D15555"
    }
    if(dados.execucao === true){
        const execucao = document.querySelector(".execucao")
        execucao.style.backgroundColor = "#D15555"
    }
    if(dados.entrega === true){
        const entrega = document.querySelector(".entrega")
        entrega.style.backgroundColor = "#D15555"
    }

}