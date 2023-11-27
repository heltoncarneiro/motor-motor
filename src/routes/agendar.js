const express = require('express');
const router = express.Router();

const agendados = [
    {
        id : "1701040135099",
        name :	"asd",
        email :	"asdasd@gmail.com",
        telefone :	"asd",
        marca :	"asd",
        ano :	"asd",
        modelo : "asd",
        placa :	"asd4556",
        comentario : "asd",
        data :	"2023-11-28",
        entregue :	true,
        avaliacao :	true,
        orcamento :	false,
        execucao :	false,
        entrega :	false,
        descricao :	"Carro com problema no motor, motor precisa ser modificado",
    },
    {
        id : "1701040135100",
        name :	"asd",
        email :	"asdasd@gmail.com",
        telefone :	"asd",
        marca :	"asd",
        ano :	"asd",
        modelo : "asd",
        placa :	"asd4545",
        comentario : "asd",
        data :	"2023-11-28",
        entregue :	true,
        avaliacao :	true,
        orcamento :	true,
        execucao :	true,
        entrega :	true,
        descricao :	"Carro pronto para ser entregue",
    }
    
]

router.post("/api/agendados", (requisicao, resposta) => {
    const dados = requisicao.body
    agendados.push(dados)
    console.log(dados)
    return resposta.status(204).json();
})

router.get("/api/agendados", (requisicao, resposta) => {
    return resposta.status(200).json(agendados)
})


router.get("/api/agendados/:placa", (requisicao, resposta) => {
    const routerPlaca = requisicao.params.placa.toString()
    console.log(routerPlaca)
    for (let x = 0; x < agendados.length; x++) {
        if (agendados[x].placa === routerPlaca) {
            // Se existir, 200 e o objeto
            return resposta.status(200).json(agendados[x])
        }
    }
    // Senão, 404 e não passar nada
    return resposta.status(404).json();
}) 


module.exports = router;