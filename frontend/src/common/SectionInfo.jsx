import styled from "styled-components";
import LineBreak from "../common/LineBreak";

const SectionInfo = ({ value, text, icon }) => {
  return (
    <Section>
      <h3> {value} </h3>
      <span>
        {icon}
        {text}
      </span>
      <LineBreak className="line-break" />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  .line-break {
    margin-top: 32px;
  }

  h3 {
    font-weight: 400;
    line-height: 25px;
    font-size: 17px;
    margin-bottom: 14px;
  }

  span {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--grey-color);

    svg {
      color: var(--grey-color);
      margin-right: 6px;
    }
  }
`;

export default SectionInfo;
