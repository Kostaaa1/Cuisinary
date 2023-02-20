import styled from "styled-components";
import { Close, Delete, Lock } from "@material-ui/icons";
import { motion } from "framer-motion";
import Button from "../../../../common/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const RemoveModal = ({ collectionTitle, onClick }) => {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const params = useParams();

    const handle = (e) => {
        if (e.key !== "Escape") return;
        onClick();
    };

    useEffect(() => {
        document.addEventListener("keydown", handle);
    }, []);

    const deleteCollection = () => {
        fetch(`/api/user/${user.email}/${params.id}/deleteCollection`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: params.id,
                email: user.email,
            }),
        });

        navigate("/account/profile/collection");
    };

    return (
        <Modal
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Section>
                <div className="favorite-header">
                    <span className="flex-header">
                        <Delete className="trash" />
                        <h3>Delete Collection</h3>
                    </span>
                    <Close className="cross" onClick={onClick} />
                </div>
                <div className="content">
                    <p>
                        Are you sure you want to delete your{" "}
                        <span> {collectionTitle} </span> collection?
                    </p>
                    <div className="buttons-wrap">
                        <button className="btn-border" onClick={onClick}>
                            Cancel
                        </button>
                        <Button value={"Delete"} onClick={deleteCollection} />
                    </div>
                </div>
            </Section>
        </Modal>
    );
};

const Modal = styled(motion.div)`
    position: fixed;
    overflow: none;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10000;
`;

const Section = styled.div`
    background-color: white;
    width: 380px;
    min-height: 260px;
    position: relative;

    .favorite-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        color: white;
        background-color: #ce4620;

        .flex-header {
            display: flex;
            justify-content: center;
            align-items: center;

            h3 {
                font-weight: bold;
            }

            .trash {
                margin: 0 -10px 0 10px;
            }
        }

        .cross {
            cursor: pointer;
            margin-right: 10px;
        }
    }

    .content {
        p {
            position: absolute;
            top: 35%;
            padding: 0 20px;
            line-height: 1.6rem;
            letter-spacing: 0.8px;
            word-wrap: break-word;
        }

        p > span {
            font-weight: bold;
        }

        .buttons-wrap {
            position: absolute;
            bottom: 0;
            left: 10%;
            display: flex;
            align-items: center;
            justify-content: start;
            margin-bottom: 20px;

            .btn-border {
                color: var(--main-color);
                text-decoration: none;
                padding: 14px 35px;
                outline: 2px solid #ce4620;
                font-weight: bold;
                border-radius: 5px;
                display: block;
                text-align: center;
                align-items: center;
                font-size: 14px;
                letter-spacing: 1.1px;
                cursor: pointer;
                border: none;
                margin-right: 16px;

                &:hover {
                    background-color: #ce4620;
                    color: white;
                }
            }
        }
    }
`;

export default RemoveModal;
