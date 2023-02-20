import React from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaUtensilSpoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineRiceBowl, MdRiceBowl } from "react-icons/md";

const Logo = () => {
    return (
        <CulinaryLogo to={"/"}>
            Culinary
            <MdRiceBowl className="logo" />
        </CulinaryLogo>
    );
};

const CulinaryLogo = styled(Link)`
    text-decoration: none;
    font-size: 2rem;
    font-weight: 600;
    font-family: "Lobster two", cursive;
    color: var(--main-color);
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
        font-size: 2.2rem;
        color: #f7af30;
        /* color: var(--main-color); */
        margin-left: 2px;
    }
`;

export default Logo;
