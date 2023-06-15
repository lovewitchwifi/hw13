const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const Todo = require('../models/todos')
let mongoServer


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
    })
  
afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
  })
  
afterAll((done) => done())

describe('Test the to do endpoints', () => {

    /****************************GET ALL****************************/
        
    test('It should get all to do items', async () => {
        await Todo.create({ title: 'groceries', description: 'buy guac, eggs, bread' })

        const response = await request(app)
            .get('/todos')

        expect(response.statusCode).toBe(200)
        expect(response.body[0].title).toEqual('groceries')
        expect(response.body[0].description).toEqual('buy guac, eggs, bread')
        expect(response.body[0].completed).toBeFalsy()
        expect(response.body[0].created_at).toBeDefined()
    }) 

    /****************************CREATE****************************/

    test('It should create a new to do item', async () => {      
        const response = await request(app)
            .post('/todos')
            .send({ title: 'groceries', description: 'buy guac, eggs, bread' })
      
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('groceries')
        expect(response.body.description).toEqual('buy guac, eggs, bread')
        expect(response.body.completed).toBeFalsy()
        expect(response.body.created_at).toBeDefined()
    })    
    
    /****************************GET SPECIFIC****************************/
  
    test('It should get a specific to do item', async () => {  
        const todo = await Todo.create({ title: 'groceries', description: 'buy guac, eggs, bread' })
        const response = await request(app)
            .get(`/todos/${todo._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('groceries')
        expect(response.body.description).toEqual('buy guac, eggs, bread')
        expect(response.body.completed).toBeFalsy()
        expect(response.body.created_at).toBeDefined()
    })

    /****************************UPDATE****************************/

    test('It should update a to do item', async () => {  
        const todo = await Todo.create({ title: 'groceries', description: 'buy guac, eggs, bread' })
        const response = await request(app)
            .put(`/todos/${todo._id}`)
            .send({ title: 'trader joes', description: 'buy sunscreen, almonds, takis' })

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('trader joes')
        expect(response.body.description).toEqual('buy sunscreen, almonds, takis')
        expect(response.body.completed).toBeFalsy()
        expect(response.body.created_at).toBeDefined()
    })

    /****************************DELETE****************************/

    test('It should delete a to do item', async () => {  
        const todo = await Todo.create({ title: 'groceries', description: 'buy guac, eggs, bread' })
        const response = await request(app)
            .delete(`/todos/${todo._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('to do deleted')
    })
})
