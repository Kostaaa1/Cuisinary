import React, { useState } from "react";
import styled from "styled-components";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ArrowDropDown, AccountCircle } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
// import image from "../../../assets/images/image2.jpg";

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState();
  const { logout } = useAuth0();

  return (
    <>
      <li className=" list" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
        <FaUserCircle className="user" /> My Account
        <ArrowDropDown className="arrow" />
        {showDropdown && (
          <LinksWrap>
            <ul>
              <NavLink to={"/account/profile/"}>
                <div className="li-control">
                  <li onClick={() => setShowDropdown(false)}>My Profile</li>
                </div>
              </NavLink>
              <NavLink to={"/account/profile/collection"}>
                <div className="li-control">
                  <li onClick={() => setShowDropdown(false)}>Saved Items & Collections</li>
                </div>
              </NavLink>
              <NavLink to={"/account/addRecipe"}>
                <div className="li-control">
                  <li onClick={() => setShowDropdown(false)}>Add a Recipe</li>
                </div>
              </NavLink>
              <div className="line-break"></div>
              <NavLink>
                <div className="li-control">
                  <li onClick={() => setShowDropdown(false)}>Help</li>{" "}
                </div>
              </NavLink>
              <NavLink>
                <div className="li-control">
                  <li onClick={logout}>Log Out</li>
                </div>
              </NavLink>
            </ul>
          </LinksWrap>
        )}
      </li>
    </>
  );
};

const LinksWrap = styled.div`
  position: absolute;
  width: 220px;
  background: white;
  top: 100%;
  left: 0;
  font-weight: 400;
  transform: translateX(-5%);
  flex-direction: column;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  z-index: 10;

  .line-break {
    width: 100%;
    margin: 10px auto 15px auto;
    border: 1px solid rgba(0, 0, 0, 0.14);
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--main-color);
  width: 100%;

  .li-control {
    li {
      color: var(--main-color);
      margin: 2px 12px;
      font-weight: 500;
      font-size: 1rem;
      letter-spacing: -0.6px;
    }

    &:hover {
      background: #f3f3f3;
    }
  }
`;

export default Dropdown;
