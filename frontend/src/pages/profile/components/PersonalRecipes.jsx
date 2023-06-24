import styled from 'styled-components';
import { SupervisorAccount } from '@mui/icons-material';
import Button from '../../../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeader from '../../../common/SectionHeader';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const PersonalRecipes = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const [personalRecipes, setPersonalRecipes] = useState([]);

  const userData = queryClient.getQueryData(['user-data', user?.email]);

  useEffect(() => {
    setPersonalRecipes(userData?.personalRecipes);
  }, [userData]);

  return (
    <Section>
      <SectionHeader
        title="Personal Recipes"
        text="Recipes you have created on Culinary."
        span="Other users will see the recipes you've made public."
        buttonValue={
          userData.personalRecipes.length > 0 ? 'ADD RECIPE +' : null
        }
        buttonSave={true}
        icon={<SupervisorAccount />}
        onClick={() => navigate('/account/add-recipe')}
      />
      {personalRecipes.length === 0 ? (
        <div className="recipe-add">
          <h2>You haven't created any recipes yet.</h2>
          <p>To add a recipe click the button bellow</p>
          <Button
            onClick={() => navigate('/account/add-recipe')}
            value={'ADD RECIPE +'}
            style={{ padding: '1.4rem 1.8rem' }}
          />
        </div>
      ) : (
        <Grid>
          {personalRecipes.map((recipe) => (
            <Card key={recipe._id}>
              <Link to={`/account/${userData._id}/recipe/${recipe._id}`}>
                <img src={recipe.picture.image} alt="" />
                <div className="card-content">
                  <p> {recipe.private ? 'PRIVATE' : 'PUBLIC'} </p>
                  <h3> {recipe.title} </h3>
                  <p className="summary"> {recipe.summary} </p>
                </div>
              </Link>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 2rem;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: var(--card-shadow-border);

  .loading {
    transform: translate(0, -55px);
  }

  @media (max-width: 1270px) {
    width: 270px;
  }

  img {
    width: 100%;
    height: 280px;
  }

  .card-content {
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 120px;
    display: flex;

    .summary {
      letter-spacing: normal !important;
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 14px;
      font-weight: 500 !important;
    }

    h3 {
      text-align: start;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: var(--main-color);
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }

    p {
      font-weight: 600;
      letter-spacing: 1.4px;
      font-size: 12px;
      color: var(--grey-color);
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 20%;
      }
    }
  }
`;

const Section = styled.section`
  .recipe-add {
    margin: 32px 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 160px;

    h2 {
      color: var(--grey-color);
    }
  }
`;

export default PersonalRecipes;
