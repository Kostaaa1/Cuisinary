import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { DragIndicator } from '@mui/icons-material';
import { useWindowSize } from '../../../../utils/useWindowSize';
import HorizontalCard from '../../../../common/HorizontalCard';

const FavoriteCollection = ({ collection, layoutArr, onClick }) => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();

  return (
    <>
      {windowSize[0] >= 730 ? (
        <Collection onClick={onClick}>
          <CustomLink
            onClick={() => {
              collection.collName === 'All Saved Items'
                ? navigate('/account/profile/saved-items')
                : navigate(`/account/profile/collection/${collection._id}`);
            }}
          >
            <div className="collection-layout">
              {layoutArr?.map((recipe, id) =>
                recipe.data.image ? (
                  <img key={id} src={recipe.data.image} alt="" />
                ) : (
                  <div key={id} className="grey-div"></div>
                )
              )}
            </div>
            <div className="collection-description">
              <p>{collection.private ? 'PRIVATE' : 'PUBLIC'}</p>
              <h3>{collection.collName}</h3>
              <span>
                <DragIndicator /> Collection // {collection?.collRecipes?.length}
              </span>
            </div>
          </CustomLink>
        </Collection>
      ) : (
        <CustomLink>
          <HorizontalCard
            cardData={collection}
            image={layoutArr[0]}
            readMore={false}
            isRecipe={false}
          />
        </CustomLink>
      )}
    </>
  );
};

const CustomLink = styled.div`
  text-decoration: none;
  color: var(--main-color);
  cursor: pointer;
  width: 100%;
`;

const Collection = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  min-height: 400px;
  box-shadow: var(--card-shadow-border);
  overflow: none;

  .collection-description {
    display: flex;
    flex-direction: column;
    word-break: break-all;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 18px;
    height: 130px;

    span {
      display: flex;
      align-items: center;
      color: var(--grey-color);
      margin-left: -2px;
      font-weight: 500;

      svg {
        transform: rotate(90deg);
      }
    }

    p {
      font-weight: 600;
      letter-spacing: 1.4px;
      font-size: 12px;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 20%;
      }
    }

    h3 {
      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }
  }

  .collection-layout {
    height: 280px;
    display: grid;
    grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
    gap: 3.5px;

    .grey-div {
      background: #b1b1b1;
    }

    div:first-child,
    img:first-child {
      grid-row: 1 / 3;
      grid-column: 1 / 4;
    }

    div:nth-child(n + 2),
    img:nth-child(n + 2) {
      height: 100%;
    }

    div:nth-child(2),
    img:nth-child(2) {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }

    div:nth-child(3),
    img:nth-child(3) {
      grid-row: 3 / 4;
      grid-column: 2 / 3;
    }

    div:nth-child(4),
    img:nth-child(4) {
      grid-row: 3 / 4;
      grid-column: 3 / 4;
    }
  }
`;

export default FavoriteCollection;
