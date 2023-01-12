import styled from "styled-components";
import { SupervisorAccount } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import TransparentCard from "./TransparentCard";
import Button from "../../../../common/Button";
import Return from "../../../../common/Return";
import { useNavigate } from "react-router-dom";
import IndexesContext from "../../../../setup/app-context-menager/RecipeNameContext";
import { useFavorites } from "../../hooks/useFavorites";
import Loading from "../../../../common/Loading";
import { useLayoutData } from "../../hooks/useLayoutData";

const SavedItems = () => {
    const navigate = useNavigate();
    // const {
    //     data,
    //     isLoading,
    //     isSuccess,
    //     refetchOnLoad,
    //     length,
    //     isFetched,
    //     isFetching,
    // } = useFavorites();

    const { layoutData, setLayoutData, length } = useLayoutData();

    const { arrayOfRecipeNames, setArrayOfRecipeNames } =
        useContext(IndexesContext);

    const addRecipeName = async (id) => {
        const arr = [...arrayOfRecipeNames, id];
        setArrayOfRecipeNames(arr);
    };

    const removeRecipeName = async (id) => {
        const arr = arrayOfRecipeNames.filter((name) => name !== id);
        setArrayOfRecipeNames(arr);
    };

    return (
        <Saved>
            <Return
                value={"BACK TO ALL"}
                onClick={() => navigate("/account/profile/collections")}
            />
            {/* {isFetching ? (
                <Loading margin={"110px 0 0 0"} />
            ) : ( */}
            <>
                <div className="section-info">
                    <h1>All Saved Items</h1>
                    <h3>All your favorite content in one place!</h3>
                    <span>
                        <SupervisorAccount /> Other users see what you save
                    </span>
                </div>
                <div className="line-break"></div>

                {length === 0 && (
                    <section>
                        <h2>You haven't saved anything yet. Start browsing!</h2>
                        <p>
                            You can save items to your profile by clicking the
                            heart icon in the share bar.
                        </p>
                        <Button
                            value={"BACK HOME"}
                            onClick={() =>
                                navigate("/account/profile/collections")
                            }
                        />
                    </section>
                )}
                {length > 0 && <h3 className="length">{length} items</h3>}
                <div className="collection-control">
                    {layoutData?.map((favorite, id) =>
                        arrayOfRecipeNames.includes(favorite?.recipeTitle) ? (
                            <TransparentCard
                                key={id}
                                favorite={favorite}
                                removeRecipeName={removeRecipeName}
                            />
                        ) : (
                            <CollectionCard
                                key={id}
                                id={id}
                                favorite={favorite}
                                addRecipeName={addRecipeName}
                            />
                        )
                    )}
                </div>
            </>
            {/* )} */}
        </Saved>
    );
};

const Saved = styled.div`
    position: relative;
    h3 {
        font-size: 18px;
        font-weight: 400;
        line-height: 25px;
        margin: 20px;
    }

    section {
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

    .section-info {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        height: 200px;

        h1 {
            margin-top: 50px;
        }

        span {
            font-weight: 200;
            display: flex;
            align-items: center;
            font-size: 14px;

            svg {
                margin-right: 10px;
            }
        }
    }

    .length {
        font-weight: 500;
        margin: 20px 0;
        padding: 5px 10px;
    }

    .line-break {
        width: 100%;
        height: 1px;
        margin: 25px 0 30px 0;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .collection-control {
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
        row-gap: 40px;
        padding: 5px 20px;
    }
`;

export default SavedItems;
