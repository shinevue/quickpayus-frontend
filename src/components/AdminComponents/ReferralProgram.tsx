import React, { useState } from "react";
import { Button, Input, Table, Typography } from "antd";

import * as Styled from './Style/ReferralProgram.styled';

const {Title} = Typography;

interface ReferralProgram {
  key: string;
  level: string;
  creditPercentage: number;
}

interface User {
  id: number;
  name: string;
  referredBy?: number;
}

const ReferralProgramComponent: React.FC = () => {
  const [referralProgram, setReferralProgram] = useState<ReferralProgram[]>([]);

  const [users, setUsers] = useState<User[]>([]);

  const handleAdjustCreditPercentage = (
    level: string,
    newPercentage: number
  ) => {
    const updatedReferralProgram = referralProgram.map((program) =>
      program.level === level
        ? { ...program, creditPercentage: newPercentage }
        : program
    );
    setReferralProgram(updatedReferralProgram);
  };

  const handleAddLevel = () => {
    const newLevel = `Level ${String.fromCharCode(
      65 + referralProgram.length
    )}`;
    setReferralProgram([
      ...referralProgram,
      { key: newLevel, level: newLevel, creditPercentage: 0 },
    ]);
  };

  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      sorter: (a: ReferralProgram, b: ReferralProgram) =>
        a.level.localeCompare(b.level),
    },
    {
      title: "Credit Percentage",
      dataIndex: "creditPercentage",
      key: "creditPercentage",
      sorter: (a: ReferralProgram, b: ReferralProgram) =>
        a.creditPercentage - b.creditPercentage,
    },
    {
      title: "Adjustment",
      dataIndex: "adjustment",
      key: "adjustment",
      render: (_: any, record: ReferralProgram) => (
        <div className="flex gap-4">
          <Input
            type="number"
            min="0"
            max="100"
            value={record.creditPercentage}
            onChange={(e) =>
              handleAdjustCreditPercentage(
                record.level,
                parseInt(e.target.value)
              )
            }
          />
          <Button
            type="primary"
            style={{borderRadius: "8px"}}
            onClick={() =>
              handleAdjustCreditPercentage(
                record.level,
                record.creditPercentage
              )
            }
          >
            Adjust
          </Button>
        </div>
      ),
    },
  ];

  const userDataColumns = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: User, b: User) => a.id - b.id,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: "Referred By",
      dataIndex: "referredBy",
      key: "referredBy",
      render: (referredBy: number | undefined) =>
        referredBy ? `User ${referredBy}` : "-",
      sorter: (a: User, b: User) => {
        if (a.referredBy === undefined && b.referredBy === undefined) return 0;
        if (a.referredBy === undefined) return -1;
        if (b.referredBy === undefined) return 1;
        return a.referredBy - b.referredBy;
      },
    },
  ];

  return (
    <Styled.Layout>
      <Title>Referral Program</Title>
      <div style={{marginBottom: "20px"}}>
        <Button onClick={handleAddLevel} type="primary" style={{borderRadius: "8px"}}>
          Add Level
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={referralProgram}
        pagination={false}
      />
      <div style={{marginTop: '40px'}}>
        <Title>User Referral Details</Title>
        <Table
          columns={userDataColumns}
          dataSource={users}
          pagination={false}
        />
      </div>
    </Styled.Layout>
  );
};

export default ReferralProgramComponent;
