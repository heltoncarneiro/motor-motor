const express = require('express');
const cors = require('cors');
const blogRoutes = require("./src/routes/blog.js");

const app = express();

app.use(express.json())
app.use(express.static("public/"))
app.use(cors());

app.use('/', blogRoutes);

app.listen(3334, () => {
    console.log("Seu servidor foi levantado")
})