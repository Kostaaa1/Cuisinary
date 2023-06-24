import React, { useContext } from 'react';
import Search from './Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../../setup/auth/useAuth';
import { userLinkList } from '../navbar-constants';
import { categoryData } from '../navbar-constants';
import AuthContext from '../../../setup/app-context-menager/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';
import UserIconComponent from '../../../common/UserStateComponent';
import LineBreak from '../../../common/LineBreak';

const SideNavbar = ({
  clickedCategory,
  setClickedCategory,
  showSideNav,
  showSearched,
  setShowSideNav,
}) => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);
  const { authenticated } = useAuth();
  const { loginWithPopup } = useAuth0();

  const categoryNavigation = query => {
    if (!query) {
      logoutUser();
      return;
    }

    const toUrl =
      clickedCategory.name === 'My Profile' ? 'account' : 'category';
    navigate(`/${toUrl}/${query}`);
    setClickedCategory('');
    setShowSideNav(false);
  };

  return (
    <>
      {clickedCategory === '' ? (
        <div className="sidenav-wrapper">
          <div className="category-wrap">
            <Search
              showSideNav={showSideNav}
              showSearched={showSearched}
              setShowSideNav={setShowSideNav}
              style={{
                alignItems: 'start',
                flexDirection: 'column',
                height: '80px',
              }}
            />
            <ul>
              {categoryData.map((category, id) => (
                <li key={id} onClick={() => setClickedCategory(category)}>
                  {category.name}
                  <ArrowForwardIosIcon />
                </li>
              ))}
            </ul>
          </div>
          <ul>
            <li
              onClick={() =>
                setClickedCategory({
                  name: 'My Profile',
                  categories: userLinkList,
                })
              }
            >
              <UserIconComponent />
              <ArrowForwardIosIcon />
            </li>
          </ul>
        </div>
      ) : (
        <div className="category-wrap">
          <span>
            <ArrowBack onClick={() => setClickedCategory('')} />
            <h2>
              {clickedCategory.name[0] +
                clickedCategory.name
                  .slice(1, clickedCategory.name.length)
                  .toLowerCase()}
            </h2>
          </span>
          <ul>
            {clickedCategory.categories.map((category, id) => (
              <>
                <li
                  key={category.list}
                  onClick={() => categoryNavigation(category.query)}
                >
                  {category.list}
                </li>
              </>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SideNavbar;
