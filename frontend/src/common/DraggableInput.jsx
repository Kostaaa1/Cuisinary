import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { DragIndicator } from '@mui/icons-material';
import { useEffect } from 'react';

const DragableInput = ({ id, value, placeholder, step }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  useEffect(() => {
    console.log(id, value, placeholder, step);
  }, [id, value, placeholder, step]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DragInput ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {step && <p className="step-class"> Step {step} </p>}
      <div className="holder-wrap">
        <input
          className="input"
          disabled
          readOnly
          value={value === '' ? placeholder : value}
          type="text"
        />
        {/* <p className="input">{value === '' ? placeholder : value}</p> */}
        <DragIndicator />
      </div>
    </DragInput>
  );
};

const DragInput = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 46px;
  margin: 12px 0;

  p:not(.text) {
    padding: 14px 0 6px 0;
  }

  .step-class {
    font-weight: 600;
  }

  .holder-wrap {
    display: flex;
    align-items: center;
    height: 100%;

    .input {
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0);
      width: 100%;
      padding: 0 10px;
      background-color: #f2f2f2;
      font-size: 14px;

      &:active,
      &:focus {
        border: none;
        outline: none;
      }
    }

    svg {
      margin-left: 14px;
      vertical-align: middle;
      color: var(--grey-color);
      outline: 2px solid var(--grey-color);
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

export default DragableInput;
