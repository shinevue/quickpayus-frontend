import React, { useState } from "react";
import TransactionTable from "./TransactionTable";

import * as Styled from './Style/Transactions.styled';
import { Typography } from "antd";
const {Title, Text} = Typography;

interface Transaction {
  id: number;
  date: string;
  user: string;
  transactionId: string;
  type: string;
  amount: string;
  status: string;
}

const TransactionPage: React.FC = () => {
  const [transactions] = useState<Transaction[]>([]); // Empty array since transactions are managed internally in TransactionTable component
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Dummy transactions data
  const dummyTransactions: Transaction[] = [
    {
      id: 1,
      date: "2024-05-12",
      user: "Alice",
      transactionId: "XYZ123",
      type: "Withdrawal",
      amount: "$100",
      status: "Approved",
    },
    {
      id: 2,
      date: "2024-05-13",
      user: "Bob",
      transactionId: "XYZ124",
      type: "Deposit",
      amount: "$200",
      status: "Pending",
    },
    {
      id: 3,
      date: "2024-05-14",
      user: "Charlie",
      transactionId: "XYZ125",
      type: "Profit",
      amount: "$150",
      status: "Rejected",
    },
  ];

  // Define empty functions for handleApprove and handleReject
  const handleApprove = (id: number) => {};
  const handleReject = (id: number) => {};

  return (
    <Styled.Layout>
      <Title>Transaction History Overview</Title>
      <Styled.Container>
        <div>
          <Text style={{marginRight: "8px"}}>
            Filter by Type:
          </Text>
          <Styled.StyledSelect
            id="typeFilter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Withdrawal">Withdrawal</option>
            <option value="Deposit">Deposit</option>
            <option value="Profit">Profit</option>
            <option value="Referral_Credit">Referral Credit</option>
          </Styled.StyledSelect>
        </div>
        <div>
          <Text style={{marginRight: "8px"}}>
            Filter by Status:
          </Text>
          <Styled.StyledSelect
            id="statusFilter"
           value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Styled.StyledSelect>
        </div>
      </Styled.Container>
      {/* Pass dummyTransactions as props to the TransactionTable component */}
      <TransactionTable
        transactions={dummyTransactions}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
    </Styled.Layout>
  );
};

export default TransactionPage;
