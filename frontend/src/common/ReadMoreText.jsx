import { useState } from 'react';
import styled from 'styled-components';

const ReadMoreText = ({ text, maxLength, readMore }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <ReadMore>
      {readMore ? (
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
      ) : (
        <div> {text} </div>
      )}
    </ReadMore>
  );
};

const ReadMore = styled.div`
  position: relative;
  word-break: break-all;

  span {
    color: var(--main-color);
  }

  div {
    font-size: 16px !important;
    color: var(--grey-color);
    line-height: 1.5;

    @media screen and (max-width: 729px) {
      font-size: 14px !important;
    }
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

    &:hover {
      text-decoration-thickness: 12%;
    }
  }
`;

export default ReadMoreText;
