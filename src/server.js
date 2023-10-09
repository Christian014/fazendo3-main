
const database = require("./database/sqlite")

const migrationsRun = require("./database/sqlite/migrations/index")


const express = require("express");

const routes = require("./routes");

const app = express();


database();

migrationsRun();


app.use(express.json());

app.use(routes);

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`
    server está rodando na porta ${PORT}`);
});