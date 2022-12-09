const { request, response } = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const appModel = require("../models/app.model");

class AppMiddleware {

    validationsReq = async (req = request, res = response, next) => {
        try {
            const validatorReq = validationResult(req)
            if (!validatorReq.isEmpty()) {
                return res.status(400).json(validatorReq)
            }
            next();
        } catch (error) {

        }
    }

    validationJWT = async (req = request, res = response, next) => {
        try {
            const token = await req.header('x-token');
            if (!token) {
                return res.status(400).json({
                    msg: 'Invalid Token'
                })
            }
            const { uid } = await jwt.verify(token, process.env.SECRETORPRIVATEKEY);

            const userInfo = await appModel.findById(uid)

            if (!userInfo.status) {
                return res.json({
                    msg: 'User not Auth'
                })
            }
            req.userInfo = userInfo;

            next();
        } catch (error) {

        }
    }

    authRole = async (req = request, res = response, next) => {
        try {
            if (!req.userInfo) {
                return res.status(500).json({
                    msg: 'Invalid Role'
                })
            }

            const { role } = req.userInfo;
            if (role !== "Admin") {
                return res.status(401).json({
                    msg: 'User not Admin'
                })
            } 
            next();
        } catch (error) {

        }
    }

    allowRoles =  (...roles) => {
        return(req = request, res = response, next)=>{

            if(!req.userInfo){
                return res.status(500).json({
                    msg: 'Invalid User'
                })
            }

            if(!roles.includes(req.usuario.role)){
                return res.status(401).json({
                    msg: 'User not Allowed'
                })
            }

            next();
            
        }
    }
}

module.exports = AppMiddleware