import { Add } from "@mui/icons-material";
import styled from "styled-components";

const NewCollectionCard = ({ onClick }) => {
  return (
    <Card onClick={onClick}>
      <div className="add">
        <Add />
      </div>
      <h3>New Collection</h3>
    </Card>
  );
};

const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 270px;
  font-size: 14px;
  box-shadow: var(--card-shadow-border);
  overflow: hidden;
  min-height: 400px;

  h3 {
    margin: -50px auto;

    &:hover {
      text-decoration: underline;
      text-decoration-color: var(--main-color);
      text-underline-offset: 5px;
      text-decoration-thickness: 10%;
    }
  }

  .add {
    width: 120px;
    height: 120px;
    border: 1px solid var(--red-color);
    border-radius: 50%;
    margin: 80px auto;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 2.8rem;
      color: var(--red-color);
    }
  }
`;

export default NewCollectionCard;
