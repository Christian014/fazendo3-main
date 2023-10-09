const sqliteConnection = require("../database/sqlite/index");

class moviesControllers {
    async createMovies(request, response){

        const database = await sqliteConnection();
        const { title, description, rating } = request.body;

        await database.run("INSERT INTO notes (title, description, rating) VALUES (?, ?, ?)", [title, description, rating]);

        response.json({title, description, rating});
    };
};

module.exports = moviesControllers;