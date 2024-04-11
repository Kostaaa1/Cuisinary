import { Add, Remove } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonBorder from '../../../../common/ButtonBorder';
import RemoveRecipeModal from './RemoveRecipeModal';
import Loading from '../../../../common/Loading';
import AddCustomModal from './AddCustomModal';
import useNoScroll from '../../../../utils/useNoScroll';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../../../common/StarRating';
import { useWindowSize } from '../../../../utils/useWindowSize';

const CollectionCard = ({ favorite, addRecipeId, addLoading }) => {
  const navigate = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useNoScroll(showModal, showRemoveModal);
  const windowSize = useWindowSize();

  const closeModals = () => {
    setShowRemoveModal(false);
    setShowModal(false);
  };

  return (
    <>
      {windowSize[0] >= 730 ? (
        <Card>
          {favorite.loading && (
            <div className="transparent-card">
              <Loading style={{ marginBottom: '120px' }} />
            </div>
          )}
          <img
            src={favorite.data?.image}
            onClick={() => navigate(`/recipe/${favorite.data.id}`)}
          />
          <div className="card-content">
            <h4 onClick={() => navigate(`/recipe/${favorite.data.id}`)}>
              {favorite?.recipeTitle}
            </h4>
            <StarRating
              averageRate={favorite?.averageRate}
              reviewLength={favorite?.reviews.length}
            />
            <ButtonBorder
              style={{ width: '140px' }}
              value={'Add to collection'}
              icon={<Add />}
              onClick={() => setShowModal(true)}
            />
          </div>
          {!favorite.loading && (
            <Delete onClick={() => setShowRemoveModal(true)}>
              <Remove />
            </Delete>
          )}
        </Card>
      ) : (
        <HorizontalCard>
          {favorite.loading && (
            <div className="transparent-card">
              <Loading />
            </div>
          )}
          <img
            src={favorite.data?.image}
            onClick={() => navigate(`/recipe/${favorite.data.id}`)}
          />
          <div className="horizontal-card-content">
            <h4 onClick={() => navigate(`/recipe/${favorite.data.id}`)}>
              {favorite?.recipeTitle}
            </h4>
            <div className="star-ratings">
              <StarRating
                averageRate={favorite?.averageRate}
                reviewLength={favorite?.reviews.length}
              />
            </div>
            <ButtonBorder
              style={{ width: '140px' }}
              value={'Add to collection'}
              icon={<Add />}
              onClick={() => setShowModal(true)}
            />
          </div>
          {!favorite.loading && (
            <Delete onClick={() => setShowRemoveModal(true)}>
              <Remove />
            </Delete>
          )}
        </HorizontalCard>
      )}
      {showRemoveModal && (
        <RemoveRecipeModal
          remove={() => {
            addRecipeId(favorite._id);
            addLoading();
          }}
          title={favorite.recipeTitle}
          onClick={closeModals}
        />
      )}
      {showModal && (
        <AddCustomModal
          favorite={favorite}
          onClick={closeModals}
          showModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const HorizontalCard = styled.div`
  position: relative;
  display: flex;
  height: 140px;
  border: 1px solid var(--grey-hover-color);
  width: 100%;

  .transparent-card {
    position: absolute;
    background-color: rgba(245, 245, 245, 0.73);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .horizontal-card-content {
    display: flex;
    flex-direction: column;
    padding: 8px 14px;
    width: 100%;

    .star-ratings {
      margin: 10px 0;
    }

    h4 {
      text-align: start;
      color: var(--grey-color);
      cursor: pointer;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
        color: var(--main-color);
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }
  }

  img {
    height: 100%;
  }
`;

const Card = styled.div`
  position: relative;
  width: 28% !important;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  box-shadow: var(--card-shadow-border);

  @media (max-width: 1270px) {
    width: 270px;
  }

  .transparent-card {
    position: absolute;
    background-color: rgba(245, 245, 245, 0.73);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  img {
    height: 70%;
  }

  .card-content {
    padding: 1rem;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .flex {
      height: max-content;
      display: flex;
      align-items: start;

      p {
        font-size: 12px;
        margin-left: 6px;
      }
    }

    .summary {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      outline: 1px solid black;
      font-size: 14px;
      font-weight: 400 !important;
    }

    h4 {
      text-align: start;
      color: var(--grey-color);
      cursor: pointer;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
        color: var(--main-color);
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 12px;

      svg {
        color: var(--red-color);
        font-size: 1.3rem;
        margin-right: 5px;
      }
    }
  }
`;

const Delete = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #fff;
  right: -10px;
  top: -10px;
  border: 1px solid var(--red-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  @media screen and (max-width: 729px) {
    cursor: pointer;
    position: absolute;
    left: 170px;
    top: 4px;
    z-index: 1;
    background-color: white;
    border: 1px solid var(--red-color);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
    border-radius: 50%;
  }

  svg {
    color: var(--red-color);
  }
`;
export default CollectionCard;
