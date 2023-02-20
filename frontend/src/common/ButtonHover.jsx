import { ArrowBack } from "@material-ui/icons";
import styled from "styled-components";

const Return = ({ value, onClick, icon }) => {
    return (
        <Back onClick={onClick}>
            {icon} <h5>{value}</h5>
        </Back>
    );
};

const Back = styled.div`
    /* position: absolute; */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: fit-content;
    top: 0;

    svg {
        color: var(--red-color);
        font-size: 1.4rem;
        margin-right: 4px;
    }

    h5 {
        font-size: 14px;
    }

    &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
    }
`;

export default Return;
