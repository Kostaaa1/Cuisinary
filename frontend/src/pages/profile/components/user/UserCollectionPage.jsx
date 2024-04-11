import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ButtonHover from '../../../../common/ButtonHover';
import { ArrowBack } from '@mui/icons-material';
import NavigationWrap from './UserNavigationWrap';
import Loading from '../../../../common/Loading';
import useSmoothScroll from '../../../../utils/useSmoothScroll';
import { useQuery } from '@tanstack/react-query';
import LineBreak from '../../../../common/LineBreak';
import axios from 'axios';
import StarRating from '../../../../common/StarRating';
import Summary from '../../../recipe/components/Summary';

const CollectionPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [collectionData, setCollectionData] = useState();
  useSmoothScroll();

  const fetchUserData = async () => {
    const res = await axios.get(`/api/auth/${params.profileId}/getUserId`);
    const data = res.data;
    return data;
  };

  const { data: currentUser = {} } = useQuery(['current-userData'], fetchUserData, {
    enabled: !!params.profileId,
    refetchOnMount: 'always',
  });

  const navigationLinks = [
    { url: '/', content: 'Home' },
    {
      url: '/account/profile/collection',
      content: 'Saved Items & Collections',
    },
    {
      url: `/profile/${currentUser?._id}`,
      content: `${currentUser?.nickname}`,
    },
  ];

  useEffect(() => {
    if (params.collectionId === 'all-saved-items' && !!currentUser) {
      setCollectionData(currentUser.collections?.[0]);
    } else {
      setCollectionData(
        currentUser.collections?.filter((col) => col._id === params.collectionId)[0]
      );
    }
  }, [currentUser]);

  return (
    <Page>
      {collectionData && currentUser ? (
        <>
          <ButtonHover
            value={'BACK TO PROFILE'}
            icon={<ArrowBack />}
            onClick={() => navigate(`/profile/${currentUser?._id}`)}
          />
          <NavigationWrap links={navigationLinks} style={{ margin: '40px 0 10px 0' }} />
          <div className="flex-wrap">
            <h1> {collectionData?.collName}</h1>
            <p>
              {collectionData.collDesc
                ? collectionData.collDesc
                : `All ${currentUser?.nickname}'s favorites in one place`}{' '}
            </p>
            <CustomLink to={`/profile/${currentUser?._id}`}>
              Collection by <span> {currentUser?.nickname} </span>
            </CustomLink>
          </div>
          <p>{collectionData.collRecipes?.length} items</p>
          <div className="collection-card">
            <LineBreak className="line-break" />
            {collectionData.collRecipes?.map((recipe) => (
              <Link key={recipe._id} to={'/recipe/' + recipe.id}>
                {/* <Card>
                  <img src={recipe?.data.image} />
                  <div className="card-desc">
                    <h3>{recipe?.recipeTitle}</h3>
                    <StarRating averageRate={recipe?.averageRate} />
                    <Summary recipe={recipe.data} smallTextSize={true} />
                  </div>
                </Card> */}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </Page>
  );
};

const Card = styled.div`
  background-color: #fff;
  height: 440px;
  width: 280px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;

  .card-desc {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    outline: 1px solid black;

    h3 {
      cursor: pointer;
      width: fit-content;
      word-break: break-all;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 5px;
        text-decoration-thickness: 12%;
      }
    }
  }

  img {
    object-fit: fill;
    height: 100%;
  }
`;

const Page = styled.div`
  position: relative;
  margin: 200px auto;
  height: 100%;
  max-width: 100%;
  width: 1240px;

  @media (max-width: 1270px) {
    padding: 0 22px;
  }

  @media (max-width: 910px) {
    width: 640px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  h1 {
    padding: 30px 0 22px 0;
    font-size: 3rem;
  }

  span {
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      text-decoration-color: var(--red-color);
      text-underline-offset: 5px;
      text-decoration-thickness: 12%;
    }
  }

  .flex-wrap {
    margin-bottom: 40px;
  }

  .flex-wrap > p {
    font-weight: 500;
    margin: 20px 0;
  }

  .flex-wrap > h1 {
    font-size: 38px !important;
  }

  .collection-card {
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    width: 75%;
    row-gap: 40px;

    .line-break {
      margin: 22px 0;
    }

    @media (max-width: 910px) {
      width: 100%;
    }
  }
`;

const CustomLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 0.9rem;
`;

export default CollectionPage;
