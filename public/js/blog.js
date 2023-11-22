window.addEventListener("load", main)

function renderizaDadosNaTela(){
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

async function main() {
    // CONSUMIR A API DE FILMES
    const resultado = await fetch("http://localhost:3334/api/blog")
    const converterResultadoParaJson = await resultado.json()
    
    blog = converterResultadoParaJson
    renderizaDadosNaTela()
}
    
