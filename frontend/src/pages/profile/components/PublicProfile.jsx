import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddAPhoto, KeyboardArrowDown, SupervisorAccount } from '@mui/icons-material';
import SectionHeader from '../../../common/SectionHeader';
import { useQueryClient } from '@tanstack/react-query';

const PublicInfo = ({ userData }) => {
  const [clicked, setClicked] = useState(true);
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState('');
  const { user } = useAuth0();
  const [buttonSave, setButtonSave] = useState(false);
  const [tagline, setTagline] = useState('');
  const [nickname, setNickname] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setNickname(userData?.nickname);
    setTagline(userData?.tagline);
  }, [userData]);

  const handleImage = (e) => {
    if (e.target.value !== '') {
      setButtonSave(true);
    }

    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview(null);
    }
  }, [image]);

  const submitForm = async (e) => {
    try {
      e.preventDefault();

      setShowLoading(true);
      const form = { nickname, tagline };
      const formData = new FormData();

      if (form.nickname || form.tagline) {
        await axios.post(`/api/user/${user.email}`, {
          user: { nickname: form.nickname, tagline: form.tagline },
        });
      }

      if (image) {
        formData.append('file', image);
        await axios.post(`/api/user/${user?.email}/addImage`, formData);
      }

      queryClient.refetchQueries(['user-data', user?.email]);
      queryClient.refetchQueries(['context-user', user?.email]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <>
        <SectionHeader
          title="Public Profile Settings"
          text="The information on this page will be displayed on your public profile, which is visible to other users."
          span="The information on this page will be displayed publicly and will be visible to others"
          icon={<SupervisorAccount />}
          showLoading={showLoading}
          buttonSave={buttonSave}
          buttonValue="SAVE CHANGES"
        />
        <DynamicForm>
          <div className="head-info" onClick={() => setClicked(!clicked)}>
            <h3>About Me</h3>
            <KeyboardArrowDown className={clicked ? 'click' : ''} />
          </div>
          {clicked && (
            <>
              <div className="input-container">
                <div className="form-control">
                  <div className="input-wrapper">
                    <label>Display Name</label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value), setButtonSave(true);
                      }}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label>Tagline</label>
                    <textarea
                      cols="30"
                      placeholder="Describe yourself in a nutshell"
                      className="tagline"
                      value={tagline}
                      maxLength={200}
                      onChange={(e) => {
                        setTagline(e.target.value), setButtonSave(true);
                      }}
                    ></textarea>
                    <span className="length">{tagline?.length}/200</span>
                  </div>
                </div>
                <div className="form-file">
                  <label htmlFor="input_file">
                    <span>Add an image</span>
                    <div>
                      {preview ? (
                        <img src={preview} alt="" />
                      ) : userData?.picture.image ? (
                        <img src={userData?.picture.image} />
                      ) : (
                        <AddAPhoto className="addPhoto" />
                      )}
                      <h3>Profile photo</h3>
                    </div>
                  </label>
                  <input
                    className="file"
                    id="input_file"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImage}
                  />
                </div>
              </div>
            </>
          )}
        </DynamicForm>
      </>
    </Form>
  );
};

const Form = styled.form`
  /* padding: 24px; */
`;
const DynamicForm = styled.div`
  width: 100%;
  height: 100%;
  margin: 22px 0;
  border: 1px solid var(--input-border-color);

  h3 {
    margin: 20px 0;
  }

  .head-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    user-select: none;

    svg {
      transition: all 0.2s 0s ease-in-out;
    }

    .click {
      transform: rotate(180deg);
    }
  }

  .input-container {
    padding: 1rem 2rem;
    border-top: 1px solid var(--input-border-color);
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .form-file {
      display: flex;
      flex-direction: column;
      position: relative;

      input {
        display: none;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 270px;
        margin-top: 10px;
        cursor: pointer;

        &:focus,
        &:active {
          border: 3px solid var(--blue-color);
        }

        svg {
          /* display: block; */
          border: 2px solid var(--red-color);
          border-radius: 50%;
          width: 140px;
          height: 140px;
          padding: 34px;
          color: var(--red-color);
          margin-bottom: 10px;
          overflow: visible;
        }

        img {
          display: block;
          border-radius: 50%;
          height: 140px;
          width: 140px;
          margin-bottom: 5px;
          border: 2px solid var(--red-color);
        }
      }
    }

    .form-control {
      width: 65%;

      .input-wrapper {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        font-size: 16px;

        .tagline {
          font-size: 14px;
          padding: 15px;
          height: 150px;
        }

        .length {
          color: var(--grey-color);
          margin: 6px 0;
          font-size: 12px;
        }
      }
    }

    .form-file {
      width: 32%;
      margin: 20px 0 0 0;
      max-height: 300px;
    }

    label {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 14px;
    }

    span {
      margin: 50px 0;
    }

    input {
      width: 100%;
      height: 40px;
      padding: 0 10px;
      font-size: 14px;
    }
  }
`;

export default PublicInfo;
