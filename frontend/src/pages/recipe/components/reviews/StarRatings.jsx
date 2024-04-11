import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Star, StarBorder } from '@mui/icons-material';

const StarRatings = ({
  clickId,
  setClickId,
  setLastId,
  starRef,
  setRateArr,
  lastId,
  rateArr,
  recipe,
}) => {
  const handleOnMouseEnter = (id) => {
    setRateArr((prevState) =>
      prevState
        .slice(0, id + 1)
        .map((item) => item && { ...item, bool: true, class: 'star-border' })
        .concat(
          prevState
            .slice(id + 1, prevState.length)
            .map((item) => item && { ...item, bool: false })
        )
    );
  };

  const handleOnMouseLeave = () => {
    if (clickId < 0) {
      setRateArr((prevState) =>
        prevState.map((item, i) => item && { ...item, bool: false, class: '' })
      );
      setLastId(-1);
    } else {
      setRateArr((prevState) =>
        prevState
          .slice(0, clickId + 1)
          .map((item) => item && { ...item, bool: true, class: 'star-border' })
          .concat(
            prevState
              .slice(clickId + 1, prevState.length)
              .map((item) => item && { ...item, bool: false, class: '' })
          )
      );
    }
  };

  useEffect(() => {
    const onMouseLeave = (event) => {
      if (lastId > -1 && starRef.current && !starRef.current.contains(event.target)) {
        handleOnMouseLeave();
      }
    };

    document.addEventListener('mousemove', onMouseLeave);
    return () => {
      document.removeEventListener('mousemove', onMouseLeave);
    };
  }, [lastId, clickId]);

  useEffect(() => {
    let index = rateArr.map((item) => item.bool).lastIndexOf(true);
    setLastId(index);
  }, [rateArr]);

  useEffect(() => {
    setRateArr((prevState) =>
      prevState
        .slice(0, clickId + 1)
        .map((item) => item && { ...item, bool: true, class: '' })
        .concat(
          rateArr
            .slice(clickId + 1, rateArr.length)
            .map((item) => item && { ...item, bool: false, class: '' })
        )
    );
  }, [clickId]);

  return (
    <>
      <div className="profile-flex">
        <img src={recipe?.image} alt="" />
        <h3> {recipe?.title} </h3>
      </div>
      <div className="h4-margin">
        <h4>
          {`Your Rating  `}
          <span>(required)</span>
        </h4>
      </div>
      <Ratings>
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
                className={star.class !== '' ? star.class : ''}
                onMouseEnter={() => handleOnMouseEnter(id)}
                onMouseLeave={handleOnMouseLeave}
              />
            )
          )}
          <div className="divider"></div>
        </div>
        <p>{lastId !== -1 ? rateArr[lastId].text : ''}</p>
      </Ratings>
    </>
  );
};

const Ratings = styled.div`
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
`;

export default StarRatings;
