const express = require('express');
const cors = require('cors');
const AppMongoDB = require('../db/app.db');
const AppRouter = require('../routes/app.routes');


class AppServer {
    constructor() {
        //Express
        this.app = express();

        //Routes Config
        this.appUrlPath = '/api'
        this.appRouter = new AppRouter;

        //Variables de Entorno
        this.appPortHost = process.env.PORT_HOST;

        //Mongo Db
        this.appMongoDB = new AppMongoDB;
        this.conectionDB();

        //Middleware
        this.middlewares();
       
    }
    //Function Conection to MongoDB
    conectionDB = async () => {
        await this.appMongoDB.dbConnection;
    }
    //Midddleware Configuration
    middlewares = () => {
        //Cors
        this.app.use(cors())
        //Express Json
        this.app.use(express.json());
        //Router Configuration URL - AppRouter
        this.app.use(this.appUrlPath, this.appRouter.router);
    }
    
    //App Run Url & Port
    listen = () => {
        this.app.listen(this.appPortHost, () => {
            console.log(`App Backend Runing on: ${process.env.URL_HOST.blue}${process.env.PORT_HOST.blue}`)
        })
    }

}
module.exports = AppServer;