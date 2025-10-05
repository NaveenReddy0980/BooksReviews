import { BrowserRouter } from "react-router-dom"
import {Routes} from "react-router-dom"
import {Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import BookDetails from "./pages/BookDetails"
import Edit from "./pages/Edit"
import AddBook from "./pages/AddBook"
import MyBooks from "./pages/MyBooks"

function App() {
  

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='signup' element={<Signup/>}></Route>
              <Route path='book-details/:id' element={<BookDetails/>}></Route>
              <Route path='edit-book/:id' element={<Edit/>}></Route>
              <Route path='add-book' element={<AddBook/>}></Route>
              <Route path='my-books' element={<MyBooks/> }></Route>
          </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
