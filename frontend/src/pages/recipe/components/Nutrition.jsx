import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Nutrition = ({ nutritions }) => {
  return (
    <NutritionFacts>
      {nutritions && (
        <>
          <div className="content-head">
            <h1>Nutrition Facts</h1>
            <span> (per serving) </span>
          </div>
          <div className="content-flex">
            <div>
              <span> {nutritions.calories + "cal"} </span>
              <p>Calories</p>
            </div>
            <div>
              <span> {nutritions.carbs} </span>
              <p>Carbs</p>
            </div>
            <div>
              <span> {nutritions.fat} </span>
              <p>Fat</p>
            </div>
            <div>
              <span> {nutritions.protein} </span>
              <p>Protein</p>
            </div>
          </div>
        </>
      )}
    </NutritionFacts>
  );
};

const NutritionFacts = styled.div`
  width: 100%;

  .content-head {
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
    margin-top: 16px;

    div {
      width: 25%;
      line-height: 1.6;

      span {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
`;

export default Nutrition;
