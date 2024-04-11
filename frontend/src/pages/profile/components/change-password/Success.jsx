import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PasswordForm = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  return (
    <Form>
      <div className="h2-container">
        <h2>Thank You!</h2>
      </div>
      <div className="form">
        <p>We've sent password reset instructions to your email address.</p>
        <div>
          <div className="btn">
            <button onClick={() => loginWithRedirect()} className="button">
              BACK TO SIGN IN
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

const Form = styled.form`
  width: 330px;
  background: white;
  margin: 0 auto;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);

  .h2-container {
    display: flex;
    align-items: center;
    flex-direction: column;

    h2 {
      margin: 20px;
    }
  }

  .form {
    padding: 0 20px;

    p {
      font-size: 15px;
      margin-bottom: 8px;
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
