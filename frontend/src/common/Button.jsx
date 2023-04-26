import styled from "styled-components";

const Button = ({ value, onClick, style }) => {
  return (
    <Btn style={style} onClick={onClick}>
      {value}
    </Btn>
  );
};

const Btn = styled.button`
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  display: block;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  letter-spacing: 1.1px;
  background-color: var(--red-color);
  outline: 2px solid var(--red-color);

  &:active {
    outline: 2px solid var(--blue-color);
    border-radius: 3px;
    outline-offset: 1px;
  }
`;

export default Button;
