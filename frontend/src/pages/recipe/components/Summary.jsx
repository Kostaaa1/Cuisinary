import React, { useMemo } from 'react';
import styled from 'styled-components';

const Summary = ({ recipe, smallTextSize }) => {
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
      return str.slice(0, index + 1);
    }
  }, [recipe]);

  return (
    <Paragraph
      style={
        smallTextSize ? { fontSize: '14px' } : { fontSize: '16px', lineHeight: '1.7' }
      }
      dangerouslySetInnerHTML={{
        __html: summary,
      }}
    ></Paragraph>
  );
};

const Paragraph = styled.p`
  font-weight: 400;
  color: var(--main-color);

  b {
    font-size: inherit;
    color: var(--main-color);
    font-weight: 400;
  }
`;

export default Summary;
