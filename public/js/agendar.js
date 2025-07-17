function agendar() {
    const form = document.querySelector('form.agendar');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/agendar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert('Agendamento realizado com sucesso!');
                form.reset();
            } else {
                alert('Erro ao agendar. Tente novamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Erro ao agendar. Tente novamente.');
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = agendar;
} else {
    agendar();
}
