import { useAuth0 } from "@auth0/auth0-react";
import { KeyboardArrowDown, Lock, SupervisorAccount } from "@material-ui/icons";
import { useContext } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../../../common/Loading";
import AuthContext from "../../../setup/app-context-menager/AuthContext";
import { useAuth } from "../../../setup/auth/useAuth";

const PersonalInfo = () => {
    const [clicked, setClicked] = useState(true);
    const [buttonSave, setButtonSave] = useState(false);
    const { currentUser } = useAuth();
    const [personalForm, setPersonalForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        zipCode: "",
    });

    const handleForm = (e) => {
        // CHANGE: COMPARE DATA FROM BACKEND
        if (e.target.value !== "") {
            setButtonSave(true);
        }
        const data = { ...personalForm, [e.target.id]: e.target.value };

        const birthDate = {
            month: data.month,
            day: data.day,
            year: data.year,
        };

        setPersonalForm({ ...data, birthDate });
    };

    const submitForm = (e) => {
        e.preventDefault();

        delete personalForm.month;
        delete personalForm.day;
        delete personalForm.year;

        console.log(personalForm);
    };

    return (
        <Form onSubmit={submitForm}>
            {!currentUser ? (
                <Loading />
            ) : (
                <>
                    <div className="personal__section">
                        <h1>Personal Info</h1>
                        <input
                            type="submit"
                            value={"SAVE CHANGES"}
                            className={`btn__save ${
                                buttonSave ? "highlight" : ""
                            }`}
                        />
                    </div>
                    <div className="section__info">
                        <h3>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Illum assumenda, libero expedita at nesciunt
                            magni enim impedit deserunt laborum soluta earum
                            quidem repellendus, aliquid aspernatur.
                        </h3>
                        <span>
                            <Lock />
                            Only you can see the information on this page. It
                            will not be displayed for other users to see.
                        </span>
                    </div>
                    <div className="line__break"></div>
                    <DynamicForm>
                        <div
                            className="head__info"
                            onClick={() => setClicked(!clicked)}
                        >
                            <h3>My Basic Info</h3>
                            <KeyboardArrowDown
                                className={clicked ? "click" : ""}
                            />
                        </div>
                        {clicked && (
                            <>
                                <div className="input__container">
                                    <div className="input__wrapper">
                                        <label> Email Address*</label>
                                        <input
                                            onChange={(e) => handleForm(e)}
                                            id="email"
                                            type="email"
                                            placeholder={
                                                "battlefieldheroes177@gmail.com"
                                            }
                                        />
                                    </div>
                                    <HalfWrap>
                                        <div className="input__wrapper half">
                                            <label> First Name</label>
                                            <input
                                                onChange={(e) => handleForm(e)}
                                                id="firstName"
                                                type="text"
                                                placeholder="Taylor"
                                            />
                                        </div>
                                        <div className="input__wrapper half">
                                            <label> Last Name</label>
                                            <input
                                                onChange={(e) => handleForm(e)}
                                                id="lastName"
                                                type="text"
                                                placeholder="Smith"
                                            />
                                        </div>
                                    </HalfWrap>
                                    <HalfWrap>
                                        <div className="input__wrapper date">
                                            <label>Birth Date</label>
                                            <div>
                                                <input
                                                    onChange={(e) =>
                                                        handleForm(e)
                                                    }
                                                    id="month"
                                                    type="number"
                                                    min={"1"}
                                                    max={"12"}
                                                    placeholder="MM"
                                                />
                                                <span>/</span>
                                                <input
                                                    onChange={(e) =>
                                                        handleForm(e)
                                                    }
                                                    type="number"
                                                    min={"1"}
                                                    max={"31"}
                                                    id="day"
                                                    placeholder="DD"
                                                />
                                                <span>/</span>
                                                <input
                                                    onChange={(e) =>
                                                        handleForm(e)
                                                    }
                                                    type="number"
                                                    min={"1930"}
                                                    max={"2022"}
                                                    id="year"
                                                    placeholder="YYYY"
                                                />
                                            </div>
                                        </div>

                                        <div className="input__wrapper half">
                                            <label>ZIP Code</label>
                                            <input
                                                onChange={(e) => handleForm(e)}
                                                id="zipCode"
                                                type="text"
                                                placeholder="ZIP Code"
                                            />
                                        </div>
                                    </HalfWrap>
                                </div>
                            </>
                        )}
                    </DynamicForm>
                </>
            )}
        </Form>
    );
};

const HalfWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    .half {
        width: 48%;
    }

    .date {
        input {
            max-width: 60px;
            text-align: center;
        }

        span {
            margin: 0 8px;
        }
    }
`;

const DynamicForm = styled.div`
    width: 100%;
    height: 100%;
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0.4);

    .head__info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        svg {
            transition: all 0.2s 0s ease-in-out;
        }

        .click {
            transform: rotate(180deg);
        }
    }

    .input__container {
        padding: 1rem 2rem;
        border-top: 1px solid rgba(0, 0, 0, 0.4);
    }

    .input__wrapper {
        display: flex;
        flex-direction: column;
        padding: 20px 0;

        label {
            font-weight: bold;
            margin-bottom: 8px;
            font-size: 14px;
            /* font-size: 14px; */
        }

        input {
            width: 100%;
            height: 50px;
            padding: 0 10px;
            font-size: 14px;
        }
    }

    h3 {
        margin: 20px 0;
    }
`;

const Form = styled.form`
    width: 100%;
    padding: 20px;
    position: relative;

    .personal__section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h1 {
            font-weight: bold;
            font-size: 2.4rem;
        }

        .btn__save {
            padding: 20px 35px;
            font-weight: bold;
            color: white;
            background-color: #d9d9d9;
            display: block;
            border: none;
            border-radius: 5px;
            letter-spacing: 1.2px;
        }

        .highlight {
            background-color: #ce4620;
            cursor: pointer;
        }
    }

    .section__info {
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
            font-weight: 200;
            display: flex;
            align-items: center;
            font-size: 14px;

            svg {
                margin-right: 10px;
            }
        }
    }

    .line__break {
        width: 100%;
        height: 1px;
        margin: 40px 0;
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

export default PersonalInfo;
