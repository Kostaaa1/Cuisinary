import React from "react";
import styled from "styled-components";

const Directions = ({ recipe }) => {
  return (
    <Steps>
      <h1>Directions</h1>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
    </Steps>
  );
};

const Steps = styled.div`
  h1 {
    margin: 20px 0;
    font-size: 34px;
  }

  ol {
    list-style: disc;
    font-size: 16px;
    padding: 0 20px;

    li {
      line-height: 2.2;
      color: var(--main-color);
    }

    li::marker {
      color: var(--gold-color);
    }
  }
`;

export default Directions;
