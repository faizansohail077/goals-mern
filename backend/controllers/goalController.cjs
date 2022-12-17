const asyncHandler = require('express-async-handler')
const GoalModel = require('../model/goalModel.cjs')
const UserModel = require('../model/userModel.cjs')

const getGoals = asyncHandler(async (req, res) => {
    
    const goals = await GoalModel.find({ user: req.user.id })
    res.json(goals)
})

const addGoal = asyncHandler(async (req, res) => {
    const { text } = req.body

    if (!text) {
        res.status(400)
        throw new Error('Please add text')
    } else {
        const goal = await GoalModel.create({
            text,
            user: req.user.id
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

    const user = await UserModel.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User Not Found")
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
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

        const user = await UserModel.findById(req.user.id)

        if (!user) {
            res.status(401)
            throw new Error("User Not Found")
        }

        if (goal.user.toString() !== user.id) {
            res.status(401)
            throw new Error("User not authorized")
        } 


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