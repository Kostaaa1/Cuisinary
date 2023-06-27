import styled from 'styled-components';
import { Create, Star, StarBorder } from '@mui/icons-material';

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
        {[...Array(5)].map((_, i) =>
          i <= myReview.starRating ? (
            <Star key={i} className="red-star" />
          ) : (
            <StarBorder key={i} />
          )
        )}
        <span>
          {myReview?.createdAt
            ?.split('/')
            .map((date) => (date.length === 1 && date.length !== 4 ? '0' + date : date))
            .join('/')}
        </span>
      </div>
      <p> {myReview.comment} </p>
    </MyReview>
  );
};

const MyReview = styled.div`
  .my-review-rates {
    margin: 12px 0;
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
        width: 56px;
        height: 56px;
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
