import { motion } from "framer-motion";
import styled from "styled-components";
import Section from "./components/Section";
import ArticleSection from "./components/ArticleSection";

const Home = () => {
  return (
    <Main animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <ArticleSection />
      {/* <Section /> */}
    </Main>
  );
};

const Main = styled(motion.main)`
  max-width: 100%;
  width: 1240px;
  margin: 200px auto;
`;

export default Home;
