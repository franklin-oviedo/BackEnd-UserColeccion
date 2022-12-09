const { response, request } = require("express");
const appModel = require("../models/app.model");
const bcryptjs = require('bcryptjs');
const AppHelper = require("../helpers/app.helper");
const appHelper = new AppHelper;

class AppController {

    //App
    appGet = async (req = request, res = response) => {
        try {
            await res.status(200).send('App Backend Runing!');
        } catch (error) {
            throw new Error('File Controller - AppGet - Error');
        }
    }
    //User Coleccion
    userColeccionLogin = async (req = request, res = response) => {
        try {
            const { email, password } = await req.body;
            const existEmail = await appModel.findOne({ email })

            if (!existEmail) {
                return res.status(500).json({
                    msg: 'Invalid Email'
                })
            }

            if (!existEmail.status) {
                return res.status(500).json({
                    msg: 'Invalid Email'
                })
            }

            const passwordValidator = await bcryptjs.compareSync(password, existEmail.password);
            if (!passwordValidator) {
                return res.status(500).json({
                    msg: 'Invalid Password'
                })
            }

            const token = await appHelper.generateJWT(existEmail.id)
            res.json({
                msg: 'Login Success',
                existEmail,
                token
            })

        } catch (error) {
            console.log(error)
            throw new Error('File: Controller - Method: userColeccionLogin - Error');
        }
    }

    userColeccionPost = async (req = request, res = response) => {
        try {

            //User Model - Send Body
            const user = new appModel(req.body);
            //Exist Email
            const { password } = req.body;

            //BcryptJS
            const salt = bcryptjs.genSaltSync();
            //Encrypt Password
            user.password = bcryptjs.hashSync(password, salt)
            //Save Data in MongoDB
            await user.save();
            //Response
            await res.status(200).json({
                msg: 'Post Api - User Collecion',
                user
            })
            console.log(`Run Method: ${'userColeccionPost'.yellow}`)
        } catch (error) {
            throw new Error('File: Controller - Method: userColeccionPost - Error');
        }
    }

    userColeccionPut = async (req = request, res = response) => {
        try {
            const { id } = req.params;
            const { password, google, email, ...userColeccionPut } = req.body;
            if (password) {
                //BcryptJS
                const salt = bcryptjs.genSaltSync();
                //Encrypt Password
                userColeccionPut.password = bcryptjs.hashSync(password, salt)
            }
            const userDB = await appModel.findByIdAndUpdate(id, userColeccionPut);
            res.status(200).json({
                userDB
            })
        } catch (error) {
            throw new Error('File: Controller - Method: userColeccionPut - Error');
        }
    }

    userColeccionGet = async (req = request, res = response) => {
        try {
            const { limit, begin } = req.body
            const query = { status: true };
            const [total, users] = await Promise.all([
                appModel.countDocuments(query),
                appModel.find(query)
                    .skip(Number(begin))
                    .limit(Number(limit))
            ])
            res.status(200).json({
                total,
                users
            })
        } catch (error) {
            throw new Error('File: Controller - Method: userColeccionGet - Error');
        }
    }

    userColeccionDelete = async (req = request, res = response) => {
        try {
            const { id } = req.params;

            const userDB = await appModel.findByIdAndUpdate(id, {status: false});
            const userAuth = req.userInfo;
            
            res.status(200).json({
                userDB,
                userAuth
            })
        } catch (error) {
            throw new Error('File: Controller - Method: userColeccionPut - Error');
        }
    }
}

module.exports = AppController;