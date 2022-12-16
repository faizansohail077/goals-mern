const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async (req, res) => {
    res.json({ message: 'Get Goals Controller' })
})

const addGoal = asyncHandler(async (req, res) => {

    const { text } = req.body

    if (!text) {
        res.status(400)
        throw new Error('Please add text')
    } else {
        res.json({ message: text })
        console.log(req.body)
    }

    console.log(req.body)
})

const updateGoal = asyncHandler(async (req, res) => {
    res.json({ message: `Update Goals ${req.params.id} ` })
}
)
const deleteGoal = asyncHandler(async (req, res) => {
    res.json({ message: `Delete Goals ${req.params.id} ` })

})

module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal
}