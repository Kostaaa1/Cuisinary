import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ProfileContext from '../../../setup/app-context-menager/GlobalContext';
import { Close, SearchOutlined } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const SearchForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchValue, setSearhValue] = useState(params.search ? params.search : '');
  const { searchBarRef2, showSearch2, setShowSearch2 } = useContext(ProfileContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!searchValue) return;
    navigate('/searched/' + searchValue.toLowerCase());

    setSearhValue('');
    setShowSearch2(false);
  };

  return (
    <Form onSubmit={submitHandler}>
      <h5>
        Search Results For <span> {params.search} </span>
      </h5>
      {showSearch2 ? (
        <div className={`input-wrap ${showSearch2 ? 'active' : ''}`} ref={searchBarRef2}>
          <SearchOutlined onClick={submitHandler} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearhValue(e.target.value)}
          />
          <input type="submit" value="GO" />
        </div>
      ) : (
        <div className="input-wrap">
          {searchValue !== '' ? (
            <Close
              onClick={() => {
                setShowSearch2(true);
                setSearhValue('');
              }}
            />
          ) : (
            <SearchOutlined />
          )}
          <input
            type="text"
            value={searchValue}
            onFocus={() => setShowSearch2(true)}
            onChange={(e) => setSearhValue(e.target.value)}
          />
        </div>
      )}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 440px;
  height: 100px;
  max-width: 100%;
  margin-bottom: 12px;

  h5 {
    font-weight: bold;
    margin-bottom: 12px;
    font-size: 18px !important;

    span {
      color: var(--red-color);
      font-size: inherit;
      text-decoration: underline;
    }
  }

  .input-wrap {
    position: relative;

    input[type='text'] {
      font-size: 16px;
      width: 100%;
      height: 50px;
      color: var(--main-color);
      padding: 0 40px;

      &:focus {
        outline: none;
      }
    }

    svg {
      position: absolute;
      top: 50%;
      transform: translate(50%, -50%);
      left: 0;
      color: var(--main-color);
      cursor: pointer;

      &:hover {
        color: var(--red-color);
      }
    }

    input[type='submit'] {
      position: absolute;
      right: 0;
      letter-spacing: 1.1px;
      height: 100%;
      width: 80px;
      color: #fff;
      border: none;
      font-weight: 800;
      background-color: var(--red-color);
      cursor: pointer;
    }
  }

  .active {
    outline: 3px solid var(--blue-color);
    outline-offset: 1px;

    svg {
      color: var(--red-color);
    }
  }
`;

export default SearchForm;
