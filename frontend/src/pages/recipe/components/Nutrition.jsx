import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { RecipeContext } from "../Recipe";
import LineBreak from "../../../common/LineBreak";

const Nutrition = () => {
  const { recipe } = useContext(RecipeContext);

  return (
    <NutritionFacts>
      {recipe && (
        <>
          <div className="content-head">
            <h1>Nutrition Facts</h1>
            <span> (per serving) </span>
          </div>
          <div className="content-flex" id="review-id">
            {recipe?.nutrition?.nutrients
              .filter(
                (item) =>
                  item.name === "Calories" ||
                  item.name === "Fat" ||
                  item.name === "Carbohydrates" ||
                  item.name === "Protein"
              )
              .map((item, id) => (
                <div key={id}>
                  <h4> {item.amount.toString().split(".")[0] + item.unit} </h4>
                  <p> {item.name === "Carbohydrates" ? "Carbs" : item.name} </p>
                </div>
              ))}
          </div>
        </>
      )}
      <LineBreak className="line-break" />
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
    margin-top: 24px;

    div {
      width: 25%;
      line-height: 1.6;

      h4 {
        color: var(--main-color);
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
`;

export default Nutrition;
