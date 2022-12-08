const {Router} = require('express');
const { check } = require('express-validator');
const AppController = require('../controller/app.controller');
const AppHelper = require('../helpers/app.helper');
const AppMiddleware = require('../middleware/app.middleware');

class AppRouter{
    constructor(){
        //Express Router
        this.router = Router();

        //Controllers
        this.appController = new AppController

        //Middleware
        this.appMiddleware = new AppMiddleware

        //Helper
        this.appHelper = new AppHelper

        //Petition
        this.appRouterGet();

        //User Coleccion Petitions
        this.userColeccionPost();
        this.userColeccionPut();
        this.userColeccionGet();
        this.userColeccionDelete();
    }
    //App Router
    appRouterGet = async () => {
        try {
            //Recive data & send to Controller
            await this.router.get('/', this.appController.appGet)
        } catch (error) {
            throw new Error('File: app.routes.js - GET')
        }
    }

    //Router User Coleccion
    userColeccionLogin = async () => {
        try {
            await this.router.post('/login', this.appController.userColeccionLogin)
        } catch (error) {
            throw new Error('File: app.routes.js - Method: userColeccionPost - POST')
        }
    }

    userColeccionPost = async () => {
        try {
            await this.router.post('/userColeccion',[check('name', 'Invalid Name').not().isEmpty(),
                                                     check('lastname', 'Invalid Lastname').not().isEmpty(),
                                                     check('password', 'Invalid Password').not().isEmpty().isStrongPassword({minLength: 6}),
                                                     check('email', 'Invalid Email').not().isEmpty().isEmail().custom(this.appHelper.emailExist),
                                                     //check('role', 'Invalido Role').not().isEmpty().isIn(['Admin', 'User']),
                                                     check('role', 'Invalid Role').custom(this.appHelper.validateRole),
                                                     this.appMiddleware.validationsReq], this.appController.userColeccionPost)
        } catch (error) {
            throw new Error('File: app.routes.js - Method: userColeccionPost - POST')
        }
    }

    userColeccionPut = async () => {
        try {
            await this.router.put('/userColeccion/:id', [check('id', 'Invalid Id').isMongoId(),
                                                         check('id').custom(this.appHelper.userExist), 
                                                         this.appMiddleware.validationsReq], this.appController.userColeccionPut)
        } catch (error) {
            throw new Error('File: app.routes.js - Method: userColeccionPut - PUT')
        }
    }

    userColeccionGet = async () => {
        try {
            await this.router.get('/userColeccion', this.appController.userColeccionGet)
        } catch (error) {
            throw new Error('File: app.routes.js - Method: userColeccionPut - PUT')
        }
    }

    userColeccionDelete = async () => {
        try {
            await this.router.delete('/userColeccion/:id', [check('id', 'Invalid Id').isMongoId(),
                                                         check('id').custom(this.appHelper.userExist), 
                                                         this.appMiddleware.validationsReq], this.appController.userColeccionDelete)
        } catch (error) {
            throw new Error('File: app.routes.js - Method: userColeccionPut - PUT')
        }
    }
}

module.exports = AppRouter;