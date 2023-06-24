import { useEffect, useRef } from 'react';
import LineBreak from './LineBreak';
import Loading from './Loading';
import styled from 'styled-components';
import useAddFixed from '../pages/profile/hooks/useAddFixed';
import { useParams } from 'react-router-dom';

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
  const params = useParams();
  const headerRef = useRef(null);
  useAddFixed(headerRef, params);

  return (
    <>
      <Section>
        <div className={`account-section`} ref={headerRef}>
          <h1> {title} </h1>
          {buttonValue ? (
            <>
              {showLoading ? (
                <button className="btn-save">
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
            </>
          ) : (
            <div></div>
          )}
        </div>
        <Content>
          <h4> {text} </h4>
          <span>
            {icon}
            {span}
          </span>
        </Content>
      </Section>
      <LineBreak className="line-break" />
    </>
  );
};

const Section = styled.section`
  position: relative;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .account-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;

    h1 {
      font-size: 36px !important;
    }

    .button-replace {
      width: 200px;
      height: 56px;
    }

    .btn-save {
      position: relative;
      width: 200px;
      height: 56px;
      font-size: 12px;
      font-weight: 900;
      color: white;
      background-color: #d9d9d9;
      display: block;
      border: none;
      border-radius: 3px;
      letter-spacing: 1.2px;

      .scaled-loading {
        transform: scale(0.8) !important;
      }
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
  }
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  h4 {
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 14px;
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
