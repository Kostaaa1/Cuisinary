import { Create, Star, StarBorder, StoreMallDirectoryTwoTone } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../setup/auth/useAuth";
import AvatarIcon from "../../../assets/svg/svgexport-21.svg";
import UserReview from "./UserReview";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../../common/Loading";
import Comments from "./Comments";
import AuthContext from "../../../setup/app-context-menager/AuthContext";
import BarChart from "./BarChart";

const RecipeReviews = ({ recipe, recipeId, reviews, setReviews }) => {
  const [lastId, setLastId] = useState(-1);
  const [clickId, setClickId] = useState(-1);
  const [comment, setComment] = useState("");
  const starRef = useRef(null);
  const { userData, refetch } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [myReview, setMyReview] = useState(null);
  const [rateArr, setRateArr] = useState([
    { text: "Couldn't eat it", bool: false, class: "" },
    { text: "Didn't like it", bool: false, class: "" },
    { text: "It was OK", bool: false, class: "" },
    { text: "Like It", bool: false, class: "" },
    { text: "Loved It", bool: false, class: "" },
  ]);

  const handleOnMouseEnter = (id) => {
    setRateArr((prevState) =>
      prevState
        .slice(0, id + 1)
        .map((item, i) => item && { ...item, bool: true, class: "star-border" })
        .concat(prevState.slice(id + 1, prevState.length).map((item) => item && { ...item, bool: false }))
    );
  };

  const handleOnMouseLeave = () => {
    if (clickId < 0) {
      setRateArr((prevState) => prevState.map((item, i) => item && { ...item, bool: false, class: "" }));
    } else {
      setRateArr((prevState) =>
        prevState
          .slice(0, clickId + 1)
          .map((item) => item && { ...item, bool: true, class: "star-border" })
          .concat(
            prevState.slice(clickId + 1, prevState.length).map((item) => item && { ...item, bool: false, class: "" })
          )
      );
    }
    setLastId(-1);
  };

  useEffect(() => {
    const onMouseLeave = (event) => {
      if (lastId > -1 && starRef.current && !starRef.current.contains(event.target)) {
        handleOnMouseLeave();
      }
    };
    document.addEventListener("mousemove", onMouseLeave);
    return () => {
      document.removeEventListener("mousemove", onMouseLeave);
    };
  }, [lastId, clickId]);

  useEffect(() => {
    let arr = rateArr.map((item) => item.bool).lastIndexOf(true);
    setLastId(arr);
  }, [rateArr]);

  useEffect(() => {
    setRateArr((prevState) =>
      prevState
        .slice(0, clickId + 1)
        .map((item) => item && { ...item, bool: true, class: "" })
        .concat(rateArr.slice(clickId + 1, rateArr.length).map((item) => item && { ...item, bool: false, class: "" }))
    );
  }, [clickId]);

  const clearInputs = () => {
    if (!myReview) {
      setRateArr((prevState) => prevState.map((item) => item && { ...item, bool: false, class: "" }));
      setClickId(-1);
      setComment("");
    } else {
      setSubmitted(true);
    }
  };

  const editReview = async (data) => {
    try {
      const [editUserReview, editRecipeReview] = await Promise.all([
        axios.post(`/api/user/${userData?.email}/editUserReview`, { ...data, recipeImage: recipe.image }),
        axios.post(`/api/recipe/${recipeId}/editRecipeReview`, {
          ...data,
          recipeId: myReview._id,
          userImage: userData.picture.image,
          userId: userData._id,
          nickname: userData.nickname,
        }),
      ]);

      const [editUserReviewData, editRecipeReviewData] = await Promise.all([
        editUserReview.data,
        editRecipeReview.data,
      ]);

      refetch();
      setReviews(editRecipeReviewData.reviews);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const createReview = async (data) => {
    try {
      const [userReview, recipeReview] = await Promise.all([
        axios.post(`/api/user/${userData?.email}/createUserReview`, { ...data, recipeImage: recipe.image }),
        axios.post(`/api/recipe/${recipeId}/createRecipeReview`, {
          ...data,
          userId: userData._id,
          userImage: userData.picture.image,
          nickname: userData.nickname,
        }),
      ]);
      const [userReviewData, recipeReviewData] = await Promise.all([userReview.data, recipeReview.data]);

      refetch();
      setReviews(recipeReviewData.reviews);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    let myReview = reviews?.filter((review) => review.userId === userData?._id)[0];
    if (myReview) {
      setMyReview(myReview);
      setSubmitted(true);
      setClickId(myReview.starRating);
    }
  }, [reviews, userData]);

  return (
    <Reviews>
      <div className="header" id="review-id">
        <h1>Reviews ({reviews.length})</h1>
      </div>
      {isEditting || isCreating ? (
        <Loading styles={{ marginTop: "-10%" }} />
      ) : (
        <>
          <div className="wrapper">
            {submitted && myReview ? (
              <UserReview
                recipeImg={recipe?.image}
                clickId={clickId}
                comment={comment}
                myReview={myReview}
                setSubmitted={setSubmitted}
              />
            ) : (
              <div className="content-reviews">
                <div className="profile-flex">
                  <img src={recipe?.image} alt="" />
                  <h4> {recipe?.title} </h4>
                </div>
                <div className="h4-margin">
                  <h4>
                    {`Your Rating  `}
                    <span>(required)</span>
                  </h4>
                </div>
                <div className="rate-container">
                  <div className="star-flex" ref={starRef} onMouseLeave={handleOnMouseLeave}>
                    {rateArr.map((star, id) =>
                      star.bool ? (
                        <Star
                          key={id}
                          className="colored-star"
                          onClick={() => setClickId(id)}
                          onMouseEnter={() => handleOnMouseEnter(id)}
                          onMouseLeave={handleOnMouseLeave}
                        />
                      ) : (
                        <StarBorder
                          key={id}
                          className={star.class !== "" ? star.class : ""}
                          onMouseEnter={() => handleOnMouseEnter(id)}
                          onMouseLeave={handleOnMouseLeave}
                        />
                      )
                    )}
                  </div>
                  <div className="divider"></div>
                  <p>{lastId !== -1 ? rateArr[lastId].text : ""}</p>
                </div>
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
              </div>
            )}
          </div>
          <div className="line-break"></div>
          {reviews.length !== 0 && <BarChart />}
          <Comments reviews={reviews} />
        </>
      )}
    </Reviews>
  );
};

const Reviews = styled.div`
  position: relative;
  min-height: 400px;

  .line-break {
    width: 100%;
    margin: 24px 0;
    border: 1px solid rgba(0, 0, 0, 0.14);
  }

  .header {
    display: flex;
    align-items: flex-end;

    h1 {
      font-size: 34px;
    }
  }

  .wrapper {
    width: 450px;
    margin: 34px auto;
    max-width: 100%;

    .content-reviews {
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

      .rate-container {
        display: flex;
        align-items: center;
        height: 50px;

        p {
          font-weight: 500;
          color: var(--grey-color);
          font-size: 16px;
        }

        .divider {
          width: 1px;
          height: 100%;
          margin: 0 14px;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }

        .star-flex {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;

          svg {
            color: var(--grey-color);
            font-size: 46px;
            cursor: pointer;
          }

          .colored-star {
            color: var(--red-color);
          }

          .star-border {
            color: var(--red-color);
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
    }

    .flex {
      display: flex;
      width: 80%;
      justify-content: space-between;

      div {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span {
          font-weight: 700;
        }
      }
    }

    h1 {
      font-size: 34px;
    }

    ul,
    ol {
      padding: 0 20px;
      list-style-type: disc;
      color: var(--red-color);

      li {
        font-size: 18px;
        color: var(--main-color);
        line-height: 2;
      }

      li::marker {
        color: var(--gold-color);
      }
    }
  }
`;

export default RecipeReviews;
