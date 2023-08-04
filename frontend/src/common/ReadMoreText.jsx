import { useState } from 'react';
import styled from 'styled-components';

const ReadMoreText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <ReadMore>
      <div>
        {isTruncated
          ? `${text.slice(0, maxLength)}${text.length > maxLength ? '... ' : ''}`
          : `${text} `}
        {text.length > maxLength && (
          <span className="read-more" onClick={toggleTruncate}>
            {isTruncated ? 'Read More' : 'Show Less'}
          </span>
        )}
      </div>
    </ReadMore>
  );
};

const ReadMore = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  div {
    font-size: 16px !important;
    line-height: 1.3;
  }

  .read-more {
    position: relative;
    cursor: pointer;
    font-size: inherit;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: underline;
    text-decoration-color: var(--red-color);
    text-underline-offset: 5px;
    text-decoration-thickness: 8%;
    background-color: white;

    /* &:after {
      background-color: rgba(255, 255, 255, 0.5);
      content: '';
      position: absolute;
      left: -6px;
      bottom: 0;
      height: 100%;
      width: 8px;
    } */

    &:hover {
      text-decoration-thickness: 12%;
    }
  }
`;

export default ReadMoreText;
