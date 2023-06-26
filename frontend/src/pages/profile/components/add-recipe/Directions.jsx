import React, { useState } from 'react';
import styled from 'styled-components';
import DragableInput from '../../../../common/DraggableInput';
import { Add, Check, Close, SwapVert } from '@mui/icons-material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ButtonBorder from '../../../../common/ButtonBorder';

const FormDirections = ({ directionInputs, dispatch }) => {
  const [showReorder, setShowReorder] = useState(false);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      const indexOfActive = directionInputs.findIndex((input) => input.id === active.id);
      const indexOfOver = directionInputs.findIndex((input) => input.id === over.id);

      dispatch({ type: 'SORT_DIRECTIONS', indexOfActive, indexOfOver });
    }
  };

  const handleInputChange = (e) => {
    const { value, id } = e.target;
    dispatch({ type: 'CHANGE_VALUE', value, id });
  };

  return (
    <Section>
      <div className="description-wrap">
        <label>Directions</label>
        <p>
          Explain how to make your recipe, including oven temperatures, baking or cooking
          times, and pan sizes, etc. Use optional headers to organize the different parts
          of the recipe (i.e. Prep, Bake, Decorate).
        </p>
      </div>
      <div className="reorder-div">
        <p>Enter directions below</p>
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
          {directionInputs.map((direction, id) => (
            <div key={direction.id}>
              <p>Step {direction.id}</p>
              <div className="input-wrap">
                <textarea
                  cols="30"
                  rows="10"
                  id={direction.id}
                  placeholder={direction.placeholder}
                  value={direction.value}
                  onChange={(e) => handleInputChange(e, direction.id)}
                  required
                ></textarea>
                <Close onClick={() => dispatch({ type: 'REMOVE_DIRECTION', id })} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sortable-div">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={directionInputs}
              strategy={verticalListSortingStrategy}
            >
              {directionInputs.map((direction) => (
                <DragableInput
                  key={direction.id}
                  id={direction.id}
                  placeholder={direction.placeholder}
                  value={direction.value}
                  step={parseFloat(direction.id).toString()}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
      <ButtonBorder
        type="button"
        style={{
          width: '160px',
          height: '50px',
          letterSpacing: '1.2px',
        }}
        icon={<Add />}
        value={'ADD STEP'}
        onClick={() => dispatch({ type: 'ADD_DIRECTION' })}
      />
    </Section>
  );
};

const Section = styled.div`
  padding: 34px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  .description-wrap {
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
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      user-select: none;

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

    p {
      margin: 12px 0 6px 0;
      font-weight: 600;
    }

    .input-wrap {
      display: flex;
      align-items: center;
      height: 80px;

      textarea {
        font-size: 14px;
        padding: 10px;
        height: 100%;
        width: 100%;
      }

      svg {
        margin-left: 14px;
        font-size: 16px;
        color: var(--grey-color);
        outline: 2px solid var(--grey-color);
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
`;

export default FormDirections;
