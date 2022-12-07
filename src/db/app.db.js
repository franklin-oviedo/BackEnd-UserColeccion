const mongoose = require('mongoose')

class AppMongoDB {

    constructor() {
        //Mongoose
        this.mongoose = mongoose;

        //Conection
        this.dbConnection();
    }
    dbConnection = async () => {
        try {
            await this.mongoose.connect(process.env.CNT_MONGO_DB)
            console.log(`Connection to MongoDB: ${'Succesfull'.green}`)
        } catch (error) {
            console.log(`Conection to MongoDB: ${'Error'.red}`)
            throw new Error('Error trying connection to MongoDB')
        }
    }
}


module.exports = AppMongoDB;