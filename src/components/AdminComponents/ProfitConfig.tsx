import {
  FastBackwardOutlined,
  FastForwardOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useState } from "react";

import * as Styled from './Style/ProfitConfig.styled';

const {Title} = Typography;

interface DailyProfit {
  date: string;
  level: string;
  profitPercentage: number;
}

const DailyProfitComponent: React.FC = () => {
  const levelRanges: Record<string, [number, number]> = {
    A: [1, 5],
    B: [1, 5],
    C: [2, 6],
    D: [2, 6],
    E: [5, 10],
  };

  const [dailyProfits, setDailyProfits] = useState<DailyProfit[]>(() => {
    const dummyData: DailyProfit[] = [];
    for (let i = 1; i <= 100; i++) {
      dummyData.push({
        date: `2024-05-${i < 10 ? "0" + i : i}`,
        level: String.fromCharCode(65 + (i % 5)),
        profitPercentage: Math.floor(Math.random() * 10) + 1,
      });
    }
    return dummyData;
  });

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByLevel, setSortByLevel] = useState<string>("All");

  const handleAdjustment = (date: string, newPercentage: number) => {
    const levelRange =
      levelRanges[
        dailyProfits.find((profit) => profit.date === date)?.level || "A"
      ];
    const [minRange, maxRange] = levelRange;
    const adjustedPercentage = Math.min(
      Math.max(newPercentage, minRange),
      maxRange
    );
    const updatedProfits = dailyProfits.map((profit) =>
      profit.date === date
        ? { ...profit, profitPercentage: adjustedPercentage }
        : profit
    );
    setDailyProfits(updatedProfits);
  };

  const handleSortByLevel = (selectedLevel: string) => {
    setSortByLevel(selectedLevel);
    setCurrentPage(1);
    if (selectedLevel !== "All") {
      const sortedProfits = dailyProfits.filter(
        (profit) => profit.level === selectedLevel
      );
      setDailyProfits(sortedProfits);
    }
  };

  const totalPages = Math.ceil(dailyProfits.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, dailyProfits.length);
  const currentProfits = dailyProfits.slice(startIndex, endIndex);

  return (
    <Styled.Layout>
      <Title>Daily Profit Percentage</Title>
      <Styled.Wrapper>
        <Styled.StyledLabel htmlFor="levelFilter">
          Sort by Level:
        </Styled.StyledLabel>
        <Styled.StyledSelect
          id="levelFilter"
          value={sortByLevel}
          onChange={(e) => handleSortByLevel(e.target.value)}
        >
          <option value="All">All Levels</option>
          <option value="A">Level A</option>
          <option value="B">Level B</option>
          <option value="C">Level C</option>
          <option value="D">Level D</option>
          <option value="E">Level E</option>
        </Styled.StyledSelect>
      </Styled.Wrapper>
      <Styled.table>
        <thead style={{ backgroundColor: "#f9fafb" }}>
          <tr>
            <Styled.th>Date</Styled.th>
            <Styled.th>Level</Styled.th>
            <Styled.th>Profit Percentage (Range)</Styled.th>
            <Styled.th>Adjustment</Styled.th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentProfits.map((profit) => (
            <tr key={profit.date}>
              <Styled.td>{profit.date}</Styled.td>
              <Styled.td>{profit.level}</Styled.td>
              <Styled.td>
                {profit.profitPercentage}% ({levelRanges[profit.level][0]} -
                {levelRanges[profit.level][1]})
              </Styled.td>
              <Styled.td>
                <Styled.input
                  type="number"
                  min={levelRanges[profit.level][0]}
                  max={levelRanges[profit.level][1]}
                  value={profit.profitPercentage}
                  onChange={(e) =>
                    handleAdjustment(profit.date, parseInt(e.target.value))
                  }
                />
                <Styled.button
                  onClick={() =>
                    handleAdjustment(profit.date, profit.profitPercentage)
                  }
                >
                  Adjust
                </Styled.button>
              </Styled.td>
            </tr>
          ))}
        </tbody>
      </Styled.table>

      <Styled.PaginationWrapper>
        <span style={{ fontWeight: 700 }}>
          Page {currentPage} of {totalPages}
        </span>

        <div>
          <Styled.StyledButton
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
            style={{ marginRight: "8px" }}
            icon={<StepBackwardOutlined />}
          ></Styled.StyledButton>
          <Styled.StyledButton
            onClick={() => setCurrentPage(totalPages)}
            icon={<FastBackwardOutlined />}
          ></Styled.StyledButton>
          <Styled.input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const pageNumber = parseInt(e.target.value);
              if (!isNaN(pageNumber)) {
                setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
              }
            }}
          />
          <Styled.StyledButton
            onClick={() => setCurrentPage(1)}
            style={{ marginRight: "8px" }}
            icon={<FastForwardOutlined />}
          ></Styled.StyledButton>
          <Styled.StyledButton
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            icon={<StepForwardOutlined />}
          ></Styled.StyledButton>
        </div>
        <div></div>
      </Styled.PaginationWrapper>
    </Styled.Layout>
  );
};

export default DailyProfitComponent;
