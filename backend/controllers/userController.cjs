const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandle = require('express-async-handler')
const UserModel = require('../model/userModel.cjs')

const registerUser = asyncHandle(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await UserModel.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User Already Exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await UserModel.create({ name, email, password: hashPassword })

    if (user) {
        console.log(user, 'user')
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user Data')
    }

})

const loginUser = asyncHandle(async (req, res) => {
    const { email, password } = req.body

    if (!password || !email) {
        res.status(400)
        throw new Error("Invalid Fiedls")
    }
    else {
        const user = await UserModel.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)

            })
        } else {
            res.status(400)
            throw new Error('Invalid Credentials')
        }
    }

})

const userData = asyncHandle(async (req, res) => {
    const { _id, name, email, token } = await UserModel.findById(req.user.id)
    res.status(200).json({ id: _id, name, email, token })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

}

module.exports = {
    registerUser,
    loginUser,
    userData
}