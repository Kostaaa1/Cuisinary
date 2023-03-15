import React from "react";
import styled from "styled-components";

const Nutrition = () => {
  return (
    <NutriotionFacts>
      <div className="content-head">
        <h1>Nutrition Facts</h1>
        <span> (per serving) </span>
      </div>
      <div className="content-flex">
        <div>
          <span>50g</span>
          <p>Calories</p>
        </div>
        <div>
          <span>50g</span>
          <p>Calories</p>
        </div>
        <div>
          <span>50g</span>
          <p>Calories</p>
        </div>
        <div>
          <span>50g</span>
          <p>Calories</p>
        </div>
      </div>
    </NutriotionFacts>
  );
};

const NutriotionFacts = styled.div`
  width: 100%;
  /* margin: 20px 0; */

  .content-head {
    margin: 30px 0 14px 0;
    display: flex;

    h1 {
      pointer-events: none;
      font-size: 34px;
    }

    span {
      display: block;
      margin: 20px 0 0 6px;
      color: var(--grey-color);
      height: max-content;
    }
  }

  .content-flex {
    display: flex;
    align-items: flex-start;

    div {
      width: 25%;
      line-height: 2.2;

      span {
        font-weight: 700;
      }
    }
  }
`;

export default Nutrition;
