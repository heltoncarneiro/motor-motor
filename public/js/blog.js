async function blog() {
    const section = document.querySelector('section.blog');
    try {
        const response = await fetch('/blog');
        const data = await response.json();
        data.forEach(post => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h2>${post.titulo}</h2>
                <p>${post.conteudo}</p>
                <img src="${post.imagem}" alt="${post.titulo}">
            `;
            section.appendChild(article);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = blog;
} else {
    blog();
}
