import { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Close } from "@material-ui/icons";

const Search = ({ showSearched }) => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/searched/" + input.toLowerCase());

        setInput("");
        showSearched();
    };

    return (
        <SearchForm onSubmit={submitHandler}>
            <h4>Search</h4>
            <Wrapper className="wrapper">
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}
                    placeholder="What are you looking for?"
                />
                <FaSearch className="search" onClick={submitHandler} />
                <Close className="close" onClick={showSearched} />
            </Wrapper>
        </SearchForm>
    );
};

const SearchForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: 480px;
    height: 50px;
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
    height: 100%;
    position: relative;

    input {
        width: 100%;
        height: 80%;
        border: 1px solid var(--main-color);
        border-right: none;
        padding: 0 14px;
        font-size: 1rem;

        &:focus {
            outline: none;
        }
    }

    .search {
        height: 80%;
        width: 40px;
        padding: 12px;
        color: white;
        cursor: pointer;
        background-color: var(--red-color);
    }

    .close {
        color: var(--main-color);
        font-size: 2.2rem;
        cursor: pointer;
        margin-left: 5px;
    }
`;

export default Search;
