import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { RecipeContext } from '../Recipe';

const Summary = ({ smallTextSize }) => {
  const { recipe } = useContext(RecipeContext);
  const summary = useMemo(() => {
    if (recipe?.summary) {
      let str = recipe.summary;
      let dotCount = 0;
      let index = 0;

      const dotEnd = smallTextSize ? 1 : 4;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === '.') {
          dotCount++;
          if (dotCount === dotEnd) {
            index = i;
            break;
          }
        }
      }
      let sum = str.slice(0, index + 1);
      return sum;
    }
  }, [recipe]);

  return (
    <Paragraph
      style={
        smallTextSize ? { fontSize: '14px' } : { fontSize: '16px', lineHeight: '1.7' }
      }
      dangerouslySetInnerHTML={{
        __html:
          smallTextSize && summary?.length > 80 ? `${summary.slice(0, 81)}...` : summary,
      }}
    ></Paragraph>
  );
};

const Paragraph = styled.p`
  font-weight: 400;
  color: var(--main-color);
  word-break: break-all !important;

  b {
    font-size: inherit;
    color: var(--main-color);
    font-weight: 400;
  }
`;

export default Summary;
