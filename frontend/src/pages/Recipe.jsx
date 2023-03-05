import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [active, setActive] = useState(true);
  const params = useParams();

  useEffect(() => {
    getDetails();
  }, [params.id]);

  const getDetails = async () => {
    try {
      const res = await fetch(`/api/recipe/${params.id}`);
      const data = await res.json();

      console.log(data);

      if (data.length !== 0) {
        setRecipe(data[0].data);
        setIngredients(data[0].data.extendedIngredients);
        setInstructions(data[0].data.analyzedInstructions[0].steps);
      } else {
        fetchDetails(params.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetails = async (id) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=f4eb30e350ef4261a02e333108f3ad33`
    );
    const infoData = await res.json();

    fetch("/api/recipe/createInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id, info: infoData }),
    });
    setRecipe(infoData);
    setIngredients(infoData.extendedIngredients);
    setInstructions(infoData.analyzedInstructions[0].steps);
  };

  return (
    <Wrapper>
      <div className="label">
        <h2> {recipe.title}: </h2>
        <img src={recipe.image} alt="" />
      </div>
      <Info>
        <div className="btn">
          <Button className={active ? "active" : ""} onClick={() => setActive(true)}>
            Ingredients
          </Button>
          <Button className={active ? "" : "active"} onClick={() => setActive(false)}>
            Instructions
          </Button>
        </div>
        <div className="info">
          {active && (
            <ul>
              {ingredients.map((x, id) => (
                <li key={id}> {x.original} </li>
              ))}
            </ul>
          )}

          {!active && (
            <ul>
              {instructions.map((x) => (
                <li key={x.id}> {x.step} </li>
              ))}
            </ul>
          )}
        </div>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 5.7rem;
  margin-bottom: 5rem;
  height: 620px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: url("https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?cs=srgb&dl=pexels-henry-%26-co-1939485.jpg&fm=jpg&_gl=1*l7q86q*_ga*NzExOTIwNTg2LjE2NjYxMDk2MTA.*_ga_8JE65Q40S6*MTY2NzQ4MDY2NC41LjEuMTY2NzQ4MDY5Ny4wLjAuMA..")
    no-repeat center center fixed;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 440px;
    height: 380px;
    object-fit: cover;
    border-radius: 20px;
    outline: 2px solid black;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  .btn {
    display: flex;
    margin-bottom: 55px;
  }

  .label {
    padding: 1rem;
  }

  h2 {
    margin-top: 1rem;
    margin-bottom: 3rem;
    width: 420px;
    text-decoration: underline;
    overflow-wrap: break-word;
  }

  span {
    margin-left: 5px;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  font-weight: 600;
  background: white;
  max-height: 100%;
  margin-right: 2rem;
  cursor: pointer;
  transition: all 0.3s 0s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Info = styled.div`
  position: relative;
  margin-left: 6rem;
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  // block-size: fit-content;
  justify-content: flex-start;
  flex-direction: column;
  width: 500px;
  max-height: 550px;

  .info {
    padding: 0 2rem;
    max-height: 500px;
    overflow: scroll;
    width: 100%;

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 20px;
    }

    li {
      font-size: 1.2rem;
      line-height: 2.5rem;
      list-style: square;
      color: #111;
      font-weight: 600;
    }
  }
`;

export default Recipe;
