import React, { useState } from "react";
import { Card, Typography, InputNumber, Space, Row } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import * as Styled from "./Style/CreditPercentage.styled";

const { Title } = Typography;

const Data = [
  {
    LevelByAlphabet: "Level A",
    LevelsByNumber: [
      { Number: 1, Percentage: 2 },
      { Number: 2, Percentage: 7 },
      { Number: 3, Percentage: 1 },
      { Number: 4, Percentage: 7 },
      { Number: 5, Percentage: 10 },
    ],
  },
  {
    LevelByAlphabet: "Level B",
    LevelsByNumber: [
      { Number: 1, Percentage: 2 },
      { Number: 2, Percentage: 7 },
      { Number: 3, Percentage: 1 },
      { Number: 4, Percentage: 7 },
      { Number: 5, Percentage: 10 },
    ],
  },
  {
    LevelByAlphabet: "Level C",
    LevelsByNumber: [
      { Number: 1, Percentage: 2 },
      { Number: 2, Percentage: 7 },
      { Number: 3, Percentage: 1 },
      { Number: 4, Percentage: 7 },
      { Number: 5, Percentage: 10 },
    ],
  },
  {
    LevelByAlphabet: "Level C",
    LevelsByNumber: [
      { Number: 1, Percentage: 2 },
      { Number: 2, Percentage: 7 },
      { Number: 3, Percentage: 1 },
      { Number: 4, Percentage: 7 },
      { Number: 5, Percentage: 10 },
    ],
  },
  {
    LevelByAlphabet: "Level C",
    LevelsByNumber: [
      { Number: 1, Percentage: 2 },
      { Number: 2, Percentage: 7 },
      { Number: 3, Percentage: 1 },
      { Number: 4, Percentage: 7 },
      { Number: 5, Percentage: 10 },
    ],
  },
];

const CreditPercentage = () => {
  const [percentages, setPercentages] = useState(Data);

  const handlePercentageChange = (levelIndex, newPercentage) => {
    const updatedPercentages = [...percentages];
    updatedPercentages[levelIndex].LevelsByNumber[
      newPercentage.index
    ].Percentage = newPercentage.value;
    setPercentages(updatedPercentages);
  };

  const cardColors = [
    "var(--accent-blue)",
    "var(--accent-green)",
    "var(--accent-red)",
    "var(--accent-pink)",
    "var(--accent-purple)",
    "var(--accent-orange)",
    "var(--accent-indigo)",
  ];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    return cardColors[randomIndex];
  }

  return (
    <Styled.StyledContainer>
      <Title level={2} className="text-center mb-8">
        Credit Percentage
      </Title>
      <Styled.CardContainer>
        {percentages.map((item, index) => (
          <Styled.StyledCard key={index} style={{backgroundColor: `${getRandomColor()}`}}>
            <Styled.Header>{item.LevelByAlphabet}</Styled.Header>
            <hr />
            <Space direction="vertical" size={12} className="mt-5">
              {item.LevelsByNumber.map((level, idx) => (
                <Row
                  key={idx}
                  align="middle"
                  justify="space-between"
                >
                  <Styled.Item>
                    Level {level.Number}
                  </Styled.Item>
                  <InputNumber
                    value={level.Percentage}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      handlePercentageChange(index, { index: idx, value })
                    }
                    className="w-20"
                  />
                </Row>
              ))}
            </Space>
          </Styled.StyledCard>
        ))}
      </Styled.CardContainer>
    </Styled.StyledContainer>
  );
};

export default CreditPercentage;
