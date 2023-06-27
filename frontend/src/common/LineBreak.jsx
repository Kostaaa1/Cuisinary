import React from 'react';
import styled from 'styled-components';

const LineBreak = ({ className }) => {
  return <Break className={className}></Break>;
};

const Break = styled.div`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.11);
`;

export default LineBreak;
