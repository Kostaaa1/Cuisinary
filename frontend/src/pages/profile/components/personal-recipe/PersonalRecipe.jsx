import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../../../common/Loading';
import ButtonBorder from '../../../../common/ButtonBorder';
import LineBreak from '../../../../common/LineBreak';
import DeleteModal from '../../../../common/DeleteModal';
import { useAuth0 } from '@auth0/auth0-react';
import FullImageModal from '../../../../common/FullImageModal';
import {
  AccessTime,
  Check,
  Delete,
  Fullscreen,
  MoreHoriz,
  RiceBowl,
} from '@mui/icons-material';
import useNoScroll from '../../../../utils/useNoScroll';
import useSmoothScroll from '../../../../utils/useSmoothScroll';

const PersonalRecipe = () => {
  const params = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showIconFullsize, setShowIconFullsize] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const queryClient = useQueryClient();
  const fixedRef = useRef(null);
  const userData = queryClient.getQueryData(['context-user']);

  useNoScroll(showImageModal);
  useSmoothScroll();

  // To Abstract
  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    queryClient.invalidateQueries(['personal-recipes']);
  }, [queryClient]);

  const fetchPersonalRecipe = async () => {
    try {
      const res = await axios.get(
        `/api/user/${params?.userId}/${params.id}/getPersonalRecipe`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: recipeData, isFetching } = useQuery(
    ['personal-recipes'],
    fetchPersonalRecipe,
    {
      enabled: !!params,
      refetchOnMount: 'always',
    }
  );

  // To Abstract
  const deletePersonalRecipe = async () => {
    try {
      await axios.delete(
        `/api/user/${user?.email}/${recipeData._id}/deletePersonalRecipe`
      );
    } catch {
      console.log(error.message);
    } finally {
      navigate('/account/profile/recipes');
    }
  };

  return (
    <>
      <Recipe>
        {!recipeData || isFetching ? (
          <Loading />
        ) : (
          <>
            <div className="head-content-wrap">
              <h1>{recipeData?.title}</h1>
              <p> {recipeData?.summary} </p>
              <span className="created-by">
                {recipeData?.private ? 'Private' : 'Public'} recipe by: &nbsp;
                <Link to={`/profile/${recipeData?.createdByUserId}`}>
                  {recipeData?.createdBy}
                </Link>
              </span>
            </div>
            {params.userId === userData?._id && (
              <div className="buttons-wrap">
                <ButtonBorder
                  value={'DELETE'}
                  icon={<Delete />}
                  style={{ width: '80px', height: '40px' }}
                  onClick={() => setShowDeleteModal(true)}
                />
                <ButtonBorder
                  value={'EDIT'}
                  icon={<MoreHoriz />}
                  style={{ width: '80px', height: '40px' }}
                />
              </div>
            )}
            <div className="head-wrap">
              <div
                className="image-div"
                onMouseEnter={() => setShowIconFullsize(true)}
                onMouseLeave={() => setShowIconFullsize(false)}
              >
                {showIconFullsize && (
                  <Fullscreen
                    onClick={() => setShowImageModal(true)}
                    className="fullscreen-icon"
                  />
                )}
                <img src={recipeData?.picture.image} alt="" />
              </div>
              <div className="recipe-info" ref={fixedRef}>
                <AccessTime />
                <div className="info-wrap">
                  <h5>Prep:</h5>
                  <span>{recipeData?.preparationMinutes}</span>
                </div>
                <div className="info-wrap">
                  <h5>Cook:</h5>
                  <span>{recipeData?.readyInMinutes}</span>
                </div>
                <div className="info-wrap">
                  <h5>Servings:</h5>
                  <span>{recipeData?.servings}</span>
                </div>
              </div>
            </div>
            <section>
              <div className="line-break">
                <LineBreak />
                <RiceBowl />
              </div>
              <div className="ul-wrap ingredients">
                <h2>Ingredients</h2>
                <ul>
                  {recipeData?.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}> {ingredient.value} </li>
                  ))}
                </ul>
              </div>
              <div className="line-break">
                <LineBreak />
                <RiceBowl />
              </div>
              <div className="ul-wrap">
                <h2>Directions</h2>
                <ul>
                  {recipeData?.directions.map((ingredient, id) => (
                    <div className="li-wrap" key={ingredient.id}>
                      <span className="steps">
                        <Check />
                        <h6>Step {id + 1} </h6>
                      </span>
                      <li key={ingredient.id}> {ingredient.value} </li>
                    </div>
                  ))}
                </ul>
              </div>
              <div className="line-break">
                <LineBreak />
                <RiceBowl />
              </div>
            </section>
            <div className="popular-recipes"></div>
          </>
        )}
      </Recipe>
      {showDeleteModal && (
        <DeleteModal
          text={'Delete Recipe'}
          message={'Are you sure you want to delete your'}
          name={recipeData.title}
          type="recipe"
          closeModal={() => setShowDeleteModal(false)}
          onClick={deletePersonalRecipe}
        />
      )}
      {showImageModal && (
        <FullImageModal
          showImageModal={showImageModal}
          closeModal={() => setShowImageModal(false)}
          imageUrl={recipeData.picture.image}
        />
      )}
    </>
  );
};

const Recipe = styled.main`
  position: relative;
  width: 1240px;
  max-width: 100%;
  margin: 0 auto;
  min-height: 60vh;
  height: 100%;
  padding: 250px 0;

  @media screen and (max-width: 1270px) {
    padding: 180px 36px 0 36px;
  }

  .created-by {
    display: flex;

    a {
      font-weight: bold;
      text-decoration: underline;
      text-underline-offset: 5px;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-decoration-thickness: 10%;
      }
    }
  }

  .buttons-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 180px;
    margin: 16px 0;
  }

  .line-break {
    position: relative;
    margin: 30px 0;

    svg {
      position: absolute;
      right: 0;
      transform: translateY(-50%);
      font-size: 36px;
      background: #fff;
      padding-left: 6px;
      color: var(--gold-color);
    }
  }

  .ul-wrap {
    .li-wrap {
      margin: 32px 0;
    }

    .steps {
      display: flex;
      align-items: center;
      margin: 16px 0;

      svg {
        margin-right: 12px;
        color: #fff;
        border-radius: 50%;
        padding: 4px;
        background: var(--input-border-color);
      }
    }

    ul {
      list-style: none;

      li {
        font-size: 16px;
        color: var(--main-color);
      }
    }
  }

  .ingredients {
    ul {
      margin-top: 24px;
      padding: 0 20px;
      list-style: disc;

      li {
        margin: 12px 0;
      }

      li::marker {
        color: var(--gold-color);
      }
    }
  }

  h1 {
    font-size: 44px !important;
    font-weight: 800;
  }

  section {
    width: 550px;
    max-width: 100%;
  }

  .head-content-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
  }

  .head-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;

    .image-div {
      position: relative;
      margin-bottom: 12px;
      max-width: 100%;
      width: 550px;
      cursor: pointer;

      .fullscreen-icon {
        position: absolute;
        outline: 1px solid black;
        z-index: 5;
        height: 42px;
        width: 42px;
        border: 1px solid black;
        color: white;
        bottom: 0;
        transform: translate(10%, -10%);
        background-color: rgba(0, 0, 0, 0.8);
      }

      img {
        object-position: center;
        width: 100%;
        max-height: 620px;
      }
    }

    .recipe-info {
      position: relative;
      margin-left: 16px;
      height: 100%;
      box-shadow: var(--card-shadow-border);
      padding: 20px;
      padding-right: 52px;
      max-width: 100%;

      @media screen and (max-width: 890px) {
        padding: 20px;
        width: 550px;
        margin: 20px 0;
      }

      .info-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 14px 0;

        span {
          margin-left: 8px;
          font-size: 15px;
        }
      }

      svg {
        position: absolute;
        top: -12px;
        right: -12px;
        background-color: #fff;
        z-index: 5;
        width: 40px;
        height: 40px;
        padding: 4px;
        color: var(--gold-color);
      }
    }
  }
`;

export default PersonalRecipe;
