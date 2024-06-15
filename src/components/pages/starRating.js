import React from "react";

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      <span className="filled-stars">{"★".repeat(filledStars)}</span>
      {halfStar && <span className="half-star">☆</span>}
      <span className="empty-stars">{"☆".repeat(emptyStars)}</span>
      <span className="ml-2">{rating} / 5</span>
    </div>
  );
};

export default StarRating;
