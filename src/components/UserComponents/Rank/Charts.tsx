import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  ChartConfig,
  eChartDaily,
  eChartMonthly,
  eChartWeekly,
} from "./ChartData";
import { Row, Select, Col, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { API } from "@/utils/api";
import { updateProfileField } from "@/app/profileSlice";

const RankChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartConfig>(eChartDaily);
  const [daily, setDaily]: any = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    let data: any = await API.get("/transactions/all/day");
    let obj = data.data.initialArrayDay;
    // let array = Object.keys(obj).map(key => ({[key]: obj[key]}));
    const setData = [
      {
        name: "Series 1",
        group: "apexcharts-axis-0",
        data: obj,
      },
    ];
    setDaily(setData);
  };

  const handleDateChange = async (value: unknown) => {
    switch (value) {
      case "day": {
        setLoading(true);
        setChartData(eChartDaily);
        let data: any = await API.get("/transactions/all/day");
        let obj = data.data.initialArrayDay;
        const setDailyData = [
          {
            name: "Series 1",
            group: "apexcharts-axis-0",
            data: obj,
          },
        ];
        setDaily(setDailyData);
        setLoading(false);
        break;
      }
      case "week": {
        setLoading(true);
        setChartData(eChartWeekly);
        let data: any = await API.get("/transactions/all/week");
        let obj = data.data.weekResult;
        // let array = Object.keys(obj).map(key => ({[key]: obj[key]}));
        const setWeekData = [
          {
            name: "Series 1",
            group: "apexcharts-axis-0",
            data: obj,
          },
        ];
        setDaily(setWeekData);
        setLoading(false);
        break;
      }
      case "month": {
        setLoading(true);
        setChartData(eChartMonthly);
        let data: any = await API.get("/transactions/all/month");
        let obj = data.data.monthResult;
        // let array = Object.keys(obj).map(key => ({[key]: obj[key]}));
        const setMonthData = [
          {
            name: "Series 1",
            group: "apexcharts-axis-0",
            data: obj,
          },
        ];
        setDaily(setMonthData);
        setLoading(false);
        break;
      }
    }
  };

  return (
    <>
      <Row justify="space-between" align={"middle"}>
        <Col className="w-100">
          <h2 style={{ paddingBottom: "15px" }}>Sales Analytics</h2>
        </Col>
        <Col>
          <Select
            defaultValue="day"
            onChange={handleDateChange}
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
            style={{ width: 100 }}
          />
        </Col>
      </Row>
      {loading ? (
        <></>
      ) : (
        <ReactApexChart
          options={chartData.options}
          series={daily}
          type="area"
          height={220}
        />
      )}
    </>
  );
};

export default RankChart;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
