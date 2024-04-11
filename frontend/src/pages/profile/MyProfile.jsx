import React, { useEffect, useContext, useState, useCallback, useMemo } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import List from '../../pages/profile/components/List';
import ProfileGreet from './components/ProfileGreet';
import { useUser } from '../../setup/auth/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../../common/Loading';
import { useWindowSize } from '../../utils/useWindowSize';
import { ArrowBack } from '@mui/icons-material';
import ButtonHover from '../../common/ButtonHover';
import useSmoothScroll from '../../utils/useSmoothScroll';

const MyProfile = ({ listContent, staticList }) => {
  const params = useParams();
  const location = useLocation();
  const { user } = useAuth0();
  const { getUserData } = useUser();
  const windowSize = useWindowSize();
  const [showResponsiveList, setShowResponsiveList] = useState(false);
  const navigate = useNavigate();
  useSmoothScroll();

  const queryClient = useQueryClient();
  const contextUser = queryClient.getQueryData(['context-user']);

  useEffect(() => {
    console.log('This is context user from myprofile', contextUser);
  }, [contextUser]);

  let refetchOnMount = 'always';
  const path = location.pathname;
  const prefixPath = '/account/profile';

  if (
    path === prefixPath + '' ||
    path === prefixPath + '/public-profile' ||
    path === prefixPath + '/change-password'
  ) {
    refetchOnMount = false;
  }

  const { data: userData, isRefetching } = useQuery(
    ['user-data', user?.email],
    getUserData,
    {
      enabled: !!user,
      refetchOnMount,
    }
  );

  useEffect(() => {
    if (showResponsiveList && windowSize[0] > 1030) {
      setShowResponsiveList(false);
    }
  }, [windowSize]);

  const renderListItem = (list) => {
    let url = `/${Object.entries(params)
      .map((x) => x[1])
      .join('/')}`;
    url = url === '/' ? '' : url;
    const isSelected = list.selected && list.route === url;

    if (isSelected) {
      const Component = staticList[list.component];
      if (userData && !isRefetching) {
        return (
          <Component key={list.id} userData={userData} isRefetching={isRefetching} />
        );
      } else {
        return <Loading key={list.id} className="loading" scaled={true} />;
      }
    }
  };

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
                    <List className={list.selected ? 'selected' : ''} list={list} />
                  </div>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <Container>
          {windowSize[0] <= 1030 ? (
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
                        <List className={list.selected ? 'selected' : ''} list={list} />
                      </CustomLink>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {!showResponsiveList && (
            <div className="components">{listContent.map(renderListItem)}</div>
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
  margin-bottom: 50px;

  .list-item {
    text-decoration: none;
    color: var(--main-color);

    &:last-child {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  .line-break {
    margin: 30px 0;
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

    @media screen and (max-width: 1030px) {
      padding-left: 36px;
      padding-right: 36px;
    }

    .h4-div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 22px 0;

      h4 {
        font-size: 16px;
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  width: 1240px;
  max-width: 100%;
  margin: 0 auto;
  padding: 180px 0 0 0;
  /* padding: 200px 0 0 0; */

  @media screen and (max-width: 1270px) {
    padding-left: 36px;
    padding-right: 36px;
  }

  @media screen and (max-width: 729px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (max-width: 1030px) {
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

    @media screen and (max-width: 729px) {
      padding: 0 24px;
      height: 46px;

      button > h6 {
        font-size: 12px !important;
      }
    }

    &:active {
      outline: 2px solid var(--blue-color);
      border-radius: 3px;
      outline-offset: 1px;
    }
  }

  .profile {
    max-width: 260px;
    min-width: 260px;
    height: 100%;
    margin-right: 36px;
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
    padding: 8px 0;
    min-height: 200px;

    .loading {
      transform: translate(0, -40%);
    }
  }
`;

export default MyProfile;
