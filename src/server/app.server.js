const express = require('express');
const cors = require('cors');
const AppMongoDB = require('../db/app.db');
const AppRouter = require('../routes/app.routes');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('../../swagger.json')
const hbs = require('hbs');


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
        //Static Web
        this.app.use(express.static('src'))
        this.app.set('views engine', 'hbs');
        //Router Configuration URL - AppRouter
        this.app.use(this.appUrlPath, this.appRouter.router);
        //Swagger
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
    }
    
    //App Run Url & Port
    listen = () => {
        this.app.listen(this.appPortHost, () => {
            console.log(`App Backend Runing on: ${process.env.URL_HOST.blue}${process.env.PORT_HOST.blue}/api`)
        })
    }

}
module.exports = AppServer;