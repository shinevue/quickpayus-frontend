import React from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { TransactionType } from "@/types/TransactionType";
import { STATUS, TRANSACTION_TYPES } from "@/constants";
import { PaginationProps } from "antd/lib";
import moment from "moment";
interface Props {
  transactions: TransactionType[];
  paginationProps: PaginationProps;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
}

const TransactionTable: React.FC<Props> = ({
  transactions,
  paginationProps,
  handleApprove,
  handleReject,
}) => {
  // Define columns
  const columns: ColumnsType<TransactionType> = [
    {
      title: "Date",
      dataIndex: "date",
      render: (value) => moment(value).format("yyyy-MM-DD"),
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
      render: (_, transaction: TransactionType) => (
        <>
          {transaction.type === TRANSACTION_TYPES.WITHDRAWAL ||
          transaction.type === TRANSACTION_TYPES.DEPOSIT ? (
            <>
              {transaction.status === STATUS.PENDING ? (
                <>
                  <Button
                    type="primary"
                    onClick={() => handleApprove(transaction.transactionId)}
                    className="mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleReject(transaction.transactionId)}
                  >
                    Reject
                  </Button>
                </>
              ) : transaction.status === STATUS.APPROVED ? (
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

  return (
    <Table
      rowKey={(record) => record.transactionId}
      dataSource={transactions}
      columns={columns}
      pagination={paginationProps}
    />
  );
};

export default TransactionTable;
