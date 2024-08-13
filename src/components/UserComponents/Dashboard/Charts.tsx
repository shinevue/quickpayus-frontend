import React, { useCallback, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import { Row, Col } from "antd";
import * as Styled from "./Style/Dashboard.styled";
import {
  daily,
  defaultXValue,
  monthly,
  weekly,
} from "./ChartData";
import { useFetchBalanceAnalticsForChartQuery } from "@/app/slice";


type props = {
  analytics: any;
};

const EChart: React.FC<props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [balanceFrame, setBalanceFrame] = useState<string>("profits");
  const [timeFrame, setTimeFrame] = useState<string>("day");
  const [chartOption, setChartOption] = useState<any>(daily);
  const [chartData, setChartData] = useState([
    {
      name: "Sales",
      data: Array.from({ length: 31 }, () => 0),
      color: "#7e7e7e",
    },
  ]);

  const fetchResult = useFetchBalanceAnalticsForChartQuery({
    balanceFrame,
    timeFrame,
  });

  const handleBalanceChange = useCallback((value: any): void => {
    setBalanceFrame(value);

    setLoading(true);
  }, []);

  const handleTimeChange = useCallback((value: any): void => {
    switch (value) {
      case "day":
        setChartData([
          {
            name: "Sales",
            data: Array.from({ length: 31 }, () => 0),
            color: "#7e7e7e",
          },
        ]);
        setChartOption(daily);
        break;
      case "month":
        setChartData([
          {
            name: "Sales",
            data: Array.from({ length: 12 }, () => 0),
            color: "#7e7e7e",
          },
        ]);
        setChartOption(monthly);
        break;
      case "week":
        setChartOption(weekly);
        break;
    }
    setTimeFrame(value);

    setLoading(true);
  }, []);

  useEffect(() => {
    if (
      fetchResult.isSuccess &&
      fetchResult.data.length == defaultXValue[timeFrame as keyof typeof defaultXValue].length
    ) {
      setChartData([
        {
          name: "Sales",
          data: fetchResult.data,
          color: "#7e7e7e",
        },
      ]);
      setLoading(false);
    }
  }, [fetchResult]);

  useEffect(() => {
    fetchResult.refetch();
  }, [balanceFrame, timeFrame]);

  return (
    <>
      <Row justify="space-between" align={"middle"}>
        <Col className="w-100">
          <Styled.ChartHeading>Analytics</Styled.ChartHeading>
        </Col>
        <Styled.SelectCol>
          <Styled.ChartSubjectSelect
            onChange={handleBalanceChange}
            value={balanceFrame}
            options={[
              { value: "profits", label: "Profits" },
              { value: "credits", label: "Credits" },
              { value: "rewards", label: "Rewards" },
            ]}
          />
          <Styled.ChartDateSelect
            defaultValue="day"
            onChange={handleTimeChange}
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
        </Styled.SelectCol>
      </Row>
      {loading ? (
        <></>
      ) : (
        <div className="chart-container">
          <ReactApexChart
            className="bar-chart"
            options={chartOption.options}
            series={chartData}
            type="bar"
            height={220}
          />
        </div>
      )}
    </>
  );
};

export default EChart;
