import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchBook = async () => {
    if (!token || !user._id) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://logiksutrabackend.onrender.com/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBook({
        title: res.data.title || '',
        author: res.data.author || '',
        genre: res.data.genre || '',
        year: res.data.year || '',
        description: res.data.description || '',
      });
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err.response?.data?.message || 'Failed to fetch book details. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) {
      setError('Invalid book ID');
      setLoading(false);
      return;
    }
    fetchBook();
  }, [id]);

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
    setSubmitLoading(true);
    setError(null);
    try {
      await axios.put(
        `https://logiksutrabackend.onrender.com/api/books/${id}`,
        book,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/my-books');
    } catch (err) {
      console.error('Error updating book:', err);
      setError(err.response?.data?.message || 'Failed to update book. Please try again.');
    }
    setSubmitLoading(false);
  };

  if (!token || !user._id) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
        <p className="text-blue-600">
          <a href="/login" className="underline">Log in</a> to edit books
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen md:p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
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
            disabled={submitLoading}
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
            disabled={submitLoading}
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
            disabled={submitLoading}
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
            disabled={submitLoading}
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
            disabled={submitLoading}
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
            submitLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={submitLoading}
          aria-label="Update book"
        >
          {submitLoading ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
}