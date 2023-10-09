const sqliteConnection = require("../database/sqlite/index");

class usersControllers {

    async createUsers(request, response){

        const database = await sqliteConnection();

        const { name, email, password } = request.body;

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
        
        const checkUserExists = database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (checkUserExists){
            console.log("email já esta em uso!!!");
        };

        return response.status(201).json();

    };

};
module.exports = usersControllers;