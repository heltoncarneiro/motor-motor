function main() {
    const form = document.querySelector("form");
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const placa = document.getElementById('placa').value.replace(/-/g, '').trim();
        try {
            const response = await fetch(`http://localhost:3334/api/agendados/${placa}`);
            const data = await response.json();
            if (response.ok) {
                renderizar(data);
            } else {
                handleError();
            }
        } catch (error) {
            console.error('Error:', error);
            handleError();
        }
    });
}

function renderizar(dados) {
    const descricao = document.querySelector('p.descricao');
    descricao.textContent = dados.descricao;

    const statusMap = {
        entregue: dados.entregue,
        avaliacao: dados.avaliacao,
        orcamento: dados.orcamento,
        execucao: dados.execucao,
        entrega: dados.entrega,
    };

    for (const status in statusMap) {
        const elemento = document.querySelector(`.${status}`);
        if (statusMap[status]) {
            elemento.style.backgroundColor = "#D15555";
        } else {
            elemento.style.backgroundColor = "#fff";
        }
    }
}

function handleError() {
    const descricao = document.querySelector('p.descricao');
    descricao.textContent = "placa não encontrada no registro";
    const circulos = document.querySelectorAll(".circulo");
    circulos.forEach(circulo => {
        circulo.style.backgroundColor = "#fff";
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { main, renderizar, handleError };
} else {
    window.addEventListener("load", main);
}