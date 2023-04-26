import React, { useContext } from "react";
import styled from "styled-components";
import { RecipeContext } from "../Recipe";

const Summary = () => {
  const { summary } = useContext(RecipeContext);

  return (
    <Paragraph
      className="summary"
      dangerouslySetInnerHTML={{
        __html: summary,
      }}
    ></Paragraph>
  );
};

const Paragraph = styled.p`
  line-height: 1.7;
  font-weight: 400;
  color: var(--main-color);

  b {
    color: var(--main-color);
    font-size: 16px;
    font-weight: 400;
  }
`;

export default Summary;
