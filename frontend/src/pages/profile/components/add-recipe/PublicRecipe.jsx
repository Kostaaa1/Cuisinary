import { HttpsOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PublicRecipe = ({ isPublic, setIsPublic }) => {
  return (
    <Section>
      <label>Make this recipe public?</label>
      <div className="checkbox">
        <div className="wrap">
          <input
            className="styled-checkbox check"
            id="public"
            name="public"
            type="checkbox"
            onChange={() => setIsPublic(true)}
            checked={isPublic}
          />
          <label htmlFor="public" className="">
            Public Recipes
          </label>
        </div>
        <span>Anyone who sees my profile can see this recipe</span>
      </div>
      <div className="checkbox">
        <div className="wrap">
          <input
            className="styled-checkbox check"
            id="personal"
            name="personal"
            type="checkbox"
            onChange={() => setIsPublic(false)}
            checked={!isPublic}
          />
          <label htmlFor="personal" className="">
            Personal Recipes
          </label>
        </div>
        <span>Only I can see the recipe</span>
      </div>
    </Section>
  );
};

const Section = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.16);
  padding: 34px 0;

  .checkbox {
    margin: 20px 0 14px 0;
    user-select: none;
    display: flex;
    flex-direction: column;

    .wrap {
      display: flex;
      flex-direction: row-reverse;
      justify-content: start;
      align-content: center;
      text-align: center;
      font-size: 14px;

      svg {
        color: var(--grey-color);
        transform: scale(1.4);
        font-size: 14px;
        margin-left: 6px;
      }
    }

    span {
      font-weight: 400;
      font-size: 12px;
    }
  }
`;

export default PublicRecipe;
