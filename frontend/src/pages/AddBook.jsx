import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function AddBook() {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !user._id) {
      navigate('/login');
      return;
    }
    if (!book.title.trim() || !book.author.trim()) {
      setError('Title and author are required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        'https://logiksutrabackend.onrender.com/api/books',
        book,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/my-books');
    } catch (err) {
      console.error('Error adding book:', err);
      setError(err.response?.data?.message || 'Failed to add book. Please try again.');
    }
    setLoading(false);
  };

  if (!token || !user._id) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
        <p className="text-blue-600">
          <a href="/login" className="underline">Log in</a> to add a book
        </p>
      </div>
    );
  }

  return (
    <div className='h-screen flex flex-col w-full ' >
      <Navbar ></Navbar>
      <div className="w-full flex justify-center items-center">
         <div className="max-w-4xl w-full bg-gray-50 m-6 md:m-8 p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            placeholder="Enter book title"
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 mb-1">
            Author *
          </label>
          <input
            type="text"
            id="author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            placeholder="Enter author name"
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 mb-1">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
            placeholder="Enter genre"
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 mb-1">
            Published Year
          </label>
          <input
            type="number"
            id="year"
            value={book.year}
            onChange={(e) => setBook({ ...book, year: e.target.value })}
            placeholder="Enter year"
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            disabled={loading}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
            aria-label="Add book"
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/books/mybooks')}
            className={`px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
      </div>
    </div>
    
  );
}