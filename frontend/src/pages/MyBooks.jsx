import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function MyBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null); 
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  

  const fetchBooks = async () => {
    if (!token || !user._id) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://logiksutrabackend.onrender.com/api/books/mybooks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data.books || []);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.response?.data?.message || 'Failed to fetch your books. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle delete book
  const handleDeleteBook = async (bookId) => {
    if (!token || !user._id) {
      navigate('/login');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    setDeleteLoading(bookId);
    setError(null);
    try {
      await axios.delete(`https://logiksutrabackend.onrender.com/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error('Error deleting book:', err);
      setError(err.response?.data?.message || 'Failed to delete book. Please try again.');
    }
    setDeleteLoading(null);
  };

  if (!token || !user._id) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
        <p className="text-blue-600">
          <Link to="/login" className="underline">Log in</Link> to view your books
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
        <h1 className="text-2xl font-bold mb-6">My Books</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
              <div className="h-12 bg-gray-200 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
        <h1 className="text-2xl font-bold mb-6">My Books</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
      <div className='flex flex-col gap-4'>
        <Navbar></Navbar>
            <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
        <h1 className="text-2xl font-bold mb-6">My Books</h1>
        {books.length === 0 ? (
          <p>No books added yet. <Link to="/add-book" className="text-blue-600 underline">Add a book</Link></p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {books.map((book) => (
              <div key={book._id} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">
                  <Link to={`/book-details/${book._id}`} className="text-blue-600 hover:underline">
                    {book.title}
                  </Link>
                </h2>
                <p className="text-gray-700 mb-1">Author: {book.author}</p>
                <p className="text-gray-700 mb-1">Genre: {book.genre || 'N/A'}</p>
                <p className="text-gray-700 mb-1">Published Year: {book.year || 'N/A'}</p>
                <p className="text-gray-700 mb-2">{book.description || 'No description available'}</p>
                <div className="flex gap-2">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className={`px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 ${
                      deleteLoading === book._id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={deleteLoading === book._id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
            </div>
      </div>
  );
}