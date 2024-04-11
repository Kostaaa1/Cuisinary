import { Add } from '@mui/icons-material';
import styled from 'styled-components';
import ButtonBorder from '../../../../common/ButtonBorder';
import StarRating from '../../../../common/StarRating';
import { useWindowSize } from '../../../../utils/useWindowSize';

const TransparentCard = ({ favorite, removeRecipeId, addLoading }) => {
  const windowSize = useWindowSize();
  return (
    <>
      {windowSize[0] >= 730 ? (
        <Card>
          <img src={favorite.data?.image} alt="" />
          <div className="card-content">
            <h4>{favorite?.recipeTitle}</h4>
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
          <div className="transparent">
            <button
              onClick={() => {
                removeRecipeId(favorite._id), addLoading();
              }}
            >
              Undo
            </button>
          </div>
        </Card>
      ) : (
        <HorizontalCard>
          {favorite.loading && (
            <div className="transparent-card">
              <Loading style={{ marginBottom: '120px' }} />
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
          <div className="transparent">
            <button
              onClick={() => {
                removeRecipeId(favorite._id), addLoading();
              }}
            >
              Undo
            </button>
          </div>
        </HorizontalCard>
      )}
    </>
  );
};

const HorizontalCard = styled.div`
  position: relative;
  display: flex;
  height: 140px;
  border: 1px solid var(--grey-hover-color);

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

  .transparent {
    position: absolute;
    background-color: rgba(245, 245, 245, 0.73);
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 70px;

    button {
      color: var(--main-color);
      text-decoration: none;
      padding: 0.4rem 0.9rem;
      border: none;
      outline: 2px solid var(--red-color);
      font-weight: bold;
      display: block;
      text-align: center;
      align-items: center;
      font-size: 14px;
      max-width: 170px;
      cursor: pointer;

      &:hover {
        background-color: var(--red-color);
        color: white;
      }
    }
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
        font-size: 14px;
        margin-left: 6px;
        color: var(--grey-color);
      }
    }

    .summary {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 14px;
      font-weight: 400 !important;
    }

    h4 {
      text-align: start;
      color: var(--grey-color);
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

  .transparent {
    position: absolute;
    background-color: rgba(245, 245, 245, 0.73);
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    button {
      margin-bottom: 120px;
      color: var(--main-color);
      text-decoration: none;
      padding: 0.4rem 0.9rem;
      border: none;
      outline: 1px solid var(--red-color);
      font-weight: bold;
      display: block;
      text-align: center;
      align-items: center;
      font-size: 14px;
      max-width: 170px;
      cursor: pointer;

      &:hover {
        background-color: var(--red-color);
        color: white;
      }
    }
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
        font-size: 14px;
        margin-left: 6px;
        color: var(--grey-color);
      }
    }

    .summary {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 14px;
      font-weight: 400 !important;
    }

    h4 {
      text-align: start;
      color: var(--grey-color);
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

export default TransparentCard;
