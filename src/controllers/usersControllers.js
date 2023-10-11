const sqliteConnection = require("../database/sqlite/index");
const { hash } = require("bcryptjs");

class usersControllers {

    async createUsers(request, response){

        const { name, email, password } = request.body;
        
        const hashedPassword = await hash(password, 8);
        
        const database = await sqliteConnection();

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (checkUserExists){

            response.json("email ja esta em uso!!!");
            
            return console.log("nao vou criar pois ja esta em uso!!!");
        };

        
        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        
        return response.status(201).json();

    };


    async update(request, response){
            const { name, email } = request.body;
            const { id } = request.params;

            const database = await sqliteConnection();

            const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

            if(!user){
                console.log("usuario não encontrado");
            };

            const checkEmailUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
           
            console.log(user);
            console.log(checkEmailUsersExists);

            if(checkEmailUsersExists && checkEmailUsersExists.id !== user.id){

             return response.status(400).json("Email ja está cadastrado !!!");

            };

            user.name = name;
            user.email = email;

            await database.run(
            `
                UPDATE users SET
                name = ?,
                email = ?,
                updated_at = ?
                WHERE id = ? 
            `,
            [
                user.name,
                user.email,
                new Date(),
                id
            ]
        );

            return response.json("atualizado com sucesso");
    }

};
module.exports = usersControllers;