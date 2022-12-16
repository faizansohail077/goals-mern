const express = require('express')
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController.cjs')
const router = express.Router()


router.route('/').get(getGoals).post(addGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router
