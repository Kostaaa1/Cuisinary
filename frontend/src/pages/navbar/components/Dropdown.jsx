import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowDropDown } from '@mui/icons-material';
import { userLinkList } from '../navbar-constants';
import { useState } from 'react';
import UserStateComponent from '../../../common/UserStateComponent';
import { useAuth } from '../../../setup/auth/useAuth';

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { authenticated, logoutUser } = useAuth();

  return (
    <li
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <UserStateComponent />
      {authenticated && <ArrowDropDown />}
      {showDropdown && authenticated && (
        <LinksWrap>
          <ul>
            {userLinkList.map((item, id) => (
              <div key={item.list}>
                <NavLink to={`/account/${item.query}`}>
                  <div
                    className="li-control"
                    onClick={() =>
                      item.list === 'Log Out' ? logoutUser() : setShowDropdown(false)
                    }
                  >
                    <li>{item.list}</li>
                  </div>
                </NavLink>
                {id === 2 && <div className="line-break"></div>}
              </div>
            ))}
          </ul>
        </LinksWrap>
      )}
    </li>
  );
};

const LinksWrap = styled.div`
  position: absolute;
  width: 210px;
  background: white;
  top: 100%;
  left: 0;
  transform: translateX(-7%);
  flex-direction: column;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  z-index: 10;

  .line-break {
    width: 90%;
    margin: 10px auto;
    border: 1px solid rgba(0, 0, 0, 0.14);
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--main-color);
  width: 100%;

  .li-control {
    li {
      color: var(--main-color);
      margin: 26px 12px;
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: -0.6px;

      &:hover {
        color: rgba(0, 0, 0, 0.78);
      }
    }
  }
`;

export default Dropdown;
