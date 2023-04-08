import React from "react";
import styled from "styled-components";

const Ingredients = ({ ingredients }) => {
  return (
    <IngredientsContainer>
      <h1>Ingredients</h1>
      <ul>
        {ingredients?.map((item, id) => (
          <li key={id}>{item.original}</li>
        ))}
      </ul>
    </IngredientsContainer>
  );
};

const IngredientsContainer = styled.div`
  width: 100%;

  h1 {
    margin: 18px 0;
    font-size: 34px;
  }

  ul {
    padding: 0 20px;

    li {
      font-size: 16px;
      line-height: 2.2;
      color: var(--main-color);
    }

    li::marker {
      color: var(--gold-color);
    }
  }
`;

export default Ingredients;
