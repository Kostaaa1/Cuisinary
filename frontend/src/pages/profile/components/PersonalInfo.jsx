import { useAuth0 } from "@auth0/auth0-react";
import { KeyboardArrowDown, HttpsOutlined, SupervisorAccount } from "@material-ui/icons";
import { useContext } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../../../common/Loading";
import SectionInfo from "../../../common/SectionInfo";
import AuthContext from "../../../setup/app-context-menager/AuthContext";
import { useAuth } from "../../../setup/auth/useAuth";

const PersonalInfo = () => {
  const [clicked, setClicked] = useState(true);
  const [buttonSave, setButtonSave] = useState(false);
  const { user } = useAuth0();
  const { currentUser } = useAuth();
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [personalForm, setPersonalForm] = useState({
    firstName: "",
    lastName: "",
    zipCode: "",
    birthDate: {},
  });

  const handleForm = (e) => {
    if (e.target.value !== "") {
      setButtonSave(true);
    }
    const data = { ...personalForm, [e.target.id]: e.target.value };

    setPersonalForm(data);
  };

  const updateUser = async (personalForm) => {
    try {
      await fetch(`/api/user/${user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: personalForm,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const birthDate = {
      month: month.padStart(2, "0"),
      day: day.padStart(2, "0"),
      year: year,
    };

    let form = { ...personalForm, birthDate: birthDate };

    delete personalForm.month;
    delete personalForm.day;
    delete personalForm.year;

    await updateUser(form);

    window.location.reload();
  };

  return (
    <Form onSubmit={submitForm}>
      {!currentUser ? (
        <Loading />
      ) : (
        <>
          <div className="personal-section">
            <h1>Personal Info</h1>
            {buttonSave ? (
              <input type="submit" value={"SAVE CHANGES"} className={`btn-save highlight`} />
            ) : (
              <input type="submit" value={"SAVE CHANGES"} disabled className={`btn-save`} />
            )}
          </div>
          <SectionInfo
            value={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum assumenda, libero expedita at nesciunt magni enim impedit deserunt laborum soluta earum quidem repellendus, aliquid aspernatur."
            }
            icon={<HttpsOutlined />}
            text={"Only you can see the information on this page."}
          />
          <DynamicForm>
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
                      onChange={(e) => handleForm(e)}
                      id="email"
                      type="email"
                      readOnly={currentUser?.email !== ""}
                      placeholder={currentUser?.email}
                      className="email"
                    />
                  </div>
                  <HalfWrap>
                    <div className="input-wrapper half">
                      <label> First Name</label>
                      <input onChange={(e) => handleForm(e)} id="firstName" type="text" placeholder={"Taylor"} />
                    </div>
                    <div className="input-wrapper half">
                      <label> Last Name</label>
                      <input onChange={(e) => handleForm(e)} id="lastName" type="text" placeholder={"Smith"} />
                    </div>
                  </HalfWrap>
                  <HalfWrap>
                    <div className="input-wrapper date">
                      <label>Birth Date</label>
                      <div>
                        <input
                          onChange={(e) => {
                            setMonth(e.target.value), setButtonSave(true);
                          }}
                          id="month"
                          type="text"
                          min={"1"}
                          max={"12"}
                          placeholder="MM"
                          value={month}
                          maxLength={2}
                        />
                        <span>/</span>
                        <input
                          onChange={(e) => {
                            setDay(e.target.value), setButtonSave(true);
                          }}
                          type="text"
                          min={"1"}
                          max={"31"}
                          id="day"
                          value={day}
                          placeholder="DD"
                          maxLength={2}
                        />
                        <span>/</span>
                        <input
                          onChange={(e) => {
                            setYear(e.target.value), setButtonSave(true);
                          }}
                          type="text"
                          min={"1930"}
                          max={"2022"}
                          id="year"
                          placeholder="YYYY"
                          value={year}
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="input-wrapper half">
                      <label>ZIP Code</label>
                      <input onChange={(e) => handleForm(e)} id="zipCode" type="text" placeholder="ZIP Code" />
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

const Form = styled.form`
  width: 100%;
  padding: 8px 20px;
  position: relative;

  .personal-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-weight: bold;
      font-size: 2.2rem;
    }

    .btn-save {
      padding: 18px 35px;
      font-weight: bold;
      color: white;
      display: block;
      border: none;
      font-size: 12px;
      border-radius: 5px;
      letter-spacing: 1.1px;
      background-color: #d9d9d9;
    }

    .highlight {
      background-color: #ce4620;
      cursor: pointer;

      &:active {
        outline: 2px solid #003e9b;
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

const DynamicForm = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  border: 1px solid #b2b2b2;

  .head-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    user-select: none;

    svg {
      transition: all 0.2s 0s ease-in-out;
    }

    .click {
      transform: rotate(180deg);
    }
  }

  .input-container {
    padding: 1rem 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px 0;

    label {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 14px;
      /* font-size: 14px; */
    }

    input {
      width: 100%;
      height: 50px;
      padding: 0 10px;
      font-size: 14px;
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
