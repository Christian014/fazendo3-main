require("express-async-errors");
const appError = require("./utils/appError")

const database = require("./database/sqlite")

const migrationsRun = require("./database/sqlite/migrations/index")


const express = require("express");

const routes = require("./routes");

const app = express();


database();

migrationsRun();


app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {

    if(error instanceof appError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    };
    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "INTERNAL ERROR",
    });
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`
    server está rodando na porta ${PORT}`);
});