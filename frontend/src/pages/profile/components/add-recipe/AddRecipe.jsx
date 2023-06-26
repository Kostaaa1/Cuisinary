import styled from 'styled-components';
import LineBreak from '../../../../common/LineBreak';
import { AddAPhoto } from '@mui/icons-material';
import Ingredients from './Ingredients';
import Directions from './Directions';
import { useState } from 'react';
import { useReducer } from 'react';
import Loading from '../../../../common/Loading';
import {
  ingredientReducer,
  directionReducer,
  initialIngredients,
  initialDirections,
} from './reducer';
import { useEffect } from 'react';
import PrepTime from './PrepTime';
import PublicRecipe from './PublicRecipe';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../../../setup/app-context-menager/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [prepTime, setPrepTime] = useState({ value: '', time: 'minutes' });
  const [cookTime, setCookTime] = useState({ value: '', time: 'minutes' });
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [ingredientInputs, dispatch] = useReducer(
    ingredientReducer,
    initialIngredients
  );
  const [directionInputs, dispatchDirections] = useReducer(
    directionReducer,
    initialDirections
  );
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState('');
  const [form, setForm] = useState({
    title: '',
    summary: '',
    extendedIngredients: [],
    directions: [],
    servings: '',
    pricePerServing: '',
    readyInMinutes: '',
    preparationMinutes: '',
    createdBy: userData?.nickname,
    createdByUserId: userData?._id,
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      extendedIngredients: ingredientInputs,
      directions: directionInputs,
      preparationMinutes: cookTime.value + ' ' + cookTime.time,
      readyInMinutes: prepTime.value + ' ' + prepTime.time,
    }));
  }, [ingredientInputs, directionInputs, cookTime, prepTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append('image', image);
      formData.append('form', JSON.stringify({ ...form, private: !isPublic }));

      await axios.post(
        `/api/user/${userData?.email}/addPersonalRecipe`,
        formData
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      navigate('/account/profile/recipes');
    }
  };

  return (
    <>
      <Wrapper>
        <div className="header">
          <div className="plus-shape"></div>
          <div className="h1-wrap">
            <h1>Add a Recipe</h1>
            <div className="underline"></div>
          </div>
        </div>
        <p>
          Uploading personal recipes is easy! Add yours to your favorites, share
          with friends, family, or the Cuisinary community.
        </p>
        <LineBreak className="line-break" />
        <Form onSubmit={handleSubmit}>
          <div className="form-header">
            <div className="wrapper">
              <div className="input-wrap">
                <label htmlFor="">Recipe Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="Give your recipe a title"
                  // required
                />
              </div>
              <div className="input-wrap">
                <label htmlFor="">Description</label>
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Description of the recipe"
                  name="summary"
                  value={form.summary}
                  onChange={handleInputChange}
                  // required
                ></textarea>
              </div>
            </div>
            <div className="form-file">
              <label htmlFor="input_file">
                Add an image
                {preview ? (
                  <img src={preview} className="addPhoto" alt="" />
                ) : (
                  <AddAPhoto />
                )}
              </label>
              <input
                className="file"
                id="input_file"
                type="file"
                // required
                accept="image/png, image/jpeg"
                onChange={handleImage}
              />
            </div>
          </div>
          <LineBreak className="line-break" />
          <Ingredients
            ingredientInputs={ingredientInputs}
            dispatch={dispatch}
          />
          <LineBreak className="line-break" />
          <Directions
            directionInputs={directionInputs}
            dispatch={dispatchDirections}
          />
          <LineBreak className="line-break" />
          <Servings>
            <div className="input-wrap">
              <label>Servings</label>
              <input
                type="number"
                placeholder="e.g. 8"
                name="servings"
                value={form.servings}
                onChange={handleInputChange}
                // required
              />
            </div>
            <div className="input-wrap">
              <label>Price per serving (Optional)</label>
              <input
                type="number"
                placeholder="e.g. 5$ per slice"
                name="pricePerServing"
                value={form.pricePerServing}
                onChange={handleInputChange}
              />
            </div>
          </Servings>
          <LineBreak className="line-break" />
          <PrepTime
            prepTime={prepTime}
            setPrepTime={setPrepTime}
            cookTime={cookTime}
            setCookTime={setCookTime}
          />
          <LineBreak className="line-break" />
          <PublicRecipe isPublic={isPublic} setIsPublic={setIsPublic} />
          <div className="buttons-div">
            <span onClick={() => setShowLeaveModal(true)}>CANCEL</span>
            {isSubmitting ? (
              <button className="btn-submit disabled">
                <Loading className="scaled-loading" />
              </button>
            ) : (
              <input
                type="submit"
                value={'Submit Recipe'}
                className={`btn-submit highlight`}
              />
            )}
          </div>
        </Form>
      </Wrapper>
      {showLeaveModal && (
        <showLeaveModal setShowLeaveModal={setShowLeaveModal} />
      )}
    </>
  );
};

const Servings = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .input-wrap {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    width: 45%;

    input {
      width: 100%;
      height: 46px;
      padding: 0 10px;
      font-size: 14px;
      margin-top: 8px;
    }
  }
`;

const Form = styled.form`
  .buttons-div {
    margin-top: 36px;
    display: flex;
    align-items: center;
    justify-content: end;

    .btn-submit {
      position: relative;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
      display: block;
      border: none;
      font-size: 14px;
      border-radius: 3px;
      width: 160px;
      height: 46px;
      letter-spacing: 1.1px;

      .scaled-loading {
        transform: scale(0.8) !important;
      }
    }

    .disabled {
      outline: 6px solid green;
      background-color: #d9d9d9;
      outline: 2px solid #d9d9d9;
    }

    .highlight {
      background-color: var(--red-color);
      outline: 2px solid var(--red-color);

      &:active {
        outline: 2px solid var(--blue-color);
        border-radius: 3px;
        outline-offset: 1px;
      }
    }

    span {
      cursor: pointer;
      font-size: 14px;
      margin-right: 14px;
      font-weight: 700;
      letter-spacing: 1.1spx;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 4px;
        text-decoration-thickness: 11%;
      }
    }
  }

  textarea {
    font-size: 14px;
    padding: 10px;
    height: 150px;
  }

  label {
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0;
  }

  .form-header {
    display: flex;
    justify-content: space-between;

    .form-file {
      width: 35%;

      label {
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &:focus,
        &:active {
          border: 3px solid var(--blue-color);
        }

        svg {
          border: 2px solid var(--red-color);
          border-radius: 50%;
          width: 140px;
          height: 140px;
          padding: 34px;
          color: var(--red-color);
          margin-top: 14px;
          margin-bottom: 10px;
          overflow: visible;
        }

        img {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          margin-top: 14px;
          margin-bottom: 10px;
          border: 2px solid var(--red-color);
        }
      }

      input {
        display: none;
      }
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 60%;

      .input-wrap {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        font-size: 16px;

        input {
          width: 100%;
          height: 46px;
          padding: 0 10px;
          font-size: 14px;
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 700px;
  max-width: 100%;
  margin: 0 auto;
  margin: 200px auto 100px auto;
  background-color: #f2f2f2;
  box-shadow: var(--card-shadow-border);
  padding: 40px;

  .line-break {
    margin: 46px 0;
  }

  p {
    font-size: 16px;
  }

  .header {
    display: flex;
    margin-bottom: 36px;

    .plus-shape {
      transform: scale(0.8);
      position: relative;
      width: 40px;
      height: 40px;
    }

    .plus-shape::before,
    .plus-shape::after {
      content: '';
      position: absolute;
      background-color: var(--red-color);
    }

    .plus-shape::before {
      height: 40px;
      width: 10px;
      right: 20px;
      transform: translate(50%);
    }

    .plus-shape::after {
      height: 10px;
      width: 40px;
      bottom: 20px;
      transform: translateY(50%);
    }

    .h1-wrap {
      position: relative;
      display: flex;
      width: max-content;

      h1 {
        position: relative;
        width: max-content;
        font-size: 34px;
        z-index: 1;
      }

      .underline {
        position: absolute;
        content: '';
        width: 100%;
        height: 20px;
        background-color: #e0af4c;
        bottom: -8px;
      }
    }
  }
`;

export default AddRecipe;
