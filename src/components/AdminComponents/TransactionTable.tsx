import React from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/lib/table";

interface Transaction {
  id: number;
  date: string;
  user: string;
  transactionId: string;
  type: string;
  amount: string;
  status: string;
}

interface Props {
  transactions: Transaction[];
  filterType: string;
  filterStatus: string;
  handleApprove: (id: number) => void;
  handleReject: (id: number) => void;
}

const TransactionTable: React.FC<Props> = ({
  transactions,
  filterType,
  filterStatus,
  handleApprove,
  handleReject,
}) => {
  // Define columns
  const columns: ColumnsType<Transaction> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      sorter: (a, b) => a.transactionId.localeCompare(b.transactionId),
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
      sorter: (a, b) =>
        parseFloat(a.amount.replace("$", "")) -
        parseFloat(b.amount.replace("$", "")),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, transaction: Transaction) => (
        <>
          {transaction.type === "Withdrawal" ||
          transaction.type === "Deposit" ? (
            <>
              {transaction.status === "Pending" ? (
                <>
                  <Button
                    type="primary"
                    onClick={() => handleApprove(transaction.id)}
                    className="mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleReject(transaction.id)}
                  >
                    Reject
                  </Button>
                </>
              ) : transaction.status === "Approved" ? (
                <span className="text-green-500">Already Approved</span>
              ) : (
                <span className="text-red-500">Rejected</span>
              )}
            </>
          ) : null}
        </>
      ),
    },
  ];

  // Apply filters to transactions
  const filteredTransactions = transactions.filter((transaction) => {
    if (filterType !== "All" && transaction.type !== filterType) return false;
    if (filterStatus !== "All" && transaction.status !== filterStatus)
      return false;
    return true;
  });

  return <Table dataSource={filteredTransactions} columns={columns} />;
};

export default TransactionTable;
