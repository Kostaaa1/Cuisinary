import { motion } from 'framer-motion';
import styled from 'styled-components';
import ArticleSection from './components/ArticleSection';
import useSmoothScroll from '../../utils/useSmoothScroll';

const Home = () => {
  useSmoothScroll();

  return (
    <Main
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ArticleSection />
    </Main>
  );
};

const Main = styled(motion.main)`
  max-width: 100%;
  width: 1240px;
  height: 100%;
  margin: 200px auto;
`;

export default Home;
