import React from "react";
import styled from "styled-components";
import { Instagram, Twitter, Pinterest, Facebook } from "@mui/icons-material";
import Logo from "../common/Logo";
const Footer = () => {
  const categories = ["DINNERS", "MEALS", "INGREDIENTS", "CUISINES", "OCCASIONS"];
  const socials = [Instagram, Twitter, Pinterest, Facebook];

  return (
    <Foot>
      <section>
        <div>
          <Logo style={{ transform: "scale(1.5)", color: "var(--red-color)" }} />
        </div>
        <div>
          <h2>Categories</h2>
          <div className="category">
            {categories.map((category, id) => (
              <h5 key={id}> {category} </h5>
            ))}
          </div>
        </div>
        <div>
          <div className="socials">
            <h2>Connect</h2>
            <div className="wrap">
              <Instagram />
              <Twitter />
              <Pinterest />
              <Facebook />
            </div>
          </div>
        </div>
      </section>
    </Foot>
  );
};

const Foot = styled.footer`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100vw;
  border-top: 1px solid rgb(0 0 0 / 22%);

  h2 {
    letter-spacing: 0.9;
    margin-bottom: 20px;
  }

  section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    margin: 0 auto;
    width: 1240px;
    max-width: 100%;

    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;

    div:not(.category) {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* justify-content: space-around; */
      width: 33.33%;
      height: 100%;

      .socials {
        height: 50%;
        display: flex;
        width: 100%;
        align-content: start;
        flex-direction: column;
        border-bottom: 1px solid rgb(0 0 0 /22%);

        .wrap {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: row;
          /* height: max-content; */
        }

        svg {
          margin: 0 8px;
          cursor: pointer;
        }
      }

      .category {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }

      h5 {
        line-height: 30px;
        letter-spacing: 1px;
        color: var(--main-color);
        cursor: pointer;

        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--red-color);
          text-underline-offset: 5px;
          text-decoration-thickness: 10%;
        }
      }

      &:first-child:not(.socials) {
        border-right: 1px solid rgb(0 0 0 /22%);
        justify-content: center;
      }

      &:nth-child(2):not(.socials):not(.wrap) {
        border-right: 1px solid rgb(0 0 0 / 22%);
      }
    }
  }
`;

export default Footer;
