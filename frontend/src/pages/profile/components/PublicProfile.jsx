import { KeyboardArrowDown, SupervisorAccount } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../../../common/Loading";
import { useAuth } from "../../../setup/auth/useAuth";

const PersonalInfo = () => {
    const [clicked, setClicked] = useState(true);
    const [preview, setPreview] = useState("");
    const { currentUser } = useAuth();
    const [image, setImage] = useState("");
    const [publicForm, setPublicForm] = useState({
        displayName: "",
        tagline: "",
        preview: "",
    });
    // const [buttonSave, setButtonSave] = useState(false);

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        } else {
            setImage(null);
        }
    };

    const handleInput = (e) => {
        const data = {
            ...publicForm,
            [e.target.id]: e.target.value,
        };
        setPublicForm({ ...data });
    };

    const submitForm = (e) => {
        e.preventDefault();
        setPublicForm({ ...publicForm, preview: preview });
    };

    return (
        <FormWrapper onSubmit={submitForm}>
            {!currentUser ? (
                <Loading />
            ) : (
                <>
                    <div className="public__section">
                        <h1>Public Profile Settings</h1>
                        <input
                            type="submit"
                            value={"SAVE CHANGES"}
                            className={`btn__save`}
                        />
                    </div>
                    <div className="section__info">
                        <h3>
                            The information on this page will be displayed on
                            your public profile, which is visible to other
                            users.
                        </h3>
                        <span>
                            <SupervisorAccount />
                            The information on this page will be displayed
                            publicly and will be visible to others
                        </span>
                        <div className="line__break"></div>
                    </div>
                    <DynamicForm>
                        <div
                            className="head__info"
                            onClick={() => setClicked(!clicked)}
                        >
                            <h3>About Me</h3>
                            <KeyboardArrowDown
                                className={clicked ? "click" : ""}
                            />
                        </div>
                        {clicked && (
                            <>
                                <div className="input__container">
                                    <div className="form__control">
                                        <div className="input__wrapper">
                                            <label>Display Name*</label>
                                            <input
                                                type="text"
                                                id="displayName"
                                                placeholder="Kosta"
                                                required
                                                onChange={(e) => handleInput(e)}
                                            />
                                        </div>
                                        <div className="input__wrapper">
                                            <label>Tagline</label>
                                            <textarea
                                                cols="30"
                                                rows="6"
                                                id="tagline"
                                                placeholder="Describe yourself in a nutshell"
                                                className="tag"
                                                onChange={(e) => handleInput(e)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="form__file">
                                        <label htmlFor="input_file">
                                            Add an image
                                            <div>
                                                <img src={preview} />
                                                <h3>Profile photo</h3>
                                            </div>
                                        </label>
                                        <input
                                            id="input_file"
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={handleImage}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </DynamicForm>
                </>
            )}
        </FormWrapper>
    );
};

const DynamicForm = styled.div`
    width: 100%;
    height: 100%;
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0.4);

    h3 {
        margin: 20px 0;
    }

    .head__info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        svg {
            transition: all 0.3s 0s ease-in-out;
        }

        .click {
            transform: rotate(180deg);
        }
    }

    .input__container {
        padding: 1rem 2rem;
        border-top: 1px solid rgba(0, 0, 0, 0.4);
        display: flex;
        width: 100%;
        height: 100%;

        .form__file {
            input {
                display: none;
            }

            label > div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: 300px;
                cursor: pointer;

                &:focus,
                &:active {
                    border: 4px solid #00367c;
                }

                h3 {
                    letter-spacing: 0;
                }

                img {
                    display: block;
                    border-radius: 50%;
                    height: 120px;
                    width: 120px;
                    margin-bottom: 10px;
                    border: 2px solid #ce4620;
                }
            }
        }

        .form__file {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            height: 100%;
            position: relative;
        }

        .form__control {
            width: 60%;
            margin-right: 40px;

            .input__wrapper {
                display: flex;
                flex-direction: column;
                padding: 20px 0;

                .tag {
                    padding: 15px 15px;
                    font-size: 16px;

                    ::-webkit-scrollbar-track {
                        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                        border-radius: 10px;
                        background-color: #f5f5f5;
                    }
                    ::-webkit-scrollbar {
                        width: 12px;
                        background-color: #f5f5f5;
                    }
                    ::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                        background-color: #555;
                    }
                }
            }
        }

        .form__file {
            width: 35%;
            padding: 20px 0;
        }

        label {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 14px;
        }

        input {
            width: 100%;
            height: 40px;
            padding: 0 10px;
            font-size: 16px;
        }
    }
`;

const FormWrapper = styled.form`
    width: 100%;
    padding: 20px;
    position: relative;

    .public__section {
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

        .selected {
            background-color: #ce4620;
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
