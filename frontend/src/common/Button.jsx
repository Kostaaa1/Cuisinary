import styled from "styled-components";

const Button = ({ value, onClick }) => {
  return (
    <div>
      <Btn onClick={onClick}> {value} </Btn>
    </div>
  );
};

const Btn = styled.button`
  padding: 18px 35px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  display: block;
  border: none;
  font-size: 12px;
  border-radius: 5px;
  letter-spacing: 1.1px;
  background-color: #ce4620;

  &:active {
    outline: 2px solid #003e9b;
    border-radius: 5px;
    outline-offset: 1px;
    width: fit-content;
  }
`;

export default Button;
