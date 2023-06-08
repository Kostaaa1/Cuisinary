import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ButtonHover from "../../../../common/ButtonHover";
import { ArrowBack } from "@mui/icons-material";
import NavigationWrap from "../../../../common/NavigationWrap";
import Loading from "../../../../common/Loading";
import useSmoothScroll from "../../../../utils/useSmoothScroll";
import { useUser } from "../../../../setup/auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import LineBreak from "../../../../common/LineBreak";

const CollectionPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [collectionData, setCollectionData] = useState([]);
  const { userData } = useUser();
  useSmoothScroll();

  const fetchUserData = async () => {
    const res = await fetch(`/api/auth/${params.profileId}/getUserId`);
    const data = await res.json();
    return data;
  };

  const { data: inspectUserData = {} } = useQuery(
    ["user-info"],
    fetchUserData,
    {
      enabled: !!params.profileId,
      refetchOnMount: "always",
    }
  );

  const navigationLinks = [
    { url: "/", content: "Home" },
    {
      url: "/account/profile/collection",
      content: "Saved Items & Collections",
    },
    {
      url: `/profile/${inspectUserData?._id}`,
      content: `${inspectUserData?.nickname}`,
    },
  ];

  useEffect(() => {
    if (params.collectionId === "all-saved-items" && !!inspectUserData) {
      setCollectionData(inspectUserData.collections?.[0]);
    } else {
      setCollectionData(
        inspectUserData.collections?.filter(
          (col) => col._id === params.collectionId
        )[0]
      );
    }
  }, [inspectUserData]);

  useEffect(() => {
    console.log(collectionData);
  }, [collectionData]);
  return (
    <Page>
      {collectionData && inspectUserData ? (
        <>
          <ButtonHover
            value={"BACK TO PROFILE"}
            icon={<ArrowBack />}
            onClick={() => navigate(`/profile/${inspectUserData?._id}`)}
          />
          <NavigationWrap
            links={navigationLinks}
            style={{ margin: "40px 0 10px 0" }}
          />
          <div className="flex-wrap">
            <h1> {collectionData?.collName}</h1>
            <p>
              {collectionData.collDesc
                ? collectionData.collDesc
                : `All ${inspectUserData?.nickname}'s favorites in one place`}{" "}
            </p>
            <CustomLink to={`/profile/${inspectUserData?._id}`}>
              Collection by <span> {inspectUserData?.nickname} </span>
            </CustomLink>
          </div>
          <p>{collectionData.collRecipes?.length} items</p>
          <div className="collection-card">
            <LineBreak className="line-break" />
            {collectionData.collRecipes?.map((data, id) => (
              <Card key={id} className="card">
                <Link to={"/recipe/" + data.recipe.id}>
                  <img src={data?.recipe.image} />
                  <div className="card-desc">
                    <h3>{data?.recipeTitle}</h3>
                  </div>
                </Link>
              </Card>
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
  min-height: 460px;
  width: 280px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);

  .wrap {
    padding: 20px;

    h4 {
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
    height: 62%;
  }
`;

const Page = styled.div`
  position: relative;
  margin: 200px auto;
  height: 100%;
  max-width: 100%;
  width: 1240px;

  @media (max-width: 1240px) {
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
