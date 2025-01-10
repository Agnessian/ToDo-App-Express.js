# Todo List API

## Project Description
This project provides a simple API for managing todo items. Users can create, read, update, and delete todo items, with the ability to search by title.

## Setup Instructions

### Prerequisites
Before you can run this project locally, ensure you have the following installed:

- Node.js (v12 or higher)
- npm (Node Package Manager)

### Installation
1. Clone this repository to your local machine:
   git clone https://github.com/Agnessian/ToDo-App-Express.js.git
2. Install dependencies:
    npm install
3. Start the application locally:
    npm start
The API will be running at http://localhost:3000.

- API Endpoints:
    - GET /todos: Retrieve all todos
        - Response: Returns a list of all todos in JSON format.
    - GET /todos/:id: Retrieve a specific todo by ID
        - Response: Returns the todo with the given ID or 404 if not found.
    - POST /todos: Create a new todo item
        - Request Body(json)
            {
                "title": "New Todo",
                "description": "Description of the todo"
            }
        - Response: Returns the created todo in JSON format.
    - PUT /todos/:id: Update a todo item
        - Parameters: id (required) - The ID of thr todo item to update
        - Request Body(json)
            {
                "title": "Updated Title",
                "description": "Updated Description",
                "completed": true
            }
        - Response: Returns the updated todo in JSON format.
    - DELETE /todos/:id: Delete a todo item
        - Parameters: id (required) - The ID of the todo to delete.
        - Response: Returns a success message if deleted, or 404 if not found.
    - GET /todos/search/:title: Search todos by title
        -Parameters: title (required) - The title to search for.
        -Response: Returns an array of todos that match the title, 400 if empty, and 404 if not found.

Example Requests:
GET /todos
- curl http://localhost:3000/todos
POST /todos: Example request body:
json
Copy code
{
    "title": "New Todo",
    "description": "This is a new todo item"
}

- Technologies Used
    - Node.js
    - Express.js
    - In-memory data storage (or JSON file if applicable)

- Contributing
    - If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.


