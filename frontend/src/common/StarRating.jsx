import { Star, StarBorder, StarHalf } from '@mui/icons-material';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const StarRating = ({ averageRate, reviewLength }) => {
  const starArray = useMemo(() => {
    if (averageRate > 0) {
      const arr = (averageRate - 1)
        .toString()
        .split('.')
        .map((num) => Number(num));

      return Array(5)
        .fill('')
        .map((_, i) =>
          i <= arr[0] ? (
            <Star key={i} className="red-star" />
          ) : i - 1 === arr[0] && arr[1] >= 5 ? (
            <StarHalf key={i} className="red-star" />
          ) : (
            <StarBorder key={i} />
          )
        );
    }
  }, [averageRate]);

  return (
    <Rating>
      {starArray?.map((star) => star)}
      {reviewLength > 0 && <p>{`${reviewLength} Reviews`}</p>}
    </Rating>
  );
};

const Rating = styled.div`
  display: flex;
  height: max-content;
  display: flex;
  align-items: start;

  p {
    font-size: 12px;
    margin-left: 6px;
  }

  .red-star {
    color: var(--red-color) !important;
  }
`;

export default StarRating;
