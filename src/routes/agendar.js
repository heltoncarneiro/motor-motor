const express = require('express');
const router = express.Router();

const agendados = []

router.post("/api/agendados", (requisicao, resposta) => {
    const dados = requisicao.body
    agendados.push(dados)
    console.log(dados)
    return resposta.status(204).json();
})

router.get("/api/agendados", (requisicao, resposta) => {
    return resposta.status(200).json(agendados)
})

/*
// RESTFULL
// /api/carrinhos/1699916132336
carrinhoRouters.get("/api/carrinhos/:id", (requisicao, resposta) => {
    // Obter o ID que foi passado na rota
    const routeID = requisicao.params.id

    // Procurar no array de carrinho se o elemento existe
    for (let x = 0; x < carrinho.length; x++) {
        if (carrinho[x].id === routeID) {
            // Se existir, 200 e o objeto
            return resposta.status(200).json(carrinho[x])
        }
    }
    // Senão, 404 e não passar nada
    return resposta.status(404).json();
}) 


// Outra maneira de exportar dados. O programador 
// pode definir o nome do objeto ao importar
*/
module.exports = router;