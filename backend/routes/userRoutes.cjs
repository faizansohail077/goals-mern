const express = require('express')
const { registerUser, userData, loginUser } = require('../controllers/userController.cjs')
const { protect } = require('../middleware/authMiddleware.cjs')
const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, userData)

module.exports = router