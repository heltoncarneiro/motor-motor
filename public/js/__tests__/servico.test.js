const { main, renderizar, handleError } = require('../servico');

describe('servico', () => {
    let form;
    let placaInput;
    let descricao;
    let entregue, avaliacao, orcamento, execucao, entrega;

    beforeEach(() => {
        document.body.innerHTML = `
            <form>
                <input id="placa" />
                <button type="submit">VERIFICAR</button>
            </form>
            <div class="status">
                <div class="circulo entregue"></div>
                <div class="circulo avaliacao"></div>
                <div class="circulo orcamento"></div>
                <div class="circulo execucao"></div>
                <div class="circulo entrega"></div>
            </div>
            <p class="descricao"></p>
        `;
        form = document.querySelector('form');
        placaInput = document.getElementById('placa');
        descricao = document.querySelector('p.descricao');
        entregue = document.querySelector('.entregue');
        avaliacao = document.querySelector('.avaliacao');
        orcamento = document.querySelector('.orcamento');
        execucao = document.querySelector('.execucao');
        entrega = document.querySelector('.entrega');
    });

    describe('main', () => {
        it('should call renderizar with the correct data when the request is successful', async () => {
            const mockData = {
                descricao: 'Test description',
                entregue: true,
                avaliacao: true,
                orcamento: false,
                execucao: false,
                entrega: false,
            };
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockData),
                })
            );

            main();
            placaInput.value = 'ABC-1234';
            form.dispatchEvent(new Event('submit'));

            await new Promise(process.nextTick);

            expect(descricao.textContent).toBe('Test description');
            expect(entregue.style.backgroundColor).toBe('rgb(209, 85, 85)');
            expect(avaliacao.style.backgroundColor).toBe('rgb(209, 85, 85)');
            expect(orcamento.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(execucao.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(entrega.style.backgroundColor).toBe('rgb(255, 255, 255)');
        });

        it('should call handleError when the request fails', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    json: () => Promise.resolve({}),
                })
            );

            main();
            placaInput.value = 'ABC-1234';
            form.dispatchEvent(new Event('submit'));

            await new Promise(process.nextTick);

            expect(descricao.textContent).toBe('placa não encontrada no registro');
            expect(entregue.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(avaliacao.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(orcamento.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(execucao.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(entrega.style.backgroundColor).toBe('rgb(255, 255, 255)');
        });

        it('should call handleError when there is a network error', async () => {
            global.fetch = jest.fn(() => Promise.reject('Network error'));
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            main();
            placaInput.value = 'ABC-1234';
            form.dispatchEvent(new Event('submit'));

            await new Promise(process.nextTick);

            expect(descricao.textContent).toBe('placa não encontrada no registro');
            expect(entregue.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(avaliacao.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(orcamento.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(execucao.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(entrega.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', 'Network error');
            consoleErrorSpy.mockRestore();
        });
    });

    describe('renderizar', () => {
        it('should render the service status correctly', () => {
            const mockData = {
                descricao: 'Test description',
                entregue: true,
                avaliacao: true,
                orcamento: false,
                execucao: false,
                entrega: false,
            };

            renderizar(mockData);

            expect(descricao.textContent).toBe('Test description');
            expect(entregue.style.backgroundColor).toBe('rgb(209, 85, 85)');
            expect(avaliacao.style.backgroundColor).toBe('rgb(209, 85, 85)');
            expect(orcamento.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(execucao.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(entrega.style.backgroundColor).toBe('rgb(255, 255, 255)');
        });
    });

    describe('handleError', () => {
        it('should display an error message and reset the status indicators', () => {
            handleError();

            expect(descricao.textContent).toBe('placa não encontrada no registro');
            expect(entregue.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(avaliacao.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(orcamento.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(execucao.style.backgroundColor).toBe('rgb(255, 255, 255)');
            expect(entrega.style.backgroundColor).toBe('rgb(255, 255, 255)');
        });
    });
});
