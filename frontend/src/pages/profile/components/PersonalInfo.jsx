import { KeyboardArrowDown, HttpsOutlined } from "@mui/icons-material";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Loading from "../../../common/Loading";
import SectionInfo from "../../../common/SectionInfo";
// import { useUser } from "../../../setup/auth/useAuth";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../../setup/auth/useAuth";

const PersonalInfo = ({ data: userData }) => {
  // useAddFixed(personalRef);
  const [clicked, setClicked] = useState(true);
  const [buttonSave, setButtonSave] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const personalRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    zipCode: "",
    email: "",
  });

  const [formBirthDate, setFormBirthDate] = useState({
    month: "",
    day: "",
    year: "",
  });

  useEffect(() => {
    if (userData) {
      const { firstName, lastName, email, zipCode, birthDate } = userData;
      const { month, day, year } = birthDate;

      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        zipCode: zipCode || "",
        email: email || "",
      });

      setFormBirthDate({
        month: month || "",
        day: day || "",
        year: year || "",
      });
    }
  }, [userData]);

  const submitForm = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    const { month, day, year } = formBirthDate;

    let birthDate = {
      month: month !== "" ? month.padStart(2, "0") : month,
      day: day !== "" ? day.padStart(2, "0") : day,
      year: year,
    };

    await axios.post(`/api/user/${userData?.email}`, {
      user: {
        ...formData,
        birthDate,
      },
    });
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "month" || name === "day" || name === "year") {
      setFormBirthDate((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setButtonSave(true);
  };

  return (
    <Form onSubmit={submitForm}>
      <div className="personal-section" ref={personalRef}>
        <h1>Personal Info</h1>
        {showLoading ? (
          <button className={"btn-save"}>
            <Loading className="scaled-loading" />
          </button>
        ) : (
          <>
            {buttonSave ? (
              <input
                type="submit"
                value={"SAVE CHANGES"}
                className={`btn-save highlight`}
              />
            ) : (
              <input
                type="submit"
                value={"SAVE CHANGES"}
                disabled
                className={`btn-save`}
              />
            )}
          </>
        )}
      </div>
      <SectionInfo
        value={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum assumenda, libero expedita at nesciunt magni enim impedit deserunt laborum soluta earum quidem repellendus, aliquid aspernatur."
        }
        icon={<HttpsOutlined />}
        text={
          "Only you can see the information on this page.  It will not be displayed for other users to see."
        }
      />
      <FormWrap>
        <div className="head-info" onClick={() => setClicked(!clicked)}>
          <h3>My Basic Info</h3>
          <KeyboardArrowDown className={clicked ? "click" : ""} />
        </div>
        {clicked && (
          <>
            <div className="input-container">
              <div className="input-wrapper">
                <label> Email Address*</label>
                <input
                  type="email"
                  readOnly={formData.email}
                  placeholder={formData.email}
                  className="email"
                />
              </div>
              <HalfWrap>
                <div className="input-wrapper half">
                  <label> First Name</label>
                  <input
                    onChange={handleInputChange}
                    name="firstName"
                    value={formData.firstName}
                    type="text"
                    placeholder={"Taylor"}
                  />
                </div>
                <div className="input-wrapper half">
                  <label> Last Name</label>
                  <input
                    onChange={handleInputChange}
                    name="lastName"
                    value={formData.lastName}
                    type="text"
                    placeholder={"Smith"}
                  />
                </div>
              </HalfWrap>
              <HalfWrap>
                <div className="input-wrapper date">
                  <label>Birth Date</label>
                  <div>
                    <input
                      onChange={handleInputChange}
                      name="month"
                      value={formBirthDate.month}
                      type="text"
                      min={"1"}
                      max={"12"}
                      placeholder="MM"
                      required={
                        (formBirthDate.day !== "" ||
                          formBirthDate.year !== "") &&
                        true
                      }
                      maxLength={2}
                    />
                    <span>/</span>
                    <input
                      onChange={handleInputChange}
                      value={formBirthDate.day}
                      name="day"
                      type="text"
                      min={"1"}
                      max={"31"}
                      required={
                        (formBirthDate.month !== "" ||
                          formBirthDate.year !== "") &&
                        true
                      }
                      placeholder="DD"
                      maxLength={2}
                    />
                    <span>/</span>
                    <input
                      onChange={handleInputChange}
                      name="year"
                      value={formBirthDate.year}
                      type="text"
                      min={"1930"}
                      max={"2022"}
                      placeholder="YYYY"
                      required={
                        (formBirthDate.month !== "" ||
                          formBirthDate.day !== "") &&
                        true
                      }
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="input-wrapper half">
                  <label>ZIP Code</label>
                  <input
                    onChange={handleInputChange}
                    name="zipCode"
                    value={formData.zipCode}
                    type="text"
                    placeholder="ZIP Code"
                  />
                </div>
              </HalfWrap>
            </div>
          </>
        )}
      </FormWrap>
    </Form>
  );
};

const Form = styled.form`
  .personal-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-weight: bold;
      font-size: 38px;
      letter-spacing: -0.9px;
    }

    .btn-save {
      position: relative;
      width: 200px;
      height: 60px;
      font-size: 12px;
      font-weight: bold;
      color: white;
      background-color: #d9d9d9;
      display: block;
      border: none;
      border-radius: 3px;
      letter-spacing: 1.2px;

      .scaled-loading {
        transform: scale(0.8) !important;
      }
    }

    .highlight {
      background-color: var(--red-color);
      cursor: pointer;

      &:active {
        outline: 2px solid var(--blue-color);
        border-radius: 5px;
        outline-offset: 1px;
      }
    }
  }
`;

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

const FormWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 22px 0;
  font-size: 20px;
  border: 1px solid var(--input-border-color);

  .head-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    user-select: none;

    h3 {
      margin: 20px 0;
      font-size: 22px;
    }

    svg {
      transition: all 0.2s 0s ease-in-out;
    }

    .click {
      transform: rotate(180deg);
    }
  }

  .input-container {
    padding: 1rem 2rem;
    border-top: 1px solid var(--input-border-color);
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px 0;

    label {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 14px;
    }

    input {
      width: 100%;
      height: 50px;
      padding: 0 10px;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid var(--input-border-color);

      &:focus {
        outline: none;
      }
    }

    .email {
      border: 1px solid #b2b2b2;
    }
  }

  h3 {
    margin: 20px 0;
  }
`;

export default PersonalInfo;
