import styled from 'styled-components';

const Button = ({ value, onClick, style, isLoading }) => {
  return (
    <Btn style={style} onClick={onClick} disabled={isLoading}>
      {value}
    </Btn>
  );
};

const Btn = styled.button`
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  display: block;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: var(--red-color);
  outline: 2px solid var(--red-color);
  transition: background-color 0.2s ease;
  letter-spacing: 1px;

  &:hover {
    background-color: #b64627;
  }

  &:active {
    outline: 2px solid var(--blue-color);
    border-radius: 3px;
    outline-offset: 1px;
  }
`;

export default Button;
