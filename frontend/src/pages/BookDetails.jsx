import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [userReview, setUserReview] = useState({ rating: 0, reviewText: '' });
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://logiksutrabackend.onrender.com/api/books/${id}/reviews`);
      setBook(res.data.book);
      setReviews(res.data.reviews);
      setAvgRating(res.data.averageRating);
      setReviewsCount(res.data.reviewsCount);
     
      if (user) {
        const existingReview = res.data.reviews.find((r) => r.userId._id === user._id);
        if (existingReview) {
          setUserReview({ rating: existingReview.rating, reviewText: existingReview.reviewText });
        }
      }
    } catch (err) {
      console.error('Error fetching book details:', err);
      setError('Failed to fetch book details. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!token || !user) {
      navigate('/login');
      return;
    }
    if (!userReview.rating || !userReview.reviewText.trim()) {
      setError('Please provide a rating and review text');
      return;
    }
    setReviewLoading(true);
    setError(null);
    try {
      const existingReview = reviews.find((r) => r.userId._id === user._id);
      if (existingReview) {
        await axios.put(
          `https://logiksutrabackend.onrender.com/api/reviews/${existingReview._id}`,
          userReview,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        
        await axios.post(
          `https://logiksutrabackend.onrender.com/api/reviews`,
          { bookId: id, ...userReview },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setUserReview({ rating: 0, reviewText: '' });
      fetchBook(); 
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    }
    setReviewLoading(false);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!token || !user) {
      navigate('/login');
      return;
    }
    if (!window.confirm('Are you sure you want to delete your review?')) return;
    setReviewLoading(true);
    setError(null);
    try {
      await axios.delete(`https://logiksutrabackend.onrender.com/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserReview({ rating: 0, reviewText: '' });
      fetchBook();
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Failed to delete review. Please try again.');
    }
    setReviewLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow mb-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
          <div className="h-16 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    );
  }
  if (error && !book) {
    return <p className="p-6 text-red-600">{error}</p>;
  }
  if (!book) {
    return <p className="p-6">Book not found</p>;
  }

  return (
    <div>
      <Navbar></Navbar>
          <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-700 mb-1">Author: {book.author}</p>
        <p className="text-gray-700 mb-1">Genre: {book.genre || 'N/A'}</p>
        <p className="text-gray-700 mb-1">Published Year: {book.year || 'N/A'}</p>
        <p className="text-gray-800 mt-4">{book.description || 'No description available'}</p>
        <p className="mt-4 font-semibold">
          Average Rating: {avgRating ? avgRating.toFixed(1) : 'N/A'} / 5 ({reviewsCount} reviews)
        </p>
        <button
          onClick={() => setShowReviews(!showReviews)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showReviews ? 'Hide Reviews' : 'Show Reviews'}
        </button>
      </div>

      
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {reviews.find((r) => r.userId._id === user._id) ? 'Edit Your Review' : 'Add Your Review'}
          </h2>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                className={`cursor-pointer ${
                  userReview.rating >= num ? 'text-yellow-400' : 'text-gray-300'
                } ${reviewLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !reviewLoading && setUserReview({ ...userReview, rating: num })}
              />
            ))}
          </div>
          <textarea
            className="w-full border border-gray-300 rounded p-2 mb-2"
            rows={3}
            placeholder="Write your review..."
            value={userReview.reviewText}
            onChange={(e) => !reviewLoading && setUserReview({ ...userReview, reviewText: e.target.value })}
            disabled={reviewLoading}
          />
          <button
            onClick={handleReviewSubmit}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              reviewLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={reviewLoading}
          >
            {reviews.find((r) => r.userId._id === user._id) ? 'Update Review' : 'Add Review'}
          </button>
        </div>
      ) : (
        <p className="text-blue-600 mb-6">
          <a href="/login" className="underline">Log in</a> to add a review
        </p>
      )}

      {/* Reviews Section */}
      {showReviews && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reviews ({reviewsCount})</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div key={r._id} className="border-b border-gray-200 py-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{r.userId.name || 'Anonymous'}</p>
                  {user && r.userId._id === user._id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteReview(r._id)}
                        className={`text-red-500 text-sm hover:underline ${
                          reviewLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={reviewLoading}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      className={num <= r.rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="mt-1 text-gray-700">{r.reviewText || 'No review text'}</p>
                <p className="text-gray-500 text-sm">
                  Posted: {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </div>
  );
}