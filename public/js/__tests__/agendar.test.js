const agendar = require('../agendar');

describe('agendar', () => {
    let form;
    let nameInput;
    let phoneInput;
    let emailInput;
    let brandInput;
    let yearInput;
    let modelInput;
    let plateInput;
    let serviceInput;
    let dateInput;

    beforeEach(() => {
        document.body.innerHTML = `
            <form class="agendar">
                <input name="usuario" id="name" />
                <input name="telefone" id="telefone" />
                <input name="mail" id="mail" />
                <input name="marca" id="marca" />
                <input name="ano" id="ano" />
                <input name="modelo" id="modelo" />
                <input name="placa" id="placa" />
                <textarea name="Comentario" id="Comentario"></textarea>
                <input name="data" id="data" type="date" />
                <button type="submit">AGENDAR</button>
            </form>
        `;
        form = document.querySelector('form.agendar');
        nameInput = document.getElementById('name');
        phoneInput = document.getElementById('telefone');
        emailInput = document.getElementById('mail');
        brandInput = document.getElementById('marca');
        yearInput = document.getElementById('ano');
        modelInput = document.getElementById('modelo');
        plateInput = document.getElementById('placa');
        serviceInput = document.getElementById('Comentario');
        dateInput = document.getElementById('data');

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        );

        global.alert = jest.fn();

        agendar();
    });

    it('should be defined', () => {
        expect(agendar).toBeDefined();
    });

    it('should submit the form with the correct data', async () => {
        nameInput.value = 'John Doe';
        phoneInput.value = '1234567890';
        emailInput.value = 'john.doe@example.com';
        brandInput.value = 'Ford';
        yearInput.value = '2023';
        modelInput.value = 'Mustang';
        plateInput.value = 'ABC-1234';
        serviceInput.value = 'Oil change';
        dateInput.value = '2023-10-27';

        form.dispatchEvent(new Event('submit'));

        await new Promise(process.nextTick);

        expect(fetch).toHaveBeenCalledWith('/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: 'John Doe',
                telefone: '1234567890',
                mail: 'john.doe@example.com',
                marca: 'Ford',
                ano: '2023',
                modelo: 'Mustang',
                placa: 'ABC-1234',
                Comentario: 'Oil change',
                data: '2023-10-27',
            }),
        });
    });

    it('should show a success message when the form is submitted successfully', async () => {
        form.dispatchEvent(new Event('submit'));

        await new Promise(process.nextTick);

        expect(alert).toHaveBeenCalledWith('Agendamento realizado com sucesso!');
    });

    it('should show an error message when the form submission fails', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: false }),
            })
        );

        form.dispatchEvent(new Event('submit'));

        await new Promise(process.nextTick);

        expect(alert).toHaveBeenCalledWith('Erro ao agendar. Tente novamente.');
    });

    it('should show an error message when there is a network error', async () => {
        global.fetch = jest.fn(() => Promise.reject('Network error'));

        form.dispatchEvent(new Event('submit'));

        await new Promise(process.nextTick);

        expect(alert).toHaveBeenCalledWith('Erro ao agendar. Tente novamente.');
    });
});
