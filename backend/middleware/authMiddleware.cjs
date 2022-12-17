const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../model/userModel.cjs')

const protect = asyncHandler(async (req, res, next) => {


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            console.log(decoded, 'decoded')

            req.user = await UserModel.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error, 'middleware error')
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    else {
        res.status(401)
        throw new Error('Not authorized No Token')
    }

})

module.exports = { protect }