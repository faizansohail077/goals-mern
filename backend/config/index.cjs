const mongoose = require('mongoose')

const uri = process.env.MONGO_URI

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', true)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connect ${conn.connection.host}`.cyan.underline)

    } catch (error) {
        console.log(error, 'db error')
        process.exit(1)
    }
}
module.exports = {connectDb}