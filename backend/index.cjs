const express = require('express')
const dotenv = require('dotenv')
const { errorHandler } = require('./middleware/errorMiddleware.cjs')

dotenv.config()

const Port = process.env.PORT || 6000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/goals', require('./routes/goalRoutes.cjs'))
app.use(errorHandler)
app.listen(Port, () => {
    console.log(`server started on port ${Port}`)
})