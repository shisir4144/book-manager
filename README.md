## How to Use This Project
If you want to use the whole app:

### First, you need to start the server by following the previous setup instructions (npm install, create .env, then npm run dev).
After the server is running, open the index.html file in your browser.
If you already have an account, you can login directly. If not, you need to register first by filling in the required information.

Once you are logged in, you will see buttons/options that allow you to interact with the books database.

These features are working with the following API endpoints:

POST /api/books – Add a new book

GET /api/books – Get all books

GET /api/books/:id – Get a single book by ID

PUT /api/books/:id – Update book details

DELETE /api/books/:id – Delete a book

All the APIs are connected properly, and if you want to see the details of the requests and responses, you can open the Network section in your browser’s Developer Tools. There you will be able to see the payloads and responses for all GET, POST, PUT, and DELETE methods.

### I'm a student and this project is created as part of my learning to show backend and frontend integration using Node.js, Express, MongoDB, and simple HTML/CSS/JavaScript frontend.
