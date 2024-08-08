import React, { useEffect, useState, useCallback } from "react";
import { TransactionType } from "@/types/TransactionType";
import * as Styled from "@/components/AdminComponents/Style/Transactions.styled";
import { fetchTransactionAsync } from "@/app/actions/transactionAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { selectTranctions } from "@/app/slices/transactionSlice";
import { STATUS, TRANSACTION_TYPES } from "@/constants";
import { TablePaginationConfig } from "antd/lib";
import { selectTransactionsCount } from "@/app/selectors";
import { DownloadOutlined } from "@ant-design/icons";

import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/lib/table";
import moment from "moment";

const TransctionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();

  const transactionState = useSelector(selectTranctions);
  const totalCount = useSelector(selectTransactionsCount);

  useEffect(() => {
    setTransactions(transactionState);
  }, [transactionState]);

  useEffect(() => {
    dispatch(
      fetchTransactionAsync({ type: filterType, status: filterStatus, page })
    );
  }, [filterType, filterStatus]);

  const paginationProps: TablePaginationConfig = {
    position: ["bottomRight"],
    total: totalCount,
    showSizeChanger: false,
    current: page,
    pageSize: 15,
    onChange(page) {
      setPage(page);
      dispatch(
        fetchTransactionAsync({ type: filterType, status: filterStatus, page })
      );
    },
  };

  const exportToCSV = useCallback(() => {
    const csvRows: string[][] = [
      [
        "Userid",
        "Date",
        "Username",
        "TransactionId",
        "Type",
        "Amount",
        "Status",
      ],
      ...transactions.map((item) => [
        item._id.toString(),
        item.date.toString(),
        item.user.toString(),
        item.transactionId.toString(),
        item.type.toString(),
        item.amount.toString(),
        item.status.toString(),
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
  }, [transactions]);

  const columns: ColumnsType<TransactionType> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (value) => moment(value).format("yyyy-MM-DD"),
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (v) => `$${v}`,
      sorter: (a, b) =>
        parseFloat(a.amount.replace("$", "")) -
        parseFloat(b.amount.replace("$", "")),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v) => {
        switch (v) {
          case STATUS.APPROVED:
            return <Tag color="green">Approved</Tag>;
          case STATUS.PENDING:
            return <Tag color="blue">Pending</Tag>;
          case STATUS.REJECTED:
            return <Tag color="red">Rejected</Tag>;
          default:
            return <Tag color="gray">Unknown</Tag>;
        }
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
  ];

  return (
    <>
      <Styled.Header>Transaction History</Styled.Header>
      <Styled.Container>
        <div>
          <Styled.StyledLabel htmlFor="typeFilter">
            Filter by Type:
          </Styled.StyledLabel>
          <Styled.StyledSelect
            id="typeFilter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value={TRANSACTION_TYPES.WITHDRAWAL}>Withdrawal</option>
            <option value={TRANSACTION_TYPES.DEPOSIT}>Deposit</option>
            <option value={TRANSACTION_TYPES.PROFIT}>Profit</option>
            <option value={TRANSACTION_TYPES.REFERRAL_CREDIT}>
              Referral Credit
            </option>
          </Styled.StyledSelect>
        </div>
        <div>
          <Styled.StyledLabel htmlFor="statusFilter">
            Filter by Status:
          </Styled.StyledLabel>
          <Styled.StyledSelect
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value={STATUS.PENDING}>Pending</option>
            <option value={STATUS.APPROVED}>Approved</option>
            <option value={STATUS.REJECTED}>Rejected</option>
          </Styled.StyledSelect>
        </div>
        <Button
          onClick={exportToCSV}
          icon={<DownloadOutlined />}
          type="primary"
          style={{ width: 160 }}
        >
          Export CSV
        </Button>
      </Styled.Container>

      <Table
        rowKey={(record) => record.transactionId}
        dataSource={transactions}
        columns={columns}
        pagination={paginationProps}
      />
    </>
  );
};

export default TransctionHistory;
