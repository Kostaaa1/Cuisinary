import { Add, AddAPhoto } from '@mui/icons-material';
import styled from 'styled-components';
import { useWindowSize } from '../../../../utils/useWindowSize';

const NewCollectionCard = ({ onClick }) => {
  const windowSize = useWindowSize();
  return (
    <NewCard onClick={onClick} style={{ width: windowSize[0] >= 730 ? '270px' : '100%' }}>
      {windowSize[0] < 730 ? (
        <div className="responsive-card">
          <div className="responsive-add">
            <Add />
          </div>
          <h3>New Collection</h3>
        </div>
      ) : (
        <Card>
          <div className="add">
            <Add />
          </div>
          <h3>New Collection</h3>
        </Card>
      )}
    </NewCard>
  );
};

const NewCard = styled.div`
  svg {
    font-size: 2.8rem;
    color: var(--red-color);
  }

  .responsive-card {
    cursor: pointer;
    height: max-content;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 12px 0;

    .responsive-add {
      width: 50px;
      height: 50px;
      border: 1px solid var(--red-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      margin-top: 12px;
    }

    &:hover {
      h3 {
        text-decoration: underline;
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: var(--card-shadow-border);
  overflow: none;
  min-height: 400px;
  cursor: pointer;

  .add {
    width: 120px;
    height: 120px;
    border: 1px solid var(--red-color);
    border-radius: 50%;
    margin: 80px auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    h3 {
      text-decoration: underline;
      text-decoration-color: var(--main-color);
      text-underline-offset: 5px;
      text-decoration-thickness: 10%;
    }
  }

  h3 {
    margin: -50px auto;
  }
`;

export default NewCollectionCard;
