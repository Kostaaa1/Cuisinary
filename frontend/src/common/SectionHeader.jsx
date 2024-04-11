import { useEffect, useRef, useState } from 'react';
import LineBreak from './LineBreak';
import Loading from './Loading';
import styled from 'styled-components';
import useAddFixed from '../pages/profile/hooks/useAddFixed';
import { useWindowSize } from '../utils/useWindowSize';

const SectionHeader = ({
  title,
  text,
  icon,
  span,
  showLoading,
  buttonSave,
  buttonValue,
  onClick,
}) => {
  const headerRef = useRef(null);
  const windowSize = useWindowSize();
  useAddFixed(headerRef);

  return (
    <>
      <Section
        style={{
          height: !buttonValue ? '170px' : windowSize[0] >= 730 ? '170px' : '100%',
        }}
      >
        <div className="account-section" ref={headerRef}>
          <h1> {title} </h1>
          {buttonValue && windowSize[0] >= 730 && (
            <>
              {showLoading ? (
                <button className="btn-save" disabled>
                  <Loading className="scaled-loading" />
                </button>
              ) : (
                <>
                  {buttonSave ? (
                    <input
                      type="submit"
                      value={buttonValue}
                      className={`btn-save highlight`}
                      onClick={onClick}
                    />
                  ) : (
                    <input
                      type="submit"
                      disabled
                      value={buttonValue}
                      className={`btn-save`}
                    />
                  )}
                </>
              )}
            </>
          )}
          {!buttonValue && windowSize[0] >= 730 && (
            <div className="button-wrap">
              <div className="btn-save replace"></div>
            </div>
          )}
        </div>
        <Content>
          <div>
            <h4> {text} </h4>
            <span>
              {icon}
              {span}
            </span>
          </div>
          {buttonValue && windowSize[0] < 730 && (
            <div className="button-wrap">
              {showLoading ? (
                <button className="btn-save" disabled>
                  <Loading className="scaled-loading" />
                </button>
              ) : (
                <>
                  {buttonSave ? (
                    <input
                      type="submit"
                      value={buttonValue}
                      className={`btn-save highlight`}
                      onClick={onClick}
                    />
                  ) : (
                    <input
                      type="submit"
                      value={buttonValue}
                      disabled
                      className={`btn-save`}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </Content>
      </Section>
    </>
  );
};

const Section = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid rgba(0, 0, 0, 0.11);
  padding-bottom: 24px;
  margin-bottom: 24px;

  .button-wrap {
    width: max-content;

    @media screen and (max-width: 768px) {
      margin-top: 24px;
    }
  }

  @media screen and (max-width: 729px) {
    justify-content: center;
  }

  .btn-save {
    position: relative;
    height: 56px;
    width: 200px;
    font-size: 12px;
    font-weight: 900;
    color: white;
    background-color: #d9d9d9;
    display: block;
    border: none;
    border-radius: 3px;
    letter-spacing: 1px;
    text-transform: uppercase;

    .scaled-loading {
      transform: scale(0.8) !important;
    }
  }

  .replace {
    background-color: transparent;
  }

  .highlight {
    background-color: var(--red-color);
    cursor: pointer;

    &:active {
      outline: 2px solid var(--blue-color);
      border-radius: 5px;
      outline-offset: 1px;
    }
  }

  .account-section {
    display: flex;
    justify-content: space-between;
    z-index: 1;
    align-items: center;
    height: max-content;
    min-height: 56px;
    margin-bottom: 22px;

    h1 {
      font-size: 36px !important;
    }

    @media screen and (max-width: 729px) {
      /* margin: 0; */

      h1 {
        font-size: 32px !important;
      }
    }
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;

  @media screen and (max-width: 729px) {
    position: relative;
    justify-content: space-around;
  }

  h4 {
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 8px;

    @media screen and (max-width: 729px) {
      /* font-size: 16px !important; */
    }
  }

  span {
    display: flex;
    align-items: center;
    color: var(--grey-color);

    svg {
      color: var(--grey-color);
      margin-right: 6px;
    }
  }
`;

export default SectionHeader;
