import React from 'react';
import styled from 'styled-components';
import { Instagram, Twitter, Pinterest, Facebook } from '@mui/icons-material';
import Logo from '../common/Logo';
const Footer = () => {
  const categories = ['DINNERS', 'MEALS', 'INGREDIENTS', 'CUISINES', 'OCCASIONS'];
  const socials = [Instagram, Twitter, Pinterest, Facebook];

  return (
    <Foot>
      <section>
        <div className="logo">
          <Logo style={{ transform: 'scale(1.5)', color: 'var(--red-color)' }} />
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
  position: static;
  height: 300px;
  min-height: 300px;
  width: 100vw;
  background-color: #fff;
  border-top: 1px solid rgb(0 0 0 / 22%);

  h2 {
    letter-spacing: 0.9;
    margin-bottom: 20px;
  }

  section {
    display: flex;
    height: 100%;
    padding: 14px 0;
    width: 1240px;
    margin: 0 auto;
    max-width: 100%;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div:not(.category) {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33.33%;

      .socials {
        display: flex;
        width: 100%;
        height: 50%;
        flex-direction: column;
        justify-content: flex-start;
        /* border-bottom: 1px solid rgb(0 0 0 /22%); */

        .wrap {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: row;
        }

        svg {
          font-size: 26px;
          margin: 0 8px;
          cursor: pointer;

          &:hover {
            visibility: visible;
            opacity: 0.8;
            transition:
              opacity 0.3s,
              visibility 0.3s;
          }
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
        color: var(--main-color);
        cursor: pointer;
        letter-spacing: 1px !important;

        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--red-color);
          text-underline-offset: 5px;
          text-decoration-thickness: 10%;
        }
      }

      &:nth-child(2):not(.socials):not(.wrap) {
        border-right: 1px solid rgb(0 0 0 / 22%);
        border-left: 1px solid rgb(0 0 0 / 22%);
      }
    }
  }
`;

export default Footer;
