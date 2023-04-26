import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserReview from "./UserReview";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../../../common/Loading";
import Comments from "./Comments";
import BarChart from "./BarChart";
import { RecipeContext } from "../../Recipe";
import { useParams } from "react-router-dom";
import StarRatings from "./StarRatings";
import { useUser } from "../../../../setup/auth/useAuth";

const RecipeReviews = () => {
  const params = useParams();
  const starRef = useRef(null);
  const { recipe, reviews, setReviews, starArray, averageRate } = useContext(RecipeContext);
  const { userData } = useUser();
  const [submitted, setSubmitted] = useState(false);
  const [myReview, setMyReview] = useState(null);
  const [comment, setComment] = useState("");
  const [clickId, setClickId] = useState(-1);
  const [lastId, setLastId] = useState(-1);
  const [rateArr, setRateArr] = useState([
    { text: "Couldn't eat it", bool: false, class: "" },
    { text: "Didn't like it", bool: false, class: "" },
    { text: "It was OK", bool: false, class: "" },
    { text: "Like It", bool: false, class: "" },
    { text: "Loved It", bool: false, class: "" },
  ]);

  useEffect(() => {
    let myReview = reviews?.filter((review) => review.userId === userData?._id)[0];
    if (myReview) {
      setMyReview(myReview);
      setComment(myReview?.comment);
      setSubmitted(true);
      setClickId(myReview.starRating);
    }
  }, [reviews, userData]);

  const clearInputs = () => {
    if (!myReview) {
      setRateArr((prevState) => prevState.map((item) => item && { ...item, bool: false, class: "" }));
      setClickId(-1);
      setComment("");
    } else {
      let rating = myReview.starRating;
      setRateArr((prevState) =>
        prevState
          .slice(0, rating + 1)
          .map((item) => item && { ...item, bool: true, class: "" })
          .concat(rateArr.slice(rating + 1, rateArr.length).map((item) => item && { ...item, bool: false, class: "" }))
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
      const [editUserReview, editRecipeReview] = await Promise.all([
        axios.post(`/api/user/${userData?.email}/editUserReview`, { ...data, recipeImage: recipe.image }),
        axios.post(`/api/recipe/${params.id}/editRecipeReview`, {
          ...data,
          recipeId: myReview._id,
          userId: userData._id,
        }),
      ]);

      setReviews(editRecipeReview.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitted(true);
    }
  };

  const createReview = async (data) => {
    try {
      const [userReview, recipeReviews] = await Promise.all([
        axios.post(`/api/user/${userData?.email}/createUserReview`, {
          ...data,
          recipeId: recipe.id,
          recipeImage: recipe.image,
        }),
        axios.post(`/api/recipe/${params.id}/createRecipeReview`, {
          ...data,
          userId: userData._id,
        }),
      ]);

      setReviews(recipeReviews.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitted(true);
    }
  };

  const { isLoading: isCreating, mutate: create } = useMutation(createReview);
  const { isLoading: isEditting, mutate: edit } = useMutation(editReview);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        comment: comment,
        starRating: clickId,
        recipeTitle: recipe.title,
      };

      if (myReview) {
        edit(data);
        return;
      }

      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Reviews>
      <Header>
        <h1>Reviews ({reviews?.length || "0"})</h1>
      </Header>
      {isEditting || isCreating ? (
        <Loading styles={{ marginTop: "-10%" }} />
      ) : (
        <>
          <div className="wrapper">
            {submitted && myReview ? (
              <UserReview recipeImg={recipe?.image} myReview={myReview} showSubmit={showSubmit} />
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
                    placeholder="What did  you think about this recipe? Did you make any changes or notes?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="buttons">
                    <p onClick={clearInputs}>CANCEL</p>
                    <input
                      type="submit"
                      value="SUBMIT"
                      className={`btn-submit ${clickId > -1 ? "active" : ""}`}
                      disabled={clickId > -1 ? false : true}
                    />
                  </div>
                </form>
              </ReviewsForm>
            )}
          </div>
          {starArray && averageRate && <BarChart />}
          <Comments />
        </>
      )}
    </Reviews>
  );
};

const Reviews = styled.div`
  position: relative;
  min-height: 400px;

  .wrapper {
    width: 450px;
    margin: 34px auto;
    max-width: 100%;
  }
`;

const ReviewsForm = styled.div`
  form {
    textarea {
      width: 100%;
      padding: 15px;
      height: 120px;
      font-size: 14px;
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

        &:active {
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
  display: flex;
  align-items: flex-end;

  h1 {
    font-size: 34px;
  }
`;

export default RecipeReviews;
