import styled from "styled-components";
import { SupervisorAccount } from "@mui/icons-material";
import Button from "../../../common/Button";
import SectionInfo from "../../../common/SectionInfo";

const PersonalRecipes = () => {
  return (
    <Wrapper>
      <h1>Personal Recipes</h1>
      <SectionInfo
        value={"Recipes you have created on Culinary."}
        text={"Other users will see the recipes you've made public."}
        icon={<SupervisorAccount />}
      />
      <div className="recipe__add">
        <h2>You haven't created any recipes yet.</h2>
        <p>To add a recipe click the button bellow</p>
        <Button value={"ADD RECIPE +"} style={{ width: "200px", height: "60px" }} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;

  .recipe__add {
    margin: 32px 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      font-size: 24px;
      line-height: 25px;
      color: var(--grey-color);
    }

    p {
      margin: 20px 0 30px 0;
    }
  }

  h1 {
    font-weight: bold;
    margin-bottom: 38px;
    font-size: 2.4rem;
  }

  .line__break {
    width: 100%;
    height: 1px;
    margin: 40px 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default PersonalRecipes;
