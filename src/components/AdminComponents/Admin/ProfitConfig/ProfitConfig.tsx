import React, { useEffect, useState } from "react";
import { Button, Modal, Alert, Typography, List } from "antd";

import { getCurrentProfit, upsertProfitConfig } from "./ProfitConfigApi";

import * as Styled from "./ProfitConfig.styled";
import moment from "moment";

interface DailyProfit {
  level: string;
  profitPercentage: number;
}

const { Title, Text } = Typography;

const DailyProfitComponent: React.FC = () => {
  const defaultRange: Record<string, [number, number]> = {
    A: [1, 5],
    B: [1, 5],
    C: [2, 6],
    D: [2, 6],
    E: [5, 10],
  };
  const [currentProfit, setcurrentProfit] = useState<number[]>([2, 3, 4, 5, 6]); //currently
  const [profitHistory, setProfitHistory] = useState([]);

  const [dailyProfits, setDailyProfits] = useState<DailyProfit[]>(() => {
    const dummyData: DailyProfit[] = [];
    for (let i = 0; i < 5; i++) {
      dummyData.push({
        level: String.fromCharCode(65 + i),
        profitPercentage: currentProfit[i],
      });
    }
    return dummyData;
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAdjustment = (level: string, newPercentage: number) => {
    const adjustedPercentage = Math.min(Math.max(newPercentage, -10), 100);
    const updatedProfits = dailyProfits.map((profit) =>
      profit.level === level
        ? { ...profit, profitPercentage: adjustedPercentage }
        : profit
    );
    setDailyProfits(updatedProfits);
  };

  const handleSubmit = async () => {
    setConfirmLoading(true);
    const profits = dailyProfits.map((profit) => profit.profitPercentage);
    const result = await upsertProfitConfig(profits);
    if (result.success === true) {
      setcurrentProfit(profits);
      setOpen(false);
    } else {
      setError(result.message);
    }
    fetchData();
    setConfirmLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getCurrentProfit();

    const { data: profit, history } = res;

    if (profit.length) {
      setcurrentProfit(profit);
      setDailyProfits(
        profit.map((pro: number, idx: number) => ({
          level: String.fromCharCode(65 + idx),
          profitPercentage: pro,
        }))
      );
    }
    if (history.length) {
      const temp = history.map((item, index) => {
        if (index == history.length-1) return item;
        else return { ...item, oldProfit: history[index + 1].profit };
      });

      setProfitHistory(temp);
    }
  };

  return (
    <div>
      <Styled.Layout>
        <Styled.Header>Profit Settings</Styled.Header>
        <table className="min-w-full divide-y divide-gray-200 text-center">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profit Percentage
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Default Range
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adjustment
              </th>
            </tr>
          </thead>
          <tbody className="">
            {dailyProfits.map((profit, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 ">
                  Level {profit.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 ">
                  {`${currentProfit[index]}%`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 ">
                  {`${defaultRange[profit.level][0]} ~ ${
                    defaultRange[profit.level][1]
                  }`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 ">
                  <input
                    type="number"
                    min={-10}
                    max={100}
                    className="border border-gray-300 bg-transparent rounded px-3 py-1 mr-2"
                    value={profit.profitPercentage}
                    onChange={(e) =>
                      handleAdjustment(profit.level, parseInt(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-10 flex justify-end">
          <Button
            style={{ borderRadius: "8px" }}
            type="primary"
            onClick={showModal}
          >
            Submit
          </Button>
        </div>
        <Modal
          title="Are you sure that this profit percentage?"
          open={open}
          onOk={handleSubmit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          {dailyProfits.map((profit, index) => (
            <p
              className="px-10 py-1"
              key={index}
            >{`Level ${profit.level} : ${profit.profitPercentage}%`}</p>
          ))}
          {error && <Alert type="error" message={error} banner />}
        </Modal>
      </Styled.Layout>
      <Styled.Layout>
        <Title level={3} style={{ marginBottom: "16px" }}>
          Profit Logs:
        </Title>
        {profitHistory.length === 0 ? (
          <Text>No profit changed yet.</Text>
        ) : (
          <List
            dataSource={profitHistory}
            renderItem={(announcement: any) => (
              <List.Item>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    new profit: {announcement.profit.join(",")}
                  </p>
                  {announcement?.oldProfit && (
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginTop: "4px",
                      }}
                    >
                      old profit: {announcement.oldProfit.join(",")}
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    Sender ID: {announcement.userId}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    Timestamp:{" "}
                    {moment(announcement.createdAt).format("YYYY-MM-DD HH:mm")}
                  </p>
                </div>
              </List.Item>
            )}
          />
        )}
      </Styled.Layout>
    </div>
  );
};

export default DailyProfitComponent;
