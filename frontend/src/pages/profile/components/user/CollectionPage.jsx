import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ButtonHover from "../../../../common/ButtonHover";
import { ArrowBack, ArrowForwardIos } from "@material-ui/icons";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";
import NavigationWrap from "../../../../common/NavigationWrap";
import { useLayoutData } from "../../hooks/useLayoutData";
import Loading from "../../../../common/Loading";

const CollectionPage = () => {
  const navigate = useNavigate();
  const { layoutData } = useLayoutData();
  const params = useParams();
  const [collectionData, setCollectionData] = useState([]);
  const { userData } = useContext(AuthContext);
  const navigationLinks = [
    { url: "/", content: "Home" },
    { url: "/account/profile/collection", content: "Saved Items & Collections" },
    { url: `/profile/${userData?._id}`, content: `${userData?.nickname}` },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (params.collectionId === "all-saved-items" && layoutData) {
      setCollectionData(layoutData?.[0]);
    } else {
      setCollectionData(layoutData?.filter((x) => x._id === params.collectionId)[0]);
    }
  }, [layoutData]);

  return (
    <Page>
      {collectionData && userData ? (
        <>
          <ButtonHover
            value={"BACK TO PROFILE"}
            icon={<ArrowBack />}
            onClick={() => navigate(`/profile/${userData?._id}`)}
          />
          <NavigationWrap links={navigationLinks} style={{ margin: "40px 0 10px 0" }} />
          <div className="flex-wrap">
            <h1> {collectionData?.collName}</h1>
            <p>
              {" "}
              {collectionData.collDesc
                ? collectionData.collDesc
                : `All ${userData?.nickname}'s favorites in one place`}{" "}
            </p>
            <CustomLink to={`/profile/${userData?._id}`}>
              Collection by <span> {userData?.nickname} </span>
            </CustomLink>
          </div>
          <p>{collectionData.collRecipes?.length} items</p>
          <div className="collection-card">
            {collectionData.collRecipes?.map((favorite, id) => (
              <Card key={id}>
                <img src={favorite?.recipe.image} alt="" />
                <div className="wrap">
                  <h4>{favorite?.recipeTitle}</h4>
                </div>
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
  width: 1250px;

  @media (max-width: 1250px) {
    padding: 0 22px;
  }

  @media (max-width: 910px) {
    /* display: flex; */
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
    margin-top: 20px;
    row-gap: 40px;

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
