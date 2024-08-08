import React, { useState } from "react";
import { Table, Button, Typography } from "antd";

import * as Styled from './Style/ReferralProgram.styled';

const {Title} = Typography;

interface User {
  id: number;
  name: string;
  sales: number;
  rank: string;
}

const RankManagementComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleGrantReward = (userId: number) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, rank: "Gold" } : user
    );
    setUsers(updatedUsers);
  };

  const handleRevokeReward = (userId: number) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, rank: "None" } : user
    );
    setUsers(updatedUsers);
  };

  const columns = [
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
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      sorter: (a: User, b: User) => a.sales - b.sales,
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: User) => (
        <span>
          {record.rank === "None" && (
            <Button
              onClick={() => handleGrantReward(record.id)}
              type="primary"
              className="mr-2"
            >
              Grant Reward
            </Button>
          )}
          {record.rank !== "None" && (
            <Button
              onClick={() => handleRevokeReward(record.id)}
              type="primary"
              danger
            >
              Revoke Reward
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <Styled.Layout>
      <Title>Rank Management</Title>
      <Table columns={columns} dataSource={users} />
    </Styled.Layout>
  );
};

export default RankManagementComponent;
