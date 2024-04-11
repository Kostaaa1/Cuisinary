import React, { useState } from 'react';
import styled from 'styled-components';
import image from '../../../assets/images/feast.jpg';

const Section = () => {
  const [data, setData] = useState([{ img: '' }]);

  return (
    <MainSection>
      <div className="wrap">
        <img src={image} alt="" />
        <div className="wrap-info">
          <h3>News and features:</h3>
          {}
        </div>
      </div>
    </MainSection>
  );
};

const MainSection = styled.section`
  position: relative;
  width: 1240px;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 280px auto;

  .wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* outline: 1px solid black; */

    img {
      width: 820px;
      height: 570px;
    }
  }
`;

export default Section;
