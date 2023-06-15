const Todo = require('../models/todos')

//get all of Todo items 
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//creating todos
exports.createTodos = async (req, res) => {
    try{
      const todo = new Todo(req.body)
      await todo.save()
      res.json(todo)
    } catch(error) {
      res.status(400).json({message: error.message})
    }
  }

//get a specific to do item
exports.getSpecificTodos = async (req, res) => {
    try{
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
            res.status(404).json({message: error.message})
        } else {
            res.json(todo)
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//update to do item
exports.updateTodos = async (req, res) => {
    try{
        // const todos = await Todo.findById(req.params.id)
        // updates.forEach(update => todos[update] = req.body[update])
        // await todos.save()
        // res.json(todos)
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
        res.status(404).json({ message: 'Todo not found' })
        } else {
        todo.title = req.body.title
        todo.description = req.body.description
        todo.completed = req.body.completed
        await todo.save()
        res.json(todo)
  } 
} catch (error) {
    res.status(400).json({message: error.message})
  }
}

//delete to do item
exports.deleteTodos = async (req, res) => {
    try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' })
    } else {
    await todo.deleteOne()
    res.json({ message: 'to do deleted' })
  } 
}   catch (error) {
    res.status(400).json({message: error.message})
    }
}