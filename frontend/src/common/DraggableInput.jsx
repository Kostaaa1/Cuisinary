import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { DragIndicator } from "@mui/icons-material";

const DragableInput = ({ id, placeholder, step }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DragInput ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {step && <p className="step-class"> Step {step} </p>}
      <div className="holder-wrap">
        <p className="text">{placeholder}</p>
        <DragIndicator />
      </div>
    </DragInput>
  );
};

const DragInput = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0 0 10px;
  height: 50px;
  margin: 12px 0;

  p:not(.text) {
    padding: 14px 0 6px 0;
  }
  .step-class {
    font-weight: 600;
  }
  /* .inputs-div {
    .input-wrap {
      display: flex;
      align-items: center;
      height: 50px;
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
  } */

  .holder-wrap {
    display: flex;
    align-items: center;

    .text {
      font-size: 14px;
      height: 100%;
      width: 100%;
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
