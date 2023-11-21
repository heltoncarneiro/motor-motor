window.addEventListener("load", main)
const blog = [
    {
        id:0,
        titulo: "Seu carro não liga de manhã?",
        paragrafo: "Um carro antigo pode não ligar de manhã devido a problemas na bateria, no sistema de ignição ou na bomba de combustível. O envelhecimento dos componentes e a corrosão podem causar dificuldades na partida.",
        img: "imagens/1.png",
        alt: "Homem tentando ligar o carro, mas o carro não liga",
    },
    {
        id:1,
        titulo: "Como verificar o se o pneu do carro precisa trocar?",
        paragrafo: "Verifique a profundidade dos sulcos do pneu usando um medidor de profundidade ou uma moeda. Se os sulcos estiverem abaixo de 1,6 mm de profundidade ou se houver desgaste irregular, é hora de trocar o pneu.",
        img: "imagens/2.png",
        alt: "Mulher encima do pneu do carro para trocar",
    },
    {
        id:2,
        titulo: "Como verificar o óleo do carro?",
        paragrafo: "Abra o capô, retire a vareta de óleo, limpe e reinsira. Retire novamente e verifique o nível entre as marcas \"mínimo\" e \"máximo\". Adicione óleo se estiver baixo. Feche o capô.",
        img: "imagens/3.png",
        alt: "Homem verificando o óleo do carro",
    },
    {
        id:4,
        titulo: "Como evitar corrosão?",
        paragrafo: "Lave o carro frequentemente para remover sujeira e sal, que são agentes corrosivos. Aplique cera protetora regularmente para proteger a pintura. Evite estacionar em áreas propensas à umidade e, se possível, guarde o carro em um local coberto.",
        img: "imagens/4.png",
        alt: "Carro bastante enferrujado",
    },
];

function main(){
    for (let x = 0; x < blog.length; x++) {
        const section = document.querySelector("section.blog")
        const img = document.createElement("img")
        const titulo = document.createElement("h2")
        const paragrafo = document.createElement("p")
        const article = document.createElement("article")
        article.id = blog[x].id;
        img.src = blog[x].img
        titulo.innerText = blog[x].titulo
        paragrafo.innerText = blog[x].paragrafo
        article.appendChild(titulo)
        article.appendChild(paragrafo)
        article.appendChild(img)
        section.appendChild(article)
        console.log(blog[x].id)
    }
}
    
