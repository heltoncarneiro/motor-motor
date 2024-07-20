const express = require('express');
const cors = require('cors');
const blogRoutes = require("./src/routes/blog.js");
const agendados = require("./src/routes/agendar.js");

const app = express();

app.use(express.json())
app.use(express.static("public/"))
app.use(cors());

app.use('/', blogRoutes);
app.use('/', agendados);

app.listen(3334, () => {
    setInterval(() => {
        // Substitua a função abaixo pela tarefa que você deseja executar a cada minuto
        console.log("Executando a tarefa a cada 1 minuto");
    }, 60 * 1000);
})