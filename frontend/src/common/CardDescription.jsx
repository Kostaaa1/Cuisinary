import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SavedModal from "./SavedModal";
import {
    Star,
    StarHalf,
    StarRate,
    FavoriteBorder,
    Favorite,
} from "@material-ui/icons";
import AuthContext from "../setup/app-context-menager/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const CardDescription = ({ data }) => {
    const [favorite, setFavorite] = useState(false);
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipe, setRecipe] = useState();
    const { user } = useAuth0();

    useEffect(() => {
        setRecipeTitle(data.title);
        const newObj = { ...data };
        delete newObj.title;

        setRecipe(newObj);
        setFavorite(false);
    }, []);

    const addRecipeToFavorites = () => {
        setFavorite(true);

        fetch(`/api/auth/${user.email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipeTitle: recipeTitle,
                recipe: recipe,
            }),
        });
    };

    return (
        <div>
            <Card key={data.id}>
                <Link to={"/recipe/" + data.id}>
                    <img src={data.image} alt="" />
                    <div className="card__desc">
                        <h4>{data.title}</h4>
                        <div className="star__rating">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <StarHalf />
                            <span className="ratings">0 Ratings</span>
                        </div>
                    </div>
                </Link>
                <div className="favorite" onClick={addRecipeToFavorites}>
                    {favorite ? <Favorite /> : <FavoriteBorder />}
                </div>
            </Card>
            {favorite && <SavedModal />}
        </div>
    );
};

const Card = styled.div`
    background-color: white;
    border-radius: 4px;
    min-height: 350px;
    position: relative;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);

    img {
        width: 100%;
        height: 60%;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
    }

    a {
        text-decoration: none;
    }

    .favorite {
        position: absolute;
        top: 0;
        right: 10px;
        width: 50px;
        height: 50px;
        background-color: #ce4620;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        cursor: pointer;
        transform: scale(0.9);

        svg {
            color: white;
        }
    }

    .card__desc {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;

        h4 {
            text-align: start;
            color: #1f1f1f;
            margin-bottom: 10px;
            margin-top: 5px;
            font-size: 1.3rem;
        }

        .star__rating {
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                color: black;
                font-size: 14px;
                margin-left: 10px;
            }
            svg {
                font-size: 1.2rem;
                color: #ce4620;
            }
        }
    }

    &:hover {
        h4 {
            text-decoration: underline;
            text-decoration-color: #f27121;
            text-underline-offset: 5px;
            text-decoration-thickness: 8%;
        }
    }
`;

export default CardDescription;
