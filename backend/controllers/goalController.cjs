const asyncHandler = require('express-async-handler')
const GoalModel = require('../model/goalModel.cjs')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await GoalModel.find()
    res.json(goals)
})

const addGoal = asyncHandler(async (req, res) => {
    const { text } = req.body

    if (!text) {
        res.status(400)
        throw new Error('Please add text')
    } else {
        const goal = await GoalModel.create({
            text
        })
        res.status(200).json(goal)
    }


})

const updateGoal = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id, 'id')
    const goal = await GoalModel.findById(id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await GoalModel.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json(updatedGoal)


}
)
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params

    const goal = await GoalModel.findById(id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    } else {
        await GoalModel.findByIdAndDelete(id)
        res.status(200).json('Successfully Deleted')
    }

})

module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal
}