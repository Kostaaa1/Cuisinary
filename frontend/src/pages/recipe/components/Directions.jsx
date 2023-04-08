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
    margin: 18px 0;
    font-size: 34px;
  }

  div {
    font-size: 16px;
    line-height: 2.2;
  }

  ol {
    list-style: disc;
    padding: 0 20px;

    li {
      font-size: 16px;
      color: var(--main-color);
    }

    li::marker {
      color: var(--gold-color);
    }
  }
`;

export default Directions;
