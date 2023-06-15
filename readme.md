This is my TO DO LIST API

This API is for managing a to-do list that allows you to:

Get all of your to do items
Create a new to do item
Get a specific to do item
Update a specific to do item
Delete a specific to do item

Each to do item is an object that contains an id, title, description, completed indicator, and created at indicator. 

The setup is a basic set up that contains controllers, models, routes, and tests folders along with app.js, server.js, and package.json files. The setup also contains a .env to connect your mongoose database, .gitignore to indicate which files should be ignored and not tracked by Git, and an artillery.yml file to load your testing. 

For testing the API: make sure you have two terminals open, one terminal to run your server using "npm run dev" and another terminal to run your test "npm run test". This test will run the functionality of retrieving, creating, updating, and deleting your to do items. 

For load testing results: while your server is running you can also enter "npm run load" to evaluate the API's performance. When I ran my results it initially spit out an error because I wasn't simultaneously running my server. 

