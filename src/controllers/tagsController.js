const sqliteConnection = require("../database/sqlite/index");

class moviesTagsController{

    async createTags (request, response){

        const database = await sqliteConnection();
         
        const { name} = request.body;

        await database.run("INSERT INTO tags (name) VALUES (?)", [name]);

        response.json({name});
    };
};

module.exports = moviesTagsController;