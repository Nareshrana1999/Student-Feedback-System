
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 20 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileHover={!readonly ? { scale: 1.2 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
        >
          <Star
            size={size}
            className={`star ${
              star <= (hoverRating || rating) ? 'active' : ''
            } ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
            fill={star <= (hoverRating || rating) ? '#fbbf24' : 'none'}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default StarRating;
