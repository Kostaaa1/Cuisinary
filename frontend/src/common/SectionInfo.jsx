import styled from "styled-components";

const SectionInfo = ({ value, text, icon }) => {
  return (
    <Section>
      <h3> {value} </h3>
      <span>
        {icon}
        {text}
      </span>
      <div className="line-break"></div>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 14px;
  }

  span {
    font-weight: 300;
    display: flex;
    align-items: center;
    font-size: 14px;

    svg {
      margin-right: 6px;
    }
  }
  .line-break {
    width: 100%;
    height: 1px;
    margin: 30px 0 35px 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default SectionInfo;
