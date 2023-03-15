import { Star, StarBorder } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const RecipeReviews = ({ recipe }) => {
  const [rateArr, setRateArr] = useState([
    { icon: StarBorder, text: "Couldn't eat it", bool: false },
    { icon: StarBorder, text: "Didn't like it", bool: false },
    { icon: StarBorder, text: "It was OK", bool: false },
    { icon: StarBorder, text: "Like It", bool: false },
    { icon: StarBorder, text: "Loved It", bool: false },
  ]);
  const [textFromRateArr, setTextFromRateArr] = useState([]);

  useEffect(() => {
    let arr = rateArr.filter((item) => item.bool);
    setTextFromRateArr(arr);
  }, [rateArr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("yo");
  };

  return (
    <Reviews>
      <div className="content-head">
        <h1>Reviews (0)</h1>
      </div>
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
          <div className="star-flex">
            {rateArr.map((star, id) => {
              const Icon = star.icon;
              return (
                <Icon
                  key={id}
                  className={star.icon === StarBorder ? "star" : "colored-star"}
                  onMouseEnter={() => {
                    setRateArr(
                      rateArr
                        .slice(0, id + 1)
                        .map((item, i) =>
                          id === i ? { ...item, icon: Star, bool: true } : { ...item, icon: Star, bool: false }
                        )
                        .concat(
                          rateArr
                            .slice(id + 1, rateArr.length)
                            .map((item) => item && { ...item, icon: StarBorder, bool: false })
                        )
                    );
                  }}
                  onMouseLeave={() => {
                    setRateArr(rateArr.map((item) => item && { ...item, icon: StarBorder, bool: false }));
                  }}
                />
              );
            })}
          </div>
          <div className="divider"></div>
          <p>{textFromRateArr.length !== 0 ? textFromRateArr[0].text : ""}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="h4-margin">
            <h4>
              {`Your Review  `}
              <span>(optional)</span>
            </h4>
          </label>

          <textarea placeholder="What did  you think about this recipe? Did you make any changes or notes?"></textarea>
          <div className="buttons">
            <input type="submit" className="btn-save" />
          </div>
        </form>
      </div>
    </Reviews>
  );
};

const Reviews = styled.div`
  .content-reviews {
    width: 400px;
    margin: 0 auto;

    form {
      textarea {
        width: 100%;
        padding: 15px;
        height: 120px;
        font-size: 14px;
      }

      .buttons {
        .btn-save {
          width: 120px;
          height: 40px;
          /* padding: 20px 35px; */
          font-size: 12px;
          font-weight: bold;
          color: white;
          background-color: #d9d9d9;
          display: block;
          border: none;
          border-radius: 3px;
          letter-spacing: 1.2px;
        }
      }
      /* outline: 1px solid black; */
    }

    .h4-margin {
      margin: 28px 0 14px 0;
      display: flex;
      align-items: center;

      h4 {
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
        height: 100%;

        .colored-star {
          color: var(--red-color);
        }

        .star {
          color: var(--grey-color);
        }

        svg {
          color: var(--grey-color);
          font-size: 45px;
          cursor: pointer;
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
        height: 60px;
        width: 60px;
        margin: 0;
        margin-right: 12px;
      }

      h4 {
        font-size: 18px;
      }
    }
  }

  .content-head {
    display: flex;
    align-items: flex-end;

    span {
      margin-bottom: 20px;
      color: var(--grey-color);
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
    /* letter-spacing: -2px; */
    font-size: 34px;
    margin: 50px 0 20px 0;
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
`;

export default RecipeReviews;
