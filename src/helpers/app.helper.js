const roleModel = require('../models/role.model');
const appModel = require("../models/app.model");

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
        const existUser = await appModel.findOne({id})
        if (!existUser) {
            throw new Error('User already exist!')
        }
    }


}

module.exports = AppHelper;