import React, { useEffect, useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import List from '../../pages/profile/components/List';
import GlobalContext from '../../setup/app-context-menager/GlobalContext';
import axios from 'axios';
import ProfileGreet from './components/ProfileGreet';
import { useUser } from '../../setup/auth/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../../common/Loading';
import { useWindowSize } from '../../utils/useWindowSize';
import { ArrowBack } from '@mui/icons-material';
import ButtonHover from '../../common/ButtonHover';
import useSmoothScroll from '../../utils/useSmoothScroll';

const MyProfile = ({ listContent, staticList, setLists }) => {
  const params = useParams();
  const location = useLocation();
  const { user } = useAuth0();
  const { getUserData } = useUser();
  const windowSize = useWindowSize();
  const [showResponsiveList, setShowResponsiveList] = useState(false);
  const navigate = useNavigate();
  useSmoothScroll();

  const {
    arrayOfRecipeNames,
    setArrayOfRecipeNames,
    collectionId,
    collectionParams,
  } = useContext(GlobalContext);

  // forcing refetches based on the URL. Trying to reduce the repeating of the code, i do not know if this is a good practice. It works tho.
  let refetchOnMount = 'always';
  const path = location.pathname;
  const prefixPath = '/account/profile';

  if (
    path === prefixPath + '/' ||
    path === prefixPath + '/public-profile' ||
    path === prefixPath + '/change-password'
  ) {
    refetchOnMount = false;
  }

  const {
    data: userData,
    isRefetching,
    isLoading,
  } = useQuery(['user-data', user?.email], getUserData, {
    enabled: !!user,
    refetchOnMount,
    // refetchOnMount:
    //   location.pathname !== '/account/profile/change-password' && 'always',
  });

  useEffect(() => {
    if (
      arrayOfRecipeNames.length !== 0 &&
      location.pathname !== '/account/profile/saved-items'
    ) {
      handleDeletionOfRecipes();
      setArrayOfRecipeNames([]);
    }
  }, [location.pathname]);

  const handleDeletionOfRecipes = async () => {
    const recipeNames = {
      titles: arrayOfRecipeNames,
      collectionId: collectionParams === 'saved-items' ? '' : collectionId,
    };
    await axios.post(`/api/auth/${userData?.email}/deleteFavs`, recipeNames);
  };

  useEffect(() => {
    if (showResponsiveList && windowSize[0] > 1120) {
      setShowResponsiveList(false);
    }
  }, [windowSize]);

  useEffect(() => {
    if (params.id) {
      const comp = {
        id: listContent.length,
        component: 'SavedItems',
        route: `/collection/${params.id}`,
        selected: true,
      };

      const isRoutePresent = listContent.some(
        (list) => list.route === comp.route
      );

      if (!isRoutePresent) {
        setLists([...listContent, comp]);
      }
    }
  });

  return (
    <Wrapper>
      {showResponsiveList ? (
        <div className="profile-responsive-list">
          <ProfileGreet />
          <div className="profile-info">
            <ul>
              {listContent
                .filter((list) => list.text && list)
                .map((list, id) => (
                  <div
                    className="navigation-list"
                    onClick={() => {
                      setShowResponsiveList(false),
                        navigate('/account/profile' + list.route);
                    }}
                    key={id}
                  >
                    <List
                      className={list.selected ? 'selected' : ''}
                      list={list}
                    />
                  </div>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <Container>
          {windowSize[0] <= 1120 ? (
            <div
              onClick={() => setShowResponsiveList(true)}
              className="myprofile-responsive-button"
            >
              <ButtonHover value={'MY PROFILE'} icon={<ArrowBack />} />
            </div>
          ) : (
            <div className="profile">
              <ProfileGreet />
              <div className="profile-info">
                <ul>
                  {listContent
                    .filter((list) => list.text && list)
                    .map((list, id) => (
                      <CustomLink to={'/account/profile' + list.route} key={id}>
                        <List
                          className={list.selected ? 'selected' : ''}
                          list={list}
                        />
                      </CustomLink>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {!showResponsiveList && (
            <div className="components">
              {listContent.map((list) => {
                const url = `/${Object.entries(params)
                  .map((x) => x[1])
                  .join('/')}`;

                const isSelected = list.selected && list.route === url;

                const isDefaultRoute =
                  Object.keys(params).length === 0 && list.route === '/';

                if (isSelected || isDefaultRoute) {
                  const Component = staticList[list.component];

                  if (!isRefetching && !isLoading) {
                    return (
                      <Component
                        key={list.id}
                        userData={userData}
                        isRefetching={isRefetching}
                      />
                    );
                  } else {
                    return (
                      <Loading
                        key={list.id}
                        className="loading"
                        scaled={true}
                      />
                    );
                  }
                }

                return null;
              })}
            </div>
          )}
        </Container>
      )}
    </Wrapper>
  );
};

const CustomLink = styled(NavLink)`
  text-decoration: none;
  color: var(--main-color);

  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const Wrapper = styled.section`
  position: relative;

  .list-item {
    text-decoration: none;
    color: var(--main-color);

    &:last-child {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  .line-break {
    margin: 32px 0;
  }

  .selected {
    border-left: 3px solid var(--red-color);
    font-weight: bold;
    color: var(--red-color);
  }

  .profile-responsive-list {
    height: 100%;
    background-color: #fff;
    max-width: 100%;
    margin: 0 auto;
    margin-right: 14px;
    padding: 80px 0 60px 0;
    width: 100%;

    @media screen and (max-width: 1120px) {
      padding-left: 36px;
      padding-right: 36px;
    }

    .h4-div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 22px 0;
      outline: 1px solid black;

      h4 {
        font-size: 16px;
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  width: 1240px;
  max-width: 100%;
  margin: 0 auto;
  padding: 200px 0 0 0;

  @media screen and (max-width: 1270px) {
    padding-left: 36px;
    padding-right: 36px;
  }

  @media (max-width: 1120px) {
    /* margin-top: -70px; */
    padding-top: 140px;
  }

  .myprofile-responsive-button {
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 64px;
    padding: 0 60px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    z-index: 2;
    outline: 2px solid var(--main-color);
    cursor: pointer;

    &:active {
      outline: 2px solid var(--blue-color);
      border-radius: 3px;
      outline-offset: 1px;
    }
  }

  .profile {
    min-width: 260px;
    height: 100%;
    margin-right: 14px;
    background-color: #fff;
  }

  .profile-info {
    padding-top: 12px;

    .navigation-list {
      &:last-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    }

    ul {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
    }
  }

  .components {
    position: relative;
    background-color: #fff;
    width: 100%;
    word-break: break-all;
    padding: 8px 24px;
    min-height: 200px;
    margin-bottom: 100px;

    .loading {
      transform: translate(0, -30%);
    }
  }
`;

export default MyProfile;
