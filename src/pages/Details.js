import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  const college = location.state?.college || {
    id: 1,
    name: 'IIT Delhi',
    city: 'Delhi',
    rating: 4.8,
    fees: '₹2.2 Lakhs',
    placement: '₹25 LPA',
    type: 'Government'
  };

  const [reviews, setReviews] = useState([
    { id: 1, user: 'Rajesh K.', rating: 5, comment: 'Excellent college! Great faculty and infrastructure.', date: '2024-01-15' },
    { id: 2, user: 'Priya S.', rating: 4, comment: 'Good placement opportunities.', date: '2024-01-10' },
  ]);

  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const addReview = () => {
    if (newReview.comment.trim()) {
      setReviews([
        ...reviews,
        {
          id: Date.now(),
          user: 'You',
          rating: newReview.rating,
          comment: newReview.comment,
          date: new Date().toISOString().split('T')[0]
        }
      ]);
      setNewReview({ rating: 5, comment: '' });
    } else {
      alert('Write something!');
    }
  };

  const courses = [
    { name: 'B.Tech Computer Science', duration: '4 Years', fees: '₹2.2 Lakhs/year' },
    { name: 'B.Tech Mechanical', duration: '4 Years', fees: '₹2.1 Lakhs/year' },
    { name: 'B.Tech Electrical', duration: '4 Years', fees: '₹2.1 Lakhs/year' },
    { name: 'M.Tech', duration: '2 Years', fees: '₹2.5 Lakhs/year' },
  ];

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div
      className="min-h-screen py-8 relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-5 py-2 bg-black/40 backdrop-blur-md rounded-xl text-white border border-white/20"
        >
          ← Back
        </button>

        {/* College Card */}
        <div className="backdrop-blur-md bg-black/40 rounded-2xl border border-white/20 shadow-xl mb-6">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white">{college.name}</h1>
            <p className="text-white/70">📍 {college.city}</p>

            <div className="flex gap-3 mt-4 flex-wrap">
              <span className="px-3 py-1 bg-black/40 rounded-full text-white border border-white/20">
                ⭐ {college.rating}
              </span>
              <span className="px-3 py-1 bg-black/40 rounded-full text-white border border-white/20">
                💰 {college.fees}
              </span>
              <span className="px-3 py-1 bg-black/40 rounded-full text-white border border-white/20">
                💼 {college.placement}
              </span>
            </div>
          </div>

          <div className="px-6 pb-6">
            <p className="text-white/70">
              {college.name} is one of the best colleges in India with excellent placements and faculty.
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="backdrop-blur-md bg-black/40 rounded-2xl border border-white/20 p-6 mb-6">
          <h2 className="text-white text-xl mb-4">📚 Courses</h2>

          <div className="grid md:grid-cols-2 gap-3">
            {courses.map((c, i) => (
              <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/20">
                <p className="text-white">{c.name}</p>
                <p className="text-white/50 text-sm">{c.duration}</p>
                <p className="text-green-400 text-sm">{c.fees}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="backdrop-blur-md bg-black/40 rounded-2xl border border-white/20 p-6">
          <h2 className="text-white text-xl mb-4">⭐ Reviews</h2>

          {/* Add Review */}
          <div className="mb-5">
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Write review..."
              className="w-full p-3 bg-black/40 border border-white/20 rounded-xl text-white"
            />

            <button
              onClick={addReview}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>

          {/* Review List */}
          {reviews.map((r) => (
            <div key={r.id} className="mb-3 p-3 bg-black/40 rounded-xl border border-white/20">
              <p className="text-white font-bold">{r.user}</p>
              <p className="text-yellow-400">{renderStars(r.rating)}</p>
              <p className="text-white/70">{r.comment}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Details;