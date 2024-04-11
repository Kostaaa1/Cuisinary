import styled from 'styled-components';

const Return = ({ value, onClick, icon }) => {
  return (
    <Back onClick={onClick}>
      {icon} <h6>{value}</h6>
    </Back>
  );
};

const Back = styled.button`
  background-color: #fff;
  display: flex;
  border: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: fit-content;
  top: 0;
  user-select: none;

  svg {
    color: var(--red-color);
    font-size: 1.4rem;
    margin-right: 4px;
  }

  h6 {
    letter-spacing: 1px !important;
    color: var(--main-color);

    @media screen and (max-width: 709px) {
      font-size: 12px !important;
    }
  }

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--red-color);
    text-underline-offset: 5px;
    text-decoration-thickness: 12%;
  }
`;

export default Return;
