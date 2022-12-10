const roleModel = require('../models/role.model');
const appModel = require("../models/app.model");
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');


class AppHelper {
    validateRole = async (role) => {
        const existRole = await roleModel.findOne({ role })
        if (!existRole) {
            throw new Error()
        }
    }

    emailExist = async (email) => {
        const existEmail = await appModel.findOne({ email })
        if (existEmail) {
            throw new Error('Email already exist!')
        }
    }

    userExist = async (id) => {
        const existUser = await appModel.findOne({ id })
        if (!existUser) {
            throw new Error('User not exist!')
        }
    }

    generateJWT = async (uid) => {
        return await new Promise((resolve, reject) => {
            const payload = { uid };
            jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '1000h'
            }, (err, token) => {
                if (err) {
                    reject('Error JWT')
                } else {
                    resolve(token)
                }
            })
        })
    }

    googleVerify = async (token) => {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,  
        });
        const {name, picture, email} = ticket.getPayload();
        
        return {name, picture, email};
    }


}

module.exports = AppHelper;