import React, { useState } from "react";
import { Table, Select, Button, Input, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import * as Styled from "./Style/ClaimedRewards.styled";

const { Option } = Select;
const { Title } = Typography;

interface RewardData {
  user: string;
  claimedRewards: string;
  amount: string;
  status: string;
  date: string;
}

const ClaimedRewards: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchCriteria, setSearchCriteria] = useState<string>("user");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 15;

  const rewardsData: RewardData[] = []; // Dummy data for 200 people

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchCriteriaChange = (value: string) => {
    setSearchCriteria(value);
    setSearchQuery("");
  };

  const exportToCSV = () => {
    const csvRows: string[][] = [
      ["User", "Claimed Rewards", "Amount", "Status", "Date"],
      ...rewardsData.map((item) => [
        item.user,
        item.claimedRewards,
        item.amount,
        item.status,
        item.date,
      ]),
    ];

    const csvData: string = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "claimed_rewards.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      sorter: (a: RewardData, b: RewardData) => a.user.localeCompare(b.user),
    },
    {
      title: "Claimed Rewards",
      dataIndex: "claimedRewards",
      key: "claimedRewards",
      sorter: (a: RewardData, b: RewardData) =>
        a.claimedRewards.localeCompare(b.claimedRewards),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a: RewardData, b: RewardData) =>
        parseFloat(a.amount.slice(1)) - parseFloat(b.amount.slice(1)),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: RewardData, b: RewardData) =>
        a.status.localeCompare(b.status),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: RewardData, b: RewardData) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
  ];

  const filteredData = rewardsData.filter((item: any) =>
    item[searchCriteria].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredData.filter((reward) => {
    if (statusFilter === "all") {
      return true;
    } else {
      return reward.status === statusFilter;
    }
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <Styled.Layout id="no-selection">
      <Styled.Container>
        <Title level={2}>Claimed Rewards</Title>
        <Styled.StyledRow align="middle" justify="space-between">
          <Select
            value={searchCriteria}
            onChange={handleSearchCriteriaChange}
            style={{ width: 160 }}
          >
            <Option value="user">User</Option>
            <Option value="claimedRewards">Claimed Rewards</Option>
            <Option value="amount">Amount</Option>
            <Option value="status">Status</Option>
            <Option value="date">Date</Option>
          </Select>
          <Input
            placeholder={`Search by ${searchCriteria}...`}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 160 }}
          />
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            style={{ width: 160 }}
          >
            <Option value="all">All</Option>
            <Option value="approved">Approved</Option>
            <Option value="pending">Pending</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
          <Button
            onClick={exportToCSV}
            icon={<DownloadOutlined />}
            type="primary"
            style={{ width: 160, borderRadius: "8px" }}
          >
            Export CSV
          </Button>
        </Styled.StyledRow>
        <Styled.TableWrapper>
          <Table
            columns={columns}
            dataSource={currentItems}
            bordered
            className="w-full"
            pagination={{ pageSize: itemsPerPage }}
          />
        </Styled.TableWrapper>
      </Styled.Container>
    </Styled.Layout>
  );
};

export default ClaimedRewards;
