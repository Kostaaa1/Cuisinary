import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Star, StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PersonAvatar from '../../../../common/PersonAvatar';
import LineBreak from '../../../../common/LineBreak';
import { RecipeContext } from '../../Recipe';
import StarRating from '../../../../common/StarRating';
import ReadMoreText from '../../../../common/ReadMoreText';

const Comments = () => {
  const navigate = useNavigate();
  const { reviews } = useContext(RecipeContext);

  return (
    <CommentsContainer>
      {reviews?.map((review, i) => (
        <div key={i} className="head-wrap">
          <div className="head-flex">
            {review?.userImage === '' ? (
              <PersonAvatar style={{ borderRadius: '50%' }} />
            ) : (
              <img src={review?.userImage} alt="" />
            )}
            <h5 onClick={() => navigate(`/profile/${review.userId}`)}>
              {review.nickname}
            </h5>
          </div>
          <div className="review-rates">
            <StarRating averageRate={review.starRating} />
            <span>
              {review?.displayDate
                ?.split('/')
                .map((date) =>
                  date.length === 1 && date.length !== 4 ? '0' + date : date
                )
                .join('/')}
            </span>
          </div>
          <div className="readmore-wrap">
            <ReadMoreText text={review.comment} readMore={true} maxLength={200} />
          </div>
          {i !== reviews.length - 1 && <LineBreak className="line-break" />}
        </div>
      ))}
      <div id="link-to-similar"></div>
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  .review-rates {
    margin: 20px 0 10px 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;

    .red-star {
      color: var(--red-color);
    }

    svg {
      color: var(--grey-color);
    }

    span {
      color: var(--grey-color);
      font-size: 11px;
      margin-left: 10px;
    }
  }

  .head-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    word-wrap: break-word;

    p {
      font-weight: 400;
    }

    h5 {
      cursor: pointer;
      text-decoration: underline;
      text-decoration-color: var(--red-color);
      text-underline-offset: 3px;
      text-decoration-thickness: 8%;

      &:hover {
        text-decoration-thickness: 12%;
      }
    }

    .head-flex {
      display: flex;
      align-items: center;
      justify-content: center;

      img,
      svg {
        border-radius: 50%;
        width: 34px;
        height: 34px;
        margin-right: 8px;
      }
    }

    .avatar {
      border-radius: 50%;
      height: 40px;
      width: 40px;
      margin: 0;
      margin-right: 12px;
    }
  }
`;

export default Comments;
