import { Person, Star, StarBorder } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../../../common/Loading';
import NavigationWrap from './UserNavigationWrap';
import { useLayoutData } from '../../hooks/useLayoutData';
import FavoriteCollection from '../collections/FavoriteCollection';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useSmoothScroll from '../../../../utils/useSmoothScroll';
import { useMemo } from 'react';
import axios from 'axios';
import HorizontalCard from '../../../../common/HorizontalCard';

const UserInfo = () => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { setCollections, layoutArr } = useLayoutData();
  const [activeIndex, setActiveIndex] = useState(0);
  const h3Refs = [useRef(null), useRef(null), useRef(null)];
  const params = useParams();
  const queryClient = useQueryClient();
  const [currentHeader, setCurrentHeader] = useState('Collections');
  useSmoothScroll();

  const fetchUserData = async () => {
    const res = await axios.get(`/api/auth/${params.profileId}/getUserId`);
    const data = await res.data;
    console.log(data);

    setCollections(data.collections);
    return data;
  };

  const { data: currentUser = {} } = useQuery(['user-info'], fetchUserData, {
    refetchOnMount: 'always',
  });

  const url = window.location.href.slice(21);
  const navigationLinks = [
    { url: '/', content: 'Home' },
    {
      url: '/account/profile/collection',
      content: 'Saved Items & Collections',
    },
    { url: `/profile/${currentUser?._id}`, content: currentUser?.nickname },
  ];

  const pageData = useMemo(() => {
    if (Object.entries(currentUser).length === 0) return;
    const { collections, reviews, personalRecipes } = currentUser;

    switch (activeIndex) {
      case 0:
        setCurrentHeader('Collections');
        return collections?.filter((collection) => !collection.private);
      case 1:
        setCurrentHeader('Recipes');
        return personalRecipes?.filter((recipe) => !recipe.private);
      case 2:
        setCurrentHeader('Reviews');
        return reviews || [];
      default:
        return [];
    }
  }, [currentUser, activeIndex]);

  useEffect(() => {
    return () => {
      queryClient.setQueryData(['user-info'], {});
    };
  }, [queryClient]);

  return (
    <Section>
      {Object.keys(currentUser).length === 0 && !isImageLoaded ? (
        <Loading className="loading" />
      ) : (
        <>
          <ProfileWrap>
            {currentUser?.picture?.image && (
              <img
                src={currentUser.picture.image}
                onLoad={() => setIsImageLoaded(true)}
                alt="avatar"
              />
            )}
            {!currentUser.picture?.image && <Person className="profile-svg" />}
            <div className="profile-info">
              <NavigationWrap links={navigationLinks} />
              <h1>{currentUser?.nickname}</h1>
              <p>{currentUser?.tagline} </p>
            </div>
          </ProfileWrap>
          <ProfileContent>
            <div className="saved">
              <div className="saved-wrapper">
                <h5
                  onClick={() => setActiveIndex(0)}
                  ref={h3Refs[0]}
                  className={activeIndex === 0 ? 'selected' : ''}
                >
                  SAVED ITEMS & COLLECTIONS
                </h5>
                <h5
                  onClick={() => setActiveIndex(1)}
                  ref={h3Refs[1]}
                  className={activeIndex === 1 ? 'selected' : ''}
                >
                  PERSONAL RECIPES
                </h5>
                <h5
                  onClick={() => setActiveIndex(2)}
                  ref={h3Refs[2]}
                  className={activeIndex === 2 ? 'selected' : ''}
                >
                  REVIEWS
                </h5>
              </div>
              <div className="collection-flex">
                <h3>
                  {pageData?.length} {currentHeader}
                </h3>
                {pageData?.length > 0 && (
                  <div className="collection-wrap">
                    {activeIndex === 0 &&
                      currentHeader === 'Collections' &&
                      pageData.map((collection, id) => (
                        <FavoriteCollection
                          key={collection._id}
                          collection={collection}
                          layoutArr={layoutArr[id]}
                          onClick={() => {
                            navigate(
                              collection.collName === 'All Saved Items'
                                ? `${url}/collection/all-saved-items`
                                : `${url}/collection/${collection._id}`
                            );
                          }}
                        />
                      ))}
                    {activeIndex === 1 &&
                      currentHeader === 'Recipes' &&
                      pageData.map((recipe) => (
                        <Card key={recipe._id}>
                          <Link to={`/account/${currentUser._id}/recipe/${recipe._id}`}>
                            <img src={recipe?.picture?.image} alt="" />
                            <div className="card-content">
                              <p>{recipe.private ? 'PRIVATE' : 'PUBLIC'}</p>
                              <h3> {recipe.title} </h3>
                            </div>
                          </Link>
                        </Card>
                      ))}
                    {activeIndex === 2 &&
                      currentHeader === 'Reviews' &&
                      pageData.map((review, id) => (
                        <div key={review._id} className="reviews-control">
                          <HorizontalCard
                            cardData={review}
                            readMore={true}
                            isRecipe={true}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </ProfileContent>
        </>
      )}
      
    </Section>
  );
};

const Card = styled.div`
  position: relative;
  width: 280px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--card-shadow-border);

  img {
    width: 100%;
    height: 280px;
  }

  .card-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 120px;

    .summary {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 14px;
      font-weight: 400 !important;
    }

    h3 {
      text-align: start;
      cursor: pointer;
      padding-bottom: 42px;

      &:hover {
        text-decoration: underline;
        color: var(--main-color);
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }

    p {
      font-weight: 600;
      letter-spacing: 1.4px;
      font-size: 12px;
      color: var(--grey-color);
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 20%;
      }
    }
  }
`;

const ProfileWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;

  img {
    width: 350px;
    height: 350px;
  }

  @media (max-width: 910px) {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .profile-info {
    position: relative;
    right: 18px;
    top: -50px;
    width: 100%;
    background-color: #fff;
    max-width: 100%;
    word-break: break-all;
    box-shadow: 0 0.12rem 0.375rem rgb(0 0 0 / 32%);
    border-left: 5px solid #46c5b5;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 24px 28px;

    & > h1 {
      font-size: 2.2rem;
      margin: 12px 0;
    }

    @media screen and (max-width: 910px) {
      top: 0;
      right: 0;
      margin: 0 auto;
      width: 640px;
    }
  }

  .profile-svg {
    color: white;
    background-color: var(--red-color);
    width: 320px;
    height: 320px;
    pointer-events: none;
  }
`;

const ProfileContent = styled.div`
  margin: 18px 0;

  .saved {
    width: 910px;
    max-width: 100%;

    @media (max-width: 910px) {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 640px;
      margin: 0 auto;
    }

    .saved-wrapper {
      display: flex;
      width: 100%;
      margin: 50px 0 12px 0;

      h5 {
        width: max-content;
        line-height: 30px;
        color: var(--grey-color);
        cursor: pointer;
        font-weight: 800;
        font-size: 14px;
        padding: 0 16px;
        flex-wrap: nowrap;

        &:hover {
          color: var(--main-color);
          border-bottom: 3px solid var(--red-color);
        }
      }
    }

    .selected {
      color: var(--grey-color) !important;
      border-bottom: 3px solid var(--red-color);
      color: black;
    }

    .reviews-control {
      width: 100%;
    }

    .collection-flex {
      .reviews {
        display: flex;
        align-items: center;
        border: 1px solid var(--grey-hover-color);
        height: 100%;

        img {
          height: 160px;
          width: 320px;
        }

        .control-flex {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 28px;
          width: 100%;
          height: 84px;

          .stars-wrap {
            display: flex;
            align-items: center;

            span {
              font-weight: 400;
              color: var(--grey-color);
            }
          }

          .bordered {
            color: var(--grey-color) !important;
          }

          h2 {
            cursor: pointer;
            width: fit-content;
            color: var(--grey-color);
            font-size: 22px;

            &:hover {
              color: var(--main-color);
              text-decoration: underline;
              text-decoration-color: var(--main-color);
              text-underline-offset: 5px;
              text-decoration-thickness: 8%;
            }
          }
        }

        p {
          font-size: 14px;
        }

        svg {
          color: var(--red-color);
        }
      }

      & > h3 {
        font-size: 18px !important;
        margin: 50px 0 30px 0;
      }

      .collection-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        row-gap: 30px;
      }
    }
  }
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  margin: 200px auto;
  max-width: 100%;
  width: 1240px;

  .loading {
    transform: translate(0, -420px);
  }

  @media (max-width: 1270px) {
    padding: 0 36px;
  }
`;

export default UserInfo;
