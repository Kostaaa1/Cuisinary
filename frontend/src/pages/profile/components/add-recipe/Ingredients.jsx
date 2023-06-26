import styled from 'styled-components';
import DragableInput from '../../../../common/DraggableInput';
import { Add, Check, Close, SwapVert } from '@mui/icons-material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import ButtonBorder from '../../../../common/ButtonBorder';
import { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const Ingredients = ({ ingredientInputs, dispatch }) => {
  const [showReorder, setShowReorder] = useState(false);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      const indexOfActive = ingredientInputs.findIndex((input) => input.id === active.id);
      const indexOfOver = ingredientInputs.findIndex((input) => input.id === over.id);

      dispatch({ type: 'SORT_INGREDIENTS', indexOfActive, indexOfOver });
    }
  };

  const handleInputChange = (e, id) => {
    dispatch({ type: 'CHANGE_VALUE', value: e.target.value, id });
  };

  return (
    <Section>
      <div className="ingredients-wrap">
        <label>Ingredients</label>
        <p>
          Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and
          any special preparation (i.e. sifted, softened, chopped). Use optional headers
          to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).
        </p>
      </div>
      <div className="reorder-div">
        <p>Enter ingredients below</p>
        {!showReorder ? (
          <span onClick={() => setShowReorder(true)}>
            <SwapVert />
            REORDER
          </span>
        ) : (
          <span onClick={() => setShowReorder(false)}>
            <Check />
            DONE
          </span>
        )}
      </div>
      {!showReorder ? (
        <div className="inputs-div">
          {ingredientInputs.map((ingredient, id) => (
            <div className="input-wrap" key={ingredient.id}>
              <input
                type="text"
                placeholder={ingredient.placeholder}
                value={ingredient.value}
                required
                onChange={(e) => handleInputChange(e, ingredient.id)}
              />
              <Close
                onClick={() =>
                  dispatch({
                    type: 'REMOVE_INGREDIENT',
                    id,
                  })
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="sortable-div">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={ingredientInputs}
              strategy={verticalListSortingStrategy}
            >
              {ingredientInputs.map((ingredient) => (
                <DragableInput
                  key={ingredient.id}
                  id={ingredient.id}
                  value={ingredient.value}
                  placeholder={ingredient.placeholder}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
      <ButtonBorder
        style={{ width: '160px', height: '50px', letterSpacing: '1.2px' }}
        icon={<Add />}
        value={'ADD INGREDIENT'}
        onClick={() => dispatch({ type: 'ADD_INGREDIENT' })}
      />
    </Section>
  );
};

const Section = styled.div`
  padding: 34px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  .ingredients-wrap {
    p {
      line-height: 1.6;
      margin: 12px 0;
    }
  }

  .reorder-div {
    margin: 18px 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 14px;
      color: var(--grey-color);
    }

    span {
      user-select: none;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;

      svg {
        vertical-align: middle;
        margin-right: 6px;
      }

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 4px;
        text-decoration-thickness: 11%;
      }
    }
  }

  .sortable-div {
    margin: 26px 0 36px 0;
  }

  .inputs-div {
    margin: 26px 0 36px 0;

    .input-wrap {
      display: flex;
      align-items: center;
      height: 46px;
      margin: 12px 0;

      input {
        font-size: 14px;
        padding: 0 10px;
        height: 100%;
        width: 100%;
      }

      svg {
        margin-left: 14px;
        padding: 2px;
        color: var(--grey-color);
        outline: 2px solid var(--grey-color);
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
`;

export default Ingredients;
