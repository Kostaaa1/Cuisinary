import React, { useContext } from 'react';
import styled from 'styled-components';
import LineBreak from '../../../common/LineBreak';
import { RecipeContext } from '../Recipe';
import { ImSpoonKnife } from 'react-icons/im';
import { Link } from 'react-scroll';
import { South } from '@mui/icons-material';

const Directions = () => {
  const { recipe } = useContext(RecipeContext);

  return (
    <Steps>
      <h1>Directions</h1>
      <div
        className="text-container"
        dangerouslySetInnerHTML={{ __html: recipe?.instructions }}
      ></div>
      <div className="buttons">
        <Link className="btn-highlight" to="review-id" smooth={true} duration={500}>
          I MADE IT
          <span>
            <ImSpoonKnife />
          </span>
        </Link>
        <Link to="link-to-similar" smooth={true} duration={500}>
          SIMILAR
          <span>
            <South />
          </span>
        </Link>
      </div>
      <LineBreak className="line-break" />
    </Steps>
  );
};

const Steps = styled.div`
  h1 {
    margin: 18px 0;
    font-size: 34px;
  }

  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 42px 0 22px 0;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      outline: 2px solid var(--red-color);
      font-weight: 800;
      letter-spacing: 1px;
      border: none;
      width: 48%;
      height: 46px;
      cursor: pointer;

      span {
        background-color: #fff;
        border-radius: 50%;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;

        svg {
          color: var(--red-color);
          font-size: 16px;
        }
      }

      &:hover {
        background-color: var(--red-color);
        color: #fff;
      }
    }

    .btn-highlight {
      background-color: var(--red-color);
      color: #fff;
    }
  }

  .text-container {
    font-size: 16px;
    line-height: 2;

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
  }
`;

export default Directions;
