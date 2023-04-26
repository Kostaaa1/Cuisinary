import { useContext, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import GlobalContext from "../../../setup/app-context-menager/GlobalContext";

const Search = ({ showSearched }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { searchBarRef } = useContext(GlobalContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!input) return;
    navigate("/searched/" + input.toLowerCase());

    setInput("");
    showSearched();
  };

  return (
    <SearchForm onSubmit={submitHandler} ref={searchBarRef}>
      <h4>Search</h4>
      <Wrapper className="wrapper">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          placeholder="What are you looking for?"
        />
        <div className="search">
          <FaSearch onClick={submitHandler} />
        </div>
        <Close className="close" onClick={showSearched} />
      </Wrapper>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 470px;
  max-width: 100%;
  height: 55px;
  right: 0;
  padding: 0 0 0 12px;

  h4 {
    color: var(--main-color);
    font-weight: bold;
    margin-right: 10px;
  }

  .wrapper {
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    border: 1px solid var(--main-color);
    border-right: none;
    padding: 0 14px;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 70px;
    color: white;
    cursor: pointer;
    background-color: var(--red-color);

    svg {
      font-size: 14px;
    }
  }

  .close {
    color: var(--main-color);
    font-size: 2.2rem;
    cursor: pointer;
    margin-left: 5px;
  }
`;

export default Search;
