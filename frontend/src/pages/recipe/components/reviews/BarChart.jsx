import React, { useContext, useEffect, useMemo, useState } from "react";
import { BarChart, Bar } from "recharts";
import styled from "styled-components";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";
import { RecipeContext } from "../../Recipe";
import LineBreak from "../../../../common/LineBreak";

const BarChartComponent = () => {
  const { reviews, averageRate, starArray } = useContext(RecipeContext);
  const [fiveLength, setFiveLength] = useState(0);
  const [fourLength, setFourLength] = useState(0);
  const [threeLength, setThreeLength] = useState(0);
  const [twoLength, setTwoLength] = useState(0);
  const [oneLength, setOneLength] = useState(0);

  useEffect(() => {
    setFiveLength(reviews?.filter((review) => review.starRating === 4).length);
    setFourLength(reviews?.filter((review) => review.starRating === 3).length);
    setThreeLength(reviews?.filter((review) => review.starRating === 2).length);
    setTwoLength(reviews?.filter((review) => review.starRating === 1).length);
    setOneLength(reviews?.filter((review) => review.starRating === 0).length);
  }, []);

  const data = useMemo(() => {
    return [
      {
        name: "Star 1",
        pv: fiveLength,
        amt: reviews?.length - fiveLength,
      },
      {
        name: "Star 2",
        pv: fourLength,
        amt: reviews?.length - fourLength,
      },
      {
        name: "Star 3",
        pv: threeLength,
        amt: reviews?.length - threeLength,
      },
      {
        name: "Star 4",
        pv: twoLength,
        amt: reviews?.length - twoLength,
      },
      {
        name: "Star 5",
        pv: oneLength,
        amt: reviews?.length - oneLength,
      },
    ];
  }, [reviews, fiveLength, fourLength, threeLength, twoLength, oneLength]);

  return (
    <>
      <LineBreak className="line-break" />
      <Average>
        <div className="average-rate">
          <div className="rate-control">{starArray?.map((star) => star)}</div>
          <span>{averageRate?.toString()} out of 5</span>
        </div>
        <p>{reviews?.length} Ratings</p>
      </Average>
      <Chart>
        <div className="control">
          <div className="control-wrap">
            <p>5</p>
            <Star />
          </div>
          <div className="control-wrap">
            <p>4</p>
            <Star />
          </div>
          <div className="control-wrap">
            <p>3</p>
            <Star />
          </div>
          <div className="control-wrap">
            <p>2</p>
            <Star />
          </div>
          <div className="control-wrap">
            <p>1</p>
            <Star />
          </div>
        </div>
        <BarChartCustom
          width={170}
          height={170}
          data={data}
          margin={{
            right: 5,
            left: 6.5,
          }}
        >
          <Bar barSize={13} dataKey="pv" stackId="a" fill="var(--gold-color)" />
          <Bar barSize={13} dataKey="amt" stackId="a" fill="var(--grey-hover-color)" />
        </BarChartCustom>
        <div className="control">
          <div className="control-wrap">
            <span>{fiveLength}</span>
          </div>
          <div className="control-wrap">
            <span>{fourLength}</span>
          </div>
          <div className="control-wrap">
            <span>{threeLength}</span>
          </div>
          <div className="control-wrap">
            <span>{twoLength}</span>
          </div>
          <div className="control-wrap">
            <span>{oneLength}</span>
          </div>
        </div>
      </Chart>
      <LineBreak className="line-break" />
    </>
  );
};

const Average = styled.div`
  margin-bottom: 18px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  max-width: 100%;

  p {
    color: var(--main-color);
    font-size: 14px;
  }

  .average-rate {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    width: 182px;
    max-width: 100%;
    justify-content: space-between;

    .rate-control {
      margin-bottom: -5px;
    }

    span {
      color: var(--main-color);
      font-size: 14px;
      font-weight: 500;
    }

    svg {
      color: var(--red-color);
      font-size: 18px;
    }
  }
`;

const Chart = styled.div`
  margin: -28px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 170px;
  transform: scale(0.8);

  .control {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .control-wrap {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;

      p {
        color: var(--main-color);
        font-size: 16px;
      }

      span {
        margin-left: 6px;
        font-size: 14px;
        color: var(--grey-color);
      }

      svg {
        color: var(--red-color);
        font-size: 18px;
        margin: 0 6px;
      }
    }
  }
`;
const BarChartCustom = styled(BarChart)`
  transform: rotate(90deg);
`;

export default BarChartComponent;
