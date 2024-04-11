import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import UserReview from './UserReview';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../../common/Loading';
import Comments from './Comments';
import BarChart from './BarChart';
import { RecipeContext } from '../../Recipe';
import { useParams } from 'react-router-dom';
import StarRatings from './StarRatings';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../../../../common/Button';
import { Star } from '@mui/icons-material';

const RecipeReviews = () => {
  const params = useParams();
  const starRef = useRef(null);
  const { recipe, reviews, setAverageRate, setReviews, averageRate, favorite } =
    useContext(RecipeContext);
  const queryClient = useQueryClient();
  const { user, loginWithPopup } = useAuth0();
  const userData = queryClient.getQueryData(['context-user']);
  const [submitted, setSubmitted] = useState(false);
  const [myReview, setMyReview] = useState(null);
  const [comment, setComment] = useState('');
  const [clickId, setClickId] = useState(-1);
  const [lastId, setLastId] = useState(-1);
  const [rateArr, setRateArr] = useState([
    { text: "Couldn't eat it", bool: false, class: '' },
    { text: "Didn't like it", bool: false, class: '' },
    { text: 'It was OK', bool: false, class: '' },
    { text: 'Like It', bool: false, class: '' },
    { text: 'Loved It', bool: false, class: '' },
  ]);

  function myReviewSetter(reviewsData) {
    let myReview = reviewsData.find((review) => review.userId === userData._id);

    if (myReview) {
      setMyReview(myReview);
      setComment(myReview?.comment);
      setSubmitted(true);
      setClickId(myReview.starRating - 1);
    }
  }

  useEffect(() => {
    if (userData && reviews) {
      myReviewSetter(reviews);
    }
  }, [userData]);

  const clearInputs = () => {
    if (!myReview) {
      setRateArr((prevState) =>
        prevState.map((item) => item && { ...item, bool: false, class: '' })
      );
      setClickId(-1);
      setComment('');
    } else {
      const rating = myReview.starRating - 1;
      setRateArr((prevState) =>
        prevState
          .slice(0, rating + 1)
          .map((item) => item && { ...item, bool: true, class: '' })
          .concat(
            rateArr
              .slice(rating + 1, rateArr.length)
              .map((item) => item && { ...item, bool: false, class: '' })
          )
      );

      setClickId(rating);
      setComment(myReview.comment);
      setSubmitted(true);
    }
  };

  const showSubmit = () => {
    setSubmitted(false);
  };

  const editReview = async (data) => {
    try {
      const editRecipeReview = await axios.post(
        `/api/recipe/${params.id}/editRecipeReview`,
        {
          ...data,
          recipeId: myReview._id,
          userId: userData._id,
        }
      );

      myReviewSetter(editRecipeReview.data.reviews);
      setReviews(editRecipeReview.data.reviews);
      setAverageRate(editRecipeReview.data.averageRate);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitted(true);
    }
  };
  const createReview = async (data) => {
    try {
      const recipeReviews = await axios.post(
        `/api/recipe/${params.id}/createRecipeReview`,
        {
          ...data,
          userId: userData._id,
        }
      );

      console.log(recipeReviews.data);

      myReviewSetter(recipeReviews.data.reviews);
      setReviews(recipeReviews.data.reviews);
      setAverageRate(recipeReviews.data.updatedAverage);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitted(true);
    }
  };

  const { isLoading: isCreating, mutate: create } = useMutation(createReview);
  const { isLoading: isEditting, mutate: edit } = useMutation(editReview);

  const calculateAverageRate = () => {
    const clickedStar = clickId + 1;
    const sum =
      reviews
        .filter((review) => review.nickname !== userData.nickname)
        .reduce((acc, num) => (acc += num.starRating), 0) + clickedStar;
    const average =
      reviews.length > 0
        ? parseFloat(sum / (myReview ? reviews.length : reviews.length + 1)).toFixed(1)
        : sum;
    return average;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const reviewData = {
        comment,
        userId: userData._id,
        averageRate: calculateAverageRate(),
        starRating: clickId + 1,
        recipeTitle: recipe.title,
        recipeId: recipe.id,
        recipeImage: recipe.image,
      };

      if (myReview) {
        edit(reviewData);
        return;
      }

      create(reviewData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Section>
      <Header id="rates-id">
        <h1>Reviews ({reviews?.length || '0'})</h1>
      </Header>
      <Reviews>
        <Wrapper>
          {isEditting || isCreating ? (
            <Loading styles={{ marginTop: '-10%' }} />
          ) : (
            <>
              {user ? (
                <div>
                  {submitted && myReview ? (
                    <UserReview
                      recipeImg={recipe?.image}
                      myReview={myReview}
                      showSubmit={showSubmit}
                    />
                  ) : (
                    <ReviewsForm>
                      <StarRatings
                        clickId={clickId}
                        setClickId={setClickId}
                        setLastId={setLastId}
                        starRef={starRef}
                        setRateArr={setRateArr}
                        lastId={lastId}
                        rateArr={rateArr}
                        recipe={recipe}
                      />
                      <form onSubmit={handleSubmit}>
                        <label className="h4-margin">
                          <h4>
                            {`Your Review  `}
                            <span>(optional)</span>
                          </h4>
                        </label>
                        <textarea
                          placeholder="What did you think about this recipe? Did you make any changes or notes?"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                          maxLength={300}
                        ></textarea>
                        <div className="text-count">
                          <span>{comment.length}/300</span>
                        </div>
                        <div className="buttons">
                          <p onClick={clearInputs}>CANCEL</p>
                          <input
                            type="submit"
                            value="SUBMIT"
                            className={`btn-submit ${clickId > -1 ? 'active' : ''}`}
                            disabled={clickId > -1 ? false : true}
                          />
                        </div>
                      </form>
                    </ReviewsForm>
                  )}
                </div>
              ) : (
                <div className="flex-middle">
                  <Star />
                  <p>
                    What do you think of this recipe? Share your experience to help
                    others.
                  </p>
                  <Button
                    onClick={loginWithPopup}
                    value={'ADD RATING & REVIEW'}
                    style={{ padding: '1rem 1.2rem' }}
                  />
                </div>
              )}
              {averageRate > 0 && <BarChart />}
              <Comments />
            </>
          )}
        </Wrapper>
      </Reviews>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  min-height: 300px;

  .flex-middle {
    height: 240px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 0 50px;
    text-align: center;

    svg {
      color: var(--red-color);
      font-size: 62px !important;
      background-color: #def0ef;
      border-radius: 50%;
      padding: 6px;
    }
  }
`;

const Reviews = styled.div`
  position: relative;
  background-color: #f4f7ea;
  width: 100%;
  padding: 30px;
`;

const ReviewsForm = styled.div`
  form {
    textarea {
      word-break: break-all;
      width: 100%;
      padding: 15px;
      height: 140px;
      font-size: 14px;
    }

    .text-count {
      span {
        font-size: 12px !important;
        color: var(--gray-color);
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 12px;

      .btn-submit {
        letter-spacing: 1px;
        cursor: pointer;
        width: 110px;
        height: 50px;
        font-size: 12px;
        font-weight: bold;
        color: white;
        background-color: #d9d9d9;
        display: block;
        border: none;
        border-radius: 3px;
        letter-spacing: 1.2px;

        &:not([disabled]):active {
          outline: 2px solid var(--blue-color);
          border-radius: 3px;
          outline-offset: 1px;
        }
      }

      .active {
        background-color: var(--red-color);
      }

      p {
        line-height: 30px;
        letter-spacing: 1px;
        margin-right: 20px;
        color: black;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--red-color);
          text-underline-offset: 5px;
          text-decoration-thickness: 12%;
        }
      }
    }
  }

  .h4-margin {
    margin: 28px 0 7px 0;
    display: flex;
    align-items: center;

    h4 {
      font-size: 14px;

      span {
        font-weight: 400;
        font-size: 12px;
        color: var(--gray-color);
      }
    }
  }

  .profile-flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 16px;
    width: 280px;
    max-width: 100%;

    img {
      border-radius: 50%;
      height: 50px;
      width: 50px;
      margin: 0;
      margin-right: 12px;
    }
  }
`;

const Header = styled.div`
  margin-bottom: 12px;

  h1 {
    font-size: 34px;
  }
`;

export default RecipeReviews;
