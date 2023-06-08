import styled from "styled-components";
import { SupervisorAccount } from "@mui/icons-material";
import Button from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../common/SectionHeader";

const PersonalRecipes = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <SectionHeader
        title="Personal Recipes"
        text="Recipes you have created on Culinary."
        span="Other users will see the recipes you've made public.
            "
        icon={<SupervisorAccount />}
      />
      <div className="recipe-add">
        <h2>You haven't created any recipes yet.</h2>
        <p>To add a recipe click the button bellow</p>
        <Button
          onClick={() => navigate("/account/add-recipe")}
          value={"ADD RECIPE +"}
          style={{ padding: "1.4rem 1.8rem" }}
        />
      </div>
    </Section>
  );
};

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
