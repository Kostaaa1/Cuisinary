import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Star, StarBorder } from '@mui/icons-material';
import Button from '../../../common/Button';
import Loading from '../../../common/Loading';
import { Link } from 'react-router-dom';
import {
  ArrowDropDown,
  Check,
  KeyboardArrowDown,
  SupervisorAccount,
} from '@mui/icons-material';
import SectionHeader from '../../../common/SectionHeader';

const Reviews = ({ userData }) => {
  const loadCount = 5;
  const sortingRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [hideDropdown, setHideDropdown] = useState(false);
  const [sortData, setSortData] = useState([
    { text: 'Newest', clicked: true, id: 0 },
    { text: 'Oldest', clicked: false, id: 1 },
    { text: 'Most Positive', clicked: false, id: 2 },
    { text: 'Least Positive', clicked: false, id: 3 },
  ]);
  const [sortingTitle, setSortingTitle] = useState(
    sortData.filter((item) => item.clicked)[0].text || ''
  );

  useEffect(() => {
    if (userData) {
      let arr = userData?.reviews;
      switch (sortingTitle) {
        case 'Newest':
          arr?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          break;
        case 'Oldest':
          arr?.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
          break;
        case 'Least Positive':
          arr?.sort((a, b) => a.starRating - b.starRating);
          break;
        case 'Most Positive':
          arr?.sort((a, b) => b.starRating - a.starRating);
          break;
        default:
          break;
      }

      if (arr?.length > 5) {
        setReviews(arr.slice(0, loadCount));
        setShowLoadMore(true);
      } else {
        setReviews(arr);
      }
    }
  }, [userData, sortingTitle]);

  useEffect(() => {
    if (reviews?.length === userData?.reviews?.length) {
      setShowLoadMore(false);
    }
  }, [reviews]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setReviews((prevState) => {
        const newReviews = prevState.concat(
          userData.reviews.slice(prevState.length, loadCount + prevState.length)
        );
        setIsLoadingMore(false);
        return newReviews;
      });
      setIsLoadingMore(false);
    }, Math.random() * 800);
  };

  const handleCheck = (title) => {
    setSortingTitle(title);
    setIsSorting(true);

    setSortData((prevState) =>
      prevState.map((item, i) =>
        item.text === title ? { ...item, clicked: true } : { ...item, clicked: false }
      )
    );

    setHideDropdown(false);

    setTimeout(() => {
      setIsSorting(false);
    }, Math.random() * 800);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (sortingRef.current && !sortingRef.current.contains(e.target)) {
        setHideDropdown(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    console.log(userData.reviews);
  }, [userData.reviews]);

  return (
    <Container>
      <SectionHeader
        title="Reviews"
        text="Reviews you have added to content."
        icon={<SupervisorAccount />}
        span="Other users can see reviews you have made"
      />
      {userData?.reviews?.length !== 0 ? (
        <>
          <div className="sorting-div">
            <h3> {reviews.length} reviews </h3>
            <div ref={sortingRef} className="relative-flex">
              <span onClick={() => setHideDropdown(!hideDropdown)}>
                SORT BY:
                {sortData.filter((item) => item.clicked)[0].text.toUpperCase()}
                <ArrowDropDown />
              </span>
              <ul className={`${hideDropdown ? '' : 'hide-dropdown'} dropdown`}>
                {sortData.map((item) => (
                  <li key={item.id}>
                    {item.clicked && <Check />}
                    <p onClick={() => handleCheck(item.text)}> {item.text} </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ReviewsSections>
            <div className="head-info" onClick={() => setShowReviews(!showReviews)}>
              <h3>Your Reviews</h3>
              <KeyboardArrowDown className={showReviews ? '' : 'show'} />
            </div>
            {showReviews && (
              <div className="reviews-control">
                {isSorting ? (
                  <div className="loading-wrap">
                    <Loading />
                  </div>
                ) : (
                  <>
                    {reviews?.map((review, id) => (
                      <div key={id} className="reviews">
                        <Link to={'/recipe/' + review.recipeId}>
                          <img src={review.recipeImage} alt="review-image" />
                        </Link>
                        <div className="control-flex">
                          <Link to={'/recipe/' + review.recipeId}>
                            <h2> {review.recipeTitle} </h2>
                          </Link>
                          <div className="stars-wrap">
                            {[...Array(5)].map((_, id) =>
                              id <= review.starRating ? (
                                <Star key={id} />
                              ) : (
                                <StarBorder
                                  key={id}
                                  className="bordered"
                                  style={{ color: 'var(--red-color)' }}
                                />
                              )
                            )}
                            <span>&nbsp; My Review</span>
                          </div>
                          <p> {review.comment} </p>
                        </div>
                      </div>
                    ))}
                    {showLoadMore && (
                      <div className="button-flex">
                        {!isLoadingMore ? (
                          <Button
                            value={'LOAD MORE'}
                            onClick={handleLoadMore}
                            style={{ width: '160px', height: '50px' }}
                          />
                        ) : (
                          <Loading />
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </ReviewsSections>
        </>
      ) : (
        <div className="wrapper">
          <h1> You haven't created any reviews yet. </h1>
        </div>
      )}
    </Container>
  );
};

const Container = styled.section`
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 0;

    h1 {
      font-size: 26px !important;
      color: var(--grey-color);
    }
  }

  .sorting-div {
    margin: 22px 0;
    display: flex;
    width: 100%;
    justify-content: space-between;

    .relative-flex {
      position: relative;
      user-select: none;

      span {
        cursor: pointer;
        color: var(--main-color);
        letter-spacing: 0.6px !important;
        font-size: 14px;
        font-weight: 700;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;

        svg {
          color: var(--red-color);
        }
      }

      .dropdown {
        position: absolute;
        box-shadow: var(--card-shadow-border);
        /* top: 30px; */
        /* right: 6px; */
        left: -30px;
        width: 160px;
        height: 170px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 12px 0;
        padding-left: 36px;
        z-index: 10;
        color: var(--main-color);

        li {
          display: flex;
          position: relative;
          width: 100%;
          cursor: pointer;
          list-style: none;

          p {
            font-size: 14px;
          }

          svg {
            position: absolute;
            color: var(--red-color);
            top: -2px;
            left: -24px;
            font-size: 20px;
          }
        }
      }
      .hide-dropdown {
        display: none;
      }
    }
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    height: 60px;

    h1 {
      font-weight: bold;
      font-size: 38px;
      letter-spacing: -0.9px;
    }
  }
`;

const ReviewsSections = styled.section`
  width: 100%;
  height: 100%;
  font-size: 20px;
  border: 1px solid var(--input-border-color);

  a {
    text-decoration: none;
  }

  .head-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    user-select: none;

    .show {
      transform: rotate(180deg);
    }

    h3 {
      margin: 20px 0;
      font-size: 22px;
    }

    svg {
      transition: all 0.2s 0s ease-in-out;
    }

    .click {
      transform: rotate(180deg);
    }
  }

  .reviews-control {
    border-top: 1px solid var(--input-border-color);

    .button-flex {
      height: 80px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 1.8rem;
    }

    .loading-wrap {
      position: relative;
      height: 100px;
      width: 100%;
      border: 1px solid var(--grey-hover-color);
    }

    .reviews {
      display: flex;
      align-items: center;
      border: 1px solid var(--grey-hover-color);
      margin: 1.8rem;
      height: 100%;

      img {
        height: 160px;
        width: 320px;
      }

      .control-flex {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 28px;
        width: 100%;
        height: 84px;

        .stars-wrap {
          display: flex;
          align-items: center;
        }

        .bordered {
          color: var(--grey-color) !important;
        }

        h2 {
          cursor: pointer;
          width: fit-content;
          color: var(--grey-color);
          font-size: 22px;

          &:hover {
            color: var(--main-color);
            text-decoration: underline;
            text-decoration-color: var(--main-color);
            text-underline-offset: 5px;
            text-decoration-thickness: 8%;
          }
        }
      }

      p {
        font-size: 14px;
      }

      svg {
        color: var(--red-color);
      }
    }
  }
`;

export default Reviews;
