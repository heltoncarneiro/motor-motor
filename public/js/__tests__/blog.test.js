const blog = require('../blog');

describe('blog', () => {
    let section;

    beforeEach(() => {
        document.body.innerHTML = `
            <section class="blog"></section>
        `;
        section = document.querySelector('section.blog');

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([
                    {
                        titulo: 'Test Post 1',
                        conteudo: 'This is the content of test post 1.',
                        imagem: 'test1.jpg',
                    },
                    {
                        titulo: 'Test Post 2',
                        conteudo: 'This is the content of test post 2.',
                        imagem: 'test2.jpg',
                    },
                ]),
            })
        );

        blog();
    });

    it('should be defined', () => {
        expect(blog).toBeDefined();
    });

    it('should fetch and display the blog posts', async () => {
        await new Promise(process.nextTick);

        const articles = section.querySelectorAll('article');
        expect(articles.length).toBe(2);

        expect(articles[0].querySelector('h2').textContent).toBe('Test Post 1');
        expect(articles[0].querySelector('p').textContent).toBe('This is the content of test post 1.');
        expect(articles[0].querySelector('img').src).toContain('test1.jpg');

        expect(articles[1].querySelector('h2').textContent).toBe('Test Post 2');
        expect(articles[1].querySelector('p').textContent).toBe('This is the content of test post 2.');
        expect(articles[1].querySelector('img').src).toContain('test2.jpg');
    });

    it('should handle errors when fetching the blog posts', async () => {
        global.fetch = jest.fn(() => Promise.reject('Network error'));
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        blog();

        await new Promise(process.nextTick);

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', 'Network error');
        consoleErrorSpy.mockRestore();
    });
});
