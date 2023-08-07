import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonBorder from '../../../common/ButtonBorder';
import PersonAvatar from '../../../common/PersonAvatar';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

const ProfileGreet = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [profileImgLoaded, setProfileImgLoaded] = useState(false);
  const imgRef = useRef(null);

  const queryClient = useQueryClient();
  const contextUser = queryClient.getQueryData(['context-user']);

  useEffect(() => {
    console.log('This is context user from ProfileGreet', contextUser);
  }, [contextUser]);

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
      {!contextUser && !profileImgLoaded ? (
        <h4 className="h4-div">Loading...</h4>
      ) : (
        <>
          {!contextUser?.picture?.image ? (
            <PersonAvatar />
          ) : (
            <img
              src={`${contextUser?.picture?.image}`}
              alt="profile-picture"
              className="profile-picture"
              onLoad={() => setProfileImgLoaded(true)}
            />
          )}
          <div className="user-info-wrap">
            <h4>
              Hi,
              {contextUser?.firstName
                ? `${contextUser?.firstName} ${contextUser?.lastName}`
                : contextUser?.email}
            </h4>
            <ButtonBorder
              style={{ width: '140px' }}
              onClick={() => navigate(`/profile/${contextUser._id}`)}
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
  padding-top: 0;

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
