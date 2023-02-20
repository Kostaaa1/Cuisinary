import styled from "styled-components";
import { SupervisorAccount } from "@material-ui/icons";
import Button from "../../../common/Button";
import SectionInfo from "../../../common/SectionInfo";

const ChangeProfile = () => {
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
                <Button value={"ADD RECIPE +"} />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 20px;

    .recipe__add {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        h2 {
            color: var(--grey-color);
        }

        p {
            margin: 20px 0 30px 0;
        }
    }

    h1 {
        font-weight: bold;
        margin-bottom: 30px;
        font-size: 2.4rem;
    }

    .line__break {
        width: 100%;
        height: 1px;
        margin: 40px 0;
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

export default ChangeProfile;
