import styled from 'styled-components';
import { Create, Star, StarBorder } from '@mui/icons-material';
import StarRating from '../../../../common/StarRating';
import { useState } from 'react';
import ReadMoreText from '../../../../common/ReadMoreText';

const UserReview = ({ recipeImg, myReview, showSubmit }) => {
  return (
    <MyReview>
      <div className="head-wrap">
        <div className="head-flex">
          <img src={recipeImg} className="avatar" alt="" />
          <h4>My Review</h4>
        </div>
        <span className="edit" onClick={showSubmit}>
          <Create /> Edit
        </span>
      </div>
      <div className="my-review-rates">
        <StarRating averageRate={myReview.starRating} />
        <span>
          {myReview?.displayDate
            ?.split('/')
            .map((date) => (date.length === 1 && date.length !== 4 ? '0' + date : date))
            .join('/')}
        </span>
      </div>
      <ReadMoreText text={myReview.comment} readMore={true} maxLength={200} />
    </MyReview>
  );
};

const MyReview = styled.div`
  word-break: break-all;

  .my-review-rates {
    margin: 12px 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;

    span {
      font-size: 10px;
      margin-left: 10px;
    }
  }

  .head-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .edit {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: underline;
      text-underline-offset: 4px;
      font-size: 14px;
      font-weight: 400;
      color: var(--grey-color);

      svg {
        font-size: 18px;
        color: var(--red-color);
        margin-right: 4px;
      }
    }

    .head-flex {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 44px;
        height: 44px;
      }

      h4 {
        font-size: 16px;
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

export default UserReview;
