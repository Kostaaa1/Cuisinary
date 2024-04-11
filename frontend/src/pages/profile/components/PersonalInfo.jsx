import { KeyboardArrowDown, HttpsOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Loading from '../../../common/Loading';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import SectionHeader from '../../../common/SectionHeader';
import LineBreak from '../../../common/LineBreak';

const PersonalInfo = () => {
  const [clicked, setClicked] = useState(true);
  const [buttonSave, setButtonSave] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    email: '',
  });

  const [formBirthDate, setFormBirthDate] = useState({
    month: '',
    day: '',
    year: '',
  });

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user-data', user?.email]);

  useEffect(() => {
    if (userData) {
      const { firstName, lastName, email, zipCode, birthDate } = userData;
      const { month, day, year } = birthDate;

      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        zipCode: zipCode || '',
        email: email || '',
      });

      setFormBirthDate({
        month: month || '',
        day: day || '',
        year: year || '',
      });
    }
  }, [userData]);

  const submitForm = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    const { month, day, year } = formBirthDate;

    let birthDate = {
      month: month !== '' ? month.padStart(2, '0') : month,
      day: day !== '' ? day.padStart(2, '0') : day,
      year: year,
    };

    await axios.post(`/api/user/${userData?.email}`, {
      user: {
        ...formData,
        birthDate,
      },
    });

    queryClient.refetchQueries(['user-data', user?.email]);
    queryClient.refetchQueries(['context-user']);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'month' || name === 'day' || name === 'year') {
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
    <form onSubmit={submitForm}>
      <SectionHeader
        title="Personal Info"
        text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt omnis aut voluptate veritatis veniam quos libero praesentium obcaecati iure ratione."
        span="Only you can see the information on this page.  It will not be displayed for other users to see."
        icon={<HttpsOutlined />}
        showLoading={showLoading}
        buttonSave={buttonSave}
        buttonValue="SAVE CHANGES"
      />
      <FormWrap>
        <div className="head-info" onClick={() => setClicked(!clicked)}>
          <h3>My Basic Info</h3>
          <KeyboardArrowDown className={clicked ? 'click' : ''} />
        </div>
        {clicked && (
          <>
            <div className="input-container">
              <div className="input-wrapper">
                <label>Email Address*</label>
                <input
                  type="email"
                  readOnly={userData?.email}
                  placeholder={userData?.email}
                  disabled
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
                    maxLength={18}
                    placeholder={'Taylor'}
                  />
                </div>
                <div className="input-wrapper half">
                  <label> Last Name</label>
                  <input
                    onChange={handleInputChange}
                    name="lastName"
                    value={formData.lastName}
                    type="text"
                    maxLength={18}
                    placeholder={'Smith'}
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
                      min={'1'}
                      max={'12'}
                      placeholder="MM"
                      required={
                        (formBirthDate.day !== '' || formBirthDate.year !== '') && true
                      }
                      maxLength={2}
                    />
                    <span>/</span>
                    <input
                      onChange={handleInputChange}
                      value={formBirthDate.day}
                      name="day"
                      type="text"
                      min={'1'}
                      max={'31'}
                      required={
                        (formBirthDate.month !== '' || formBirthDate.year !== '') && true
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
                      min={'1930'}
                      max={'2022'}
                      placeholder="YYYY"
                      required={
                        (formBirthDate.month !== '' || formBirthDate.day !== '') && true
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
    </form>
  );
};

const HalfWrap = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 729px) {
    display: block;
  }

  .half {
    width: 48%;

    @media screen and (max-width: 729px) {
      width: 100%;
    }
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
  border: 1px solid var(--input-border-color);

  .head-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    user-select: none;

    h3 {
      margin: 20px 0;
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
    }

    input {
      width: 100%;
      height: 50px;
      padding: 0 10px;
      font-weight: 500;
      border: 1px solid var(--input-border-color);

      &:focus {
        outline: none;
      }
    }
  }
`;

export default PersonalInfo;
