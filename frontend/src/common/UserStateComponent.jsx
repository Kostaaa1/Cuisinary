import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../setup/auth/useAuth';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const UserIconComponent = () => {
  const { authenticated } = useAuth();
  const { loginWithPopup } = useAuth0();

  return (
    <User onClick={() => !authenticated && loginWithPopup()}>
      <FaUserCircle />
      {authenticated ? 'My Account' : 'Log In'}
    </User>
  );
};

const User = styled.span`
  display: flex;
  align-items: center;
  color: var(--main-color);
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;

  @media screen and (max-width: 729px) {
    font-size: 12px;
  }

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--red-color);
    text-underline-offset: 5px;
    text-decoration-thickness: 10%;
  }

  svg {
    margin-right: 7px;
    color: var(--red-color);
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
  }
`;

export default UserIconComponent;
