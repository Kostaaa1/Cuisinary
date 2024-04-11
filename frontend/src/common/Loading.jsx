import styled from 'styled-components';

const Loading = (props) => {
  return (
    <Wrapper className={props.className}>
      <LoadingCircle
        style={
          (props.scaled && { width: '4.6em', height: '4.6em' }) || props.style
        }
      ></LoadingCircle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  z-index: 1;
`;

const LoadingCircle = styled.div`
  pointer-events: none;
  width: 3.2em;
  height: 3.2em;
  border: 0.38em solid white;
  border-top-color: var(--red-color);
  border-radius: 50%;
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
