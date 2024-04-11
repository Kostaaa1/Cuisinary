import { useMemo } from 'react';
import styled from 'styled-components';

const PrepTime = ({ prepTime, setPrepTime, cookTime, setCookTime }) => {
  const handleInputChange = (e) => {
    const { name, value, id } = e.target;
    id === 'prep'
      ? setPrepTime((state) => ({
          ...state,
          [name]: value,
        }))
      : setCookTime((state) => ({
          ...state,
          [name]: value,
        }));
  };

  const total = useMemo(() => {
    if (prepTime.value === '' && cookTime.value === '') return '0';

    const timeUnits = {
      days: 0,
      hours: 0,
      minutes: 0,
    };

    const compute = (unit, value) => {
      timeUnits[unit] += parseInt(value);
    };

    if (prepTime.value !== '') {
      compute(prepTime.time, prepTime.value);
    }

    if (cookTime.value !== '') {
      compute(cookTime.time, cookTime.value);
    }

    if (timeUnits.minutes >= 60) {
      timeUnits.hours += Math.floor(timeUnits.minutes / 60);
      timeUnits.minutes %= 60;
    }

    if (timeUnits.hours >= 24) {
      timeUnits.days += Math.floor(timeUnits.hours / 24);
      timeUnits.hours %= 24;
    }

    return Object.entries(timeUnits)
      .map((v) => `${v[1]} ${v[0]}`)
      .filter((x) => x[0] !== '0')
      .map((v, i, arr) => (i === arr.length - 1 && arr.length !== 1 ? `and ${v}` : v))
      .join(' ');
  }, [prepTime, cookTime]);

  return (
    <TimeSection>
      <div className="field-wrap">
        <label htmlFor="prepTime">Prep Time</label>
        <div className="input-wrap">
          <input
            type="number"
            id="prep"
            name="value"
            placeholder="0"
            value={prepTime.value}
            onChange={handleInputChange}
          />
          <select
            name="time"
            id="prep"
            value={prepTime.time}
            onChange={handleInputChange}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>
        </div>
      </div>
      <div className="field-wrap">
        <label htmlFor="cookTime">Cook Time</label>
        <div className="input-wrap">
          <input
            id="cook"
            type="number"
            name="value"
            placeholder="0"
            value={cookTime.value}
            onChange={handleInputChange}
          />
          <select
            name="time"
            id="cook"
            value={cookTime.time}
            onChange={handleInputChange}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>
        </div>
      </div>
      <div className="field-wrap">
        <label>Total Time</label>
        <span> {total} </span>
      </div>
    </TimeSection>
  );
};

const TimeSection = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.16);
  padding: 20px 0;

  .field-wrap:not(.field-wrap:last-child) {
    margin: 12px 0;
  }

  .field-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;

    span {
      font-weight: 500;
      width: 376px;
      font-size: 14px;
    }

    .input-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      select {
        cursor: pointer;
        width: 300px;
        border: 1px solid var(--input-border-color);
        height: 46px;
        margin-left: 16px;
      }

      input {
        text-align: center;
        width: 60px;
        height: 100%;
      }
    }
  }
`;

export default PrepTime;
