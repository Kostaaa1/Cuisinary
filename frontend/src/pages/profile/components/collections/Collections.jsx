import { HttpsOutlined } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import FavoriteCollection from './FavoriteCollection';
import CollectionModal from '../../../../common/CollectionModal';
import NewCollectionCard from './NewCollectionCard';
import { useNavigate } from 'react-router-dom';
import useNoScroll from '../../../../utils/useNoScroll';
import SectionHeader from '../../../../common/SectionHeader';

const Collections = ({ userData }) => {
  const navigate = useNavigate();
  // const { setCollections, layoutArr } = useLayoutData();
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  useNoScroll(showCollectionModal);

  const mockData = [
    {
      data: {},
    },
    {
      data: {},
    },
    {
      data: {},
    },
    {
      data: {},
    },
  ];

  const layoutArr = useMemo(() => {
    let destructuredArray = userData?.collections?.map((coll) =>
      coll.collRecipes.map((recipes) => ({
        data: { image: recipes.data?.image },
      }))
    );
    return destructuredArray?.map((el) =>
      mockData.map((mockEl, i) => (el[i] ? el[i] : mockEl))
    );
  }, [userData, mockData]);

  return (
    <>
      <Collection>
        <div className="saved-items">
          <SectionHeader
            title="Saved Items & Collections"
            text="Create collections to organize your saved items."
            span="Others can see your saved items and any collection you make public."
            icon={<HttpsOutlined />}
            buttonValue="NEW COLLECTION +"
            buttonSave={true}
            onClick={() => setShowCollectionModal(true)}
          />
          <div>
            <h4 className="h3-space">{userData?.collections.length} Collections</h4>
            <div className="collection-control">
              {userData?.collections.map((collection, id) => (
                <FavoriteCollection
                  key={collection._id}
                  collection={collection}
                  layoutArr={layoutArr[id]}
                />
              ))}
              <NewCollectionCard onClick={() => setShowCollectionModal(true)} />
            </div>
          </div>
        </div>
      </Collection>
      {showCollectionModal && (
        <CollectionModal showModal={() => setShowCollectionModal(!showCollectionModal)} />
      )}
    </>
  );
};

const Collection = styled.div`
  .saved-items {
    .h3-space {
      margin: 22px 0;
    }

    .collection-control {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      row-gap: 22px;
    }
  }
`;

export default Collections;
