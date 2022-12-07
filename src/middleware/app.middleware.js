const { request, response } = require("express");
const { validationResult } = require("express-validator");

class AppMiddleware {

    validationsReq = async (req = request, res = response, next) => {
        const validatorReq = validationResult(req)
        if (!validatorReq.isEmpty()) {
            return res.status(400).json(validatorReq)
        }
        next();
    }
}

module.exports = AppMiddleware