import { Add, Remove } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import ButtonBorder from "../../../../common/ButtonBorder";
import RemoveModal from "./RemoveModal";
import Loading from "../../../../common/Loading";

const CollectionCard = ({ favorite, addRecipeName }) => {
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        setShowRemoveModal(false);
    };

    return (
        <Card>
            {loading && (
                <>
                    <div className="transparent"></div>
                    <Loading margin={"0 0 110px 0"} />
                </>
            )}
            <img src={favorite.recipe?.image} alt="" />
            <div className="card__desc">
                <h4>{favorite?.recipeTitle}</h4>
                <ButtonBorder
                    value={
                        <span>
                            <Add /> Add to collection
                        </span>
                    }
                />
            </div>
            {!loading && (
                <Delete onClick={() => setShowRemoveModal(true)}>
                    <Remove />
                </Delete>
            )}
            {showRemoveModal && (
                <RemoveModal
                    remove={() => {
                        setLoading(true);
                        setShowRemoveModal(false);

                        setTimeout(() => {
                            setLoading(false);
                            addRecipeName(favorite?.recipeTitle);
                        }, Math.random() * 1200);
                    }}
                    // title={favorite.recipeTitle}
                    onClick={() => closeModal()}
                />
            )}
        </Card>
    );
};

const Card = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    min-height: 370px;
    position: relative;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);

    .transparent {
        position: absolute;
        background-color: rgba(245, 245, 245, 0.73);
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        button {
            /* margin-bottom: 1200px; */
            color: var(--main-color);
            text-decoration: none;
            padding: 0.4rem 0.9rem;
            border: none;
            /* padding: 16px 35px; */
            outline: 1px solid #ce4620;
            font-weight: bold;
            border-radius: 3px;
            display: block;
            text-align: center;
            align-items: center;
            font-size: 14px;
            margin-top: 12px;
            max-width: 170px;
            cursor: pointer;

            &:hover {
                background-color: #ce4620;
                color: white;
            }
        }
    }

    img {
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        /* height: 270px; */
    }

    .card__desc {
        padding: 1rem;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;

        h4 {
            text-align: start;
            color: var(--main-color);
            margin-bottom: 10px;
            margin-top: 5px;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
                text-decoration-color: var(--main-color);
                text-underline-offset: 5px;
                text-decoration-thickness: 10%;
            }
        }

        span {
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                color: var(--red-color);
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
    z-index: 10;

    svg {
        color: var(--red-color);
    }
`;
export default CollectionCard;
