import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function Home() {
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const BOOKS_PER_PAGE = 5

  const fetchBooks = async (page = 1) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://logiksutrabackend.onrender.com/api/books?page=${page}&limit=${BOOKS_PER_PAGE}`
      )

      const { books, totalPages } = response.data
      setBooks(books)
      setTotalPages(totalPages)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch books:', error)
      alert('Failed to fetch books. Please try again.')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBooks(currentPage)
  }, [currentPage])

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    fetchBooks(page)
  }

  return (
    <div>

      <Navbar></Navbar>


      <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">All Books</h1>

      {loading ? (
        <p className="text-gray-600">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-600">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="p-4 rounded-lg bg-white shadow cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/book-details/${book._id}`)}
            >
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-500 text-sm">{book.genre} • {book.year}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {pageNum}
            </button>
          )
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    </div>
    
  )
}
