📚 Book Reviews — Full-Stack App

Welcome to Book Reviews, a full-stack web application where book lovers can add, edit, review, and discover books!
Built with React, Node.js, and MongoDB, it’s designed to be clean, secure, and delightful to use.

🚀 Features
👩‍💻 For Users

Explore Books — Browse books with detailed reviews.

Manage Your Library — Add, edit, or delete your own books.

Write Reviews — Share opinions and rate books you’ve read.

Authentication — Secure login and signup using JWT tokens.

Responsive Design — Works smoothly on desktop and mobile.

⚙️ For Developers

Modular Structure (frontend + backend separation)

RESTful APIs with Express and Mongoose

Stateful Authentication via localStorage tokens

Clean UI with Tailwind CSS and React Router

🧱 Tech Stack
Layer	Technologies
Frontend	React, React Router, Axios, Tailwind CSS, Lucide-React
Backend	Node.js, Express.js, MongoDB, Mongoose
Auth & Security	JSON Web Token (JWT), dotenv
Tools	Git, npm
🗂️ Project Structure
logikSutra/
│
├── backend/           # Node.js + Express API
│   ├── models/        # Mongoose models (Book, User, Review)
│   ├── controllers/   # Business logic (books, reviews, auth)
│   ├── routes/        # API route definitions
│   ├── middleware/    # JWT authentication middleware
│   ├── server.js      # Entry point
│   └── .env           # Environment variables (ignored by Git)
│
├── frontend/          # React app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Home, Login, Signup, MyBooks, etc.
│   │   ├── App.js       # Routes and layout
│   │   └── index.css    # Tailwind + global styles
│   └── .env             # Frontend API base URL
│
├── .gitignore
└── README.md

⚙️ Setup Guide
🧩 Prerequisites

Node.js
 (v14 or higher)

MongoDB
 (local or Atlas)

Git

🖥️ 1. Clone the Repository
git clone https://github.com/<your-username>/BooksReviews.git
cd BooksReviews

🔧 2. Setup the Backend
cd backend
npm install


Create a .env file in the backend/ folder:

PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key


Start the backend:

npm start


✅ Server runs at: http://localhost:5000

💻 3. Setup the Frontend
cd ../frontend
npm install


Create a .env file in the frontend/ folder:

REACT_APP_API_URL=http://localhost:5000


Start the frontend:

npm start


✅ App runs at: http://localhost:3000

🔗 API Overview
Books
Method	Endpoint	Description
GET	/api/books/mybooks	Fetch user’s books
POST	/api/books	Add a new book
PUT	/api/books/:id	Update a book
DELETE	/api/books/:id	Delete a book
GET	/api/books/:id	Get book details
GET	/api/books/:id/reviews	Fetch book reviews
Reviews
Method	Endpoint	Description
POST	/api/reviews	Add a review
PUT	/api/reviews/:id	Update a review
DELETE	/api/reviews/:id	Delete a review
Auth
Method	Endpoint	Description
POST	/api/auth/signup	Register a user
POST	/api/auth/login	Log in and get token
🔒 Authentication Flow

User logs in via the frontend.

Backend returns a JWT and user info.

Token is stored in localStorage.

All protected routes require Authorization: Bearer <token> headers.

🧭 Frontend Routes
Path	Description
/	Home page
/login	Log in
/signup	Register new user
/my-books	View your added books
/add-book	Add a new book
/edit-book/:id	Edit existing book
/book-details/:id	View book details & reviews
🧪 Troubleshooting
Issue	Possible Fix
Frontend won’t start	Ensure port 3000 is free
API errors (404/500)	Check backend is running on port 5000
Auth issues	Clear localStorage and log in again
MongoDB errors	Verify MONGO_URI and DB is online
CORS issues	Add app.use(cors()) in backend server.js
🌱 Future Improvements

🔍 Search and filter books

⭐ Paginate long book/review lists

🔔 Toast notifications for actions

♿ Accessibility enhancements

🧾 Sorting and rating filters

🤝 Contributing

Want to help make this app better?

Fork the repository

Create your feature branch (git checkout -b feature/new-feature)

Commit changes (git commit -m "Add new feature")

Push and open a Pull Request

💬 Contact

Questions or feedback?
Open an issue on the repo or reach out to the project maintainer.

❤️ Credits

Made with passion by Naveen Reddy and contributors.
Frontend powered by React, backend powered by Node.js & MongoDB.
