import React, { useContext } from 'react';
import styled from 'styled-components';
import { RecipeContext } from '../Recipe';
import LineBreak from '../../../common/LineBreak';

const Ingredients = () => {
  const { recipe } = useContext(RecipeContext);

  return (
    <IngredientsContainer>
      <LineBreak className="line-break" />
      <h1>Ingredients</h1>
      <ul>
        {recipe?.extendedIngredients?.map((item, id) => (
          <li key={id}>{item.original}</li>
        ))}
      </ul>
    </IngredientsContainer>
  );
};

const IngredientsContainer = styled.div`
  width: 100%;
  margin: 20px 0 80px 0;

  ul {
    margin-top: 12px;
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
