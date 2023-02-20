import styled from "styled-components";

const Loading = ({ styles }) => {
    return (
        <Wrapper style={styles}>
            <LoadingCircle></LoadingCircle>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: "absolute";
    content: "";
    top: "50%";
    right: "0";
    transform: "translate(0, 50%)";
`;

const LoadingCircle = styled.div`
    pointer-events: none;
    width: 3.2em;
    height: 3.2em;
    border: 0.3em solid white;
    border-top-color: #ce4620;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Loading;
