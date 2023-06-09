import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonBorder from '../../../common/ButtonBorder';
import AuthContext from '../../../setup/app-context-menager/AuthContext';
import PersonAvatar from '../../../common/PersonAvatar';
import { useRef } from 'react';
import { useEffect } from 'react';

const ProfileGreet = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileImgLoaded, setProfileImgLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (
      imgElement &&
      imgElement.complete &&
      imgElement.naturalHeight > 0 &&
      imgElement.naturalWidth > 0
    ) {
      setProfileImgLoaded(true);
    }
  }, []);

  return (
    <Greet>
      {!userData && !profileImgLoaded ? (
        <h4 className="h4-div">Loading...</h4>
      ) : (
        <>
          {!userData?.picture?.image ? (
            <PersonAvatar />
          ) : (
            <img
              src={`${userData?.picture?.image}`}
              alt="profile-picture"
              className="profile-picture"
              onLoad={() => setProfileImgLoaded(true)}
            />
          )}
          <div className="user-info-wrap">
            <h4>
              Hi,
              {userData?.firstName
                ? `${userData?.firstName} ${userData?.lastName}`
                : userData?.email}
            </h4>
            <ButtonBorder
              style={{ width: '140px', height: '30px' }}
              onClick={() => navigate(`/profile/${userData._id}`)}
              value={'View Public Profile'}
            />
          </div>
        </>
      )}
    </Greet>
  );
};

const Greet = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;

  .h4-div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 22px 0;
    margin: 0 auto;

    h4 {
      font-size: 16px;
    }
  }

  h4 {
    word-break: break-all;
    margin-bottom: 8px;
  }

  img {
    margin-right: 12px;
    height: 70px;
    width: 70px;
    pointer-events: none;
  }

  svg {
    width: 70px;
    height: 70px;
  }
`;

export default React.memo(ProfileGreet);
