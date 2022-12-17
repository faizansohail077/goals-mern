const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware.cjs')
const {  connectDb } = require('./config/index.cjs')
const { protect } = require('./middleware/authMiddleware.cjs')
dotenv.config()
connectDb()
const Port = process.env.PORT || 6000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/goals',protect, require('./routes/goalRoutes.cjs'))
app.use('/api/users',require('./routes/userRoutes.cjs'))


app.use(errorHandler)
app.listen(Port)