const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodos)
router.get('/:id', todoController.getSpecificTodos)
router.put('/:id', todoController.updateTodos)
router.delete('/:id', todoController.deleteTodos)

module.exports = router