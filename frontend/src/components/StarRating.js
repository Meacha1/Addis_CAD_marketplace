import React from 'react';
import '../styles/StarRating.css';

function StarRating({ rating }) {
  const maxStars = 6; // Maximum number of stars
  const filledStars = Math.floor(rating); // Number of filled stars
  const hasHalfStar = rating % 1 !== 0; // Check if there is a half star
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0); // Number of empty stars

  // Create an array of stars based on the filled, half, and empty stars
  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<span key={i} className="star filled">&#9733;</span>);
  }

  if (hasHalfStar) {
    stars.push(<span key="half" className="star half">&#9733;</span>);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={i + filledStars} className="star empty">&#9733;</span>);
  }

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
}

export default StarRating;
