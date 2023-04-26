import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../common/Logo";
import { useAuth0 } from "@auth0/auth0-react";

const PasswordForm = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const passwordFormSubmit = (e) => {
    e.preventDefault();

    var options = {
      method: "POST",
      url: "https://dev-uzhb4mgtlm3ac7mi.eu.auth0.com/dbconnections/change_password",
      headers: { "content-type": "application/json" },
      data: {
        client_id: "LWAyzb9ustA8ktJ2j3tsFGiPUBj5zf5X",
        email: email,
        connection: "Username-Password-Authentication",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setEmail("");

    navigate("/account/forgot-password-success");
  };

  return (
    <>
      <Header>
        <Logo />
        <div>
          <p>
            Don't have an account? <span onClick={() => loginWithRedirect()}>Sign Up</span>{" "}
          </p>
        </div>
      </Header>
      <Form onSubmit={passwordFormSubmit}>
        <div className="h2-container">
          <h2>Reset password</h2>
        </div>
        <div className="form">
          <p>Please enter the email you're using for your account.</p>
          <div className="input-control">
            <label>Email address</label>
            <input type="email" placeholder="yourname@example.com" onChange={(e) => setEmail(e.target.value)} />
            <div className="btn">
              <button className="button">CONTINUE</button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  margin: 20px auto 50px auto;

  p {
    font-size: 14px;
  }

  span {
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: #f27121;

    &:hover {
      text-decoration: underline;
      text-decoration-color: #f27121;
      text-underline-offset: 5px;
      text-decoration-thickness: 10%;
    }
  }
`;

const Form = styled.form`
  width: 330px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background: white;
  margin: 0 auto;
  height: 280px;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.3);

  .h2-container {
    display: flex;
    align-items: center;
    flex-direction: column;

    h2 {
      font-size: 22px;
      margin: 18px;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 0 20px;

    p {
      font-size: 15px;
      margin-bottom: 8px;
    }

    label {
      font-size: 14px;
      font-weight: 600;
    }

    input {
      margin-top: 8px;
      width: 100%;
      height: 50px;
      padding: 0 15px;
      font-size: 14px;
    }

    .btn {
      display: flex;
      justify-content: center;
      padding: 20px 0;
    }

    .button {
      padding: 18px 35px;
      font-weight: bold;
      color: white;
      display: block;
      width: 100%;
      border: none;
      font-size: 12px;
      border-radius: 3px;
      letter-spacing: 1.1px;
      background-color: var(--red-color);
      cursor: pointer;

      &:active {
        outline: 2px solid var(--blue-color);
        border-radius: 3px;
        outline-offset: 1px;
      }
    }
  }
`;

export default PasswordForm;
