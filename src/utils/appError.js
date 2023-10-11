require ("express-async-errors");

class appError{
    message;
    statusCode;

    constructor(message, statusCode){
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = appError;