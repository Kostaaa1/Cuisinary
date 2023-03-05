import { HttpsOutlined } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../common/Button";
import SectionInfo from "../../../../common/SectionInfo";
import FavoriteCollection from "./FavoriteCollection";
import CollectionModal from "../../../../common/CollectionModal";
import NewCollectionCard from "./NewCollectionCard";
import Loading from "../../../../common/Loading";
import { useAuth } from "../../../../setup/auth/useAuth";
import { Auth0Context, useAuth0 } from "@auth0/auth0-react";
import { useLayoutData } from "../../hooks/useLayoutData";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";
import useNoScroll from "../../../../utils/useNoScroll";
import useAddFixed from "../../hooks/useAddFixed";
import { useRef } from "react";

const SavedItems = () => {
  const navigate = useNavigate();
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const { layoutArr, length, destructuredArray, layoutData } = useLayoutData();
  const { currentUser } = useAuth();
  const { userData } = useContext(AuthContext);
  useNoScroll(showCollectionModal);
  const collectionRef = useRef(null);
  useAddFixed(collectionRef);

  return (
    <Collections>
      {!currentUser ? (
        <Loading />
      ) : (
        <>
          <div className="saved-items">
            <div className="collection-section" ref={collectionRef}>
              <h1>Saved Items & Collections</h1>
              <Button
                onClick={() => setShowCollectionModal(true)}
                style={{ width: "200px", height: "60px" }}
                value={"NEW COLLECTION +"}
              />
            </div>
            <SectionInfo
              value={"Create collections to organize your saved items"}
              icon={<HttpsOutlined />}
              text={"Others can see your saved items and any collection you make public."}
            />
            <div>
              <h3>{layoutData?.length} Collections</h3>
              <div className="collection-control">
                {layoutData?.map((collection, id) => (
                  <FavoriteCollection
                    key={id}
                    collection={collection}
                    layoutArr={layoutArr[id]}
                    onClick={() => {
                      collection.collName === "All saved items"
                        ? navigate("/account/profile/saved-items")
                        : navigate(`/account/profile/collection/${collection._id}`);
                    }}
                  />
                ))}
                <NewCollectionCard onClick={() => setShowCollectionModal(true)} />
              </div>
            </div>
          </div>
        </>
      )}
      {showCollectionModal && <CollectionModal showModal={() => setShowCollectionModal(!showCollectionModal)} />}
    </Collections>
  );
};

const Collections = styled.div`
  position: relative;
  width: 100%;
  /* padding: 8px 20px; */
  min-height: 100vh;

  .saved-items {
    h3 {
      margin-bottom: 20px;
    }

    .collection-control {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      row-gap: 22px;
    }
  }

  .collection-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-weight: bold;
      font-size: 2.2rem;
    }
  }

  .section-info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;

    h3 {
      font-size: 16px;
      font-weight: 400;
      line-height: 25px;
      margin-bottom: 14px;
    }

    span {
      font-weight: 200;
      display: flex;
      align-items: center;
      font-size: 13px;

      svg {
        margin-right: 10px;
      }
    }
  }

  .line-break {
    width: 100%;
    height: 1px;
    margin: 40px 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default SavedItems;
