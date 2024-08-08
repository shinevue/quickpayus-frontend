import React from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { RankType } from "@/types/RankType";
import { STATUS } from "@/constants";
import { PaginationProps } from "antd/lib";
import moment from "moment";

interface Props {
  ranks: RankType[];
  paginationProps: PaginationProps;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
}

const RankTable: React.FC<Props> = ({
  ranks,
  paginationProps,
  handleApprove,
  handleReject,
}) => {
  // Define columns
  const columns: ColumnsType<RankType> = [
    // {
    //   title: "User ID",
    //   dataIndex: "id",
    //   key: "id",
    //   sorter: (a, b) => a.id.localeCompare(b.id),
    // },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      render: (v) => {
        return `$${v}`;
      },
      sorter: (a, b) => a.sales - b.sales,
    },
    {
      title: "Direct Referrals",
      dataIndex: "directReferrals",
      key: "directReferrals",
      align: 'center',
      sorter: (a, b) => a.directReferrals - b.directReferrals,
    },
    {
      title: "Indirect Referrals",
      dataIndex: "indirectReferrals",
      key: "indirectReferrals",
      align: 'center',
      sorter: (a, b) => a.indirectReferrals - b.indirectReferrals,
    },
    {
      title: "Reward",
      dataIndex: "reward",
      key: "reward",
      render: (v) => {
        return `$${v}`;
      },
      sorter: (a, b) => a.reward - b.reward,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      sorter: (a, b) => a.rank.localeCompare(b.rank),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, rank: RankType) => {
        if (rank.status !== STATUS.PENDING)
          return moment(rank.date).format("YYYY-MM-DD HH:mm:ss");
      },
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    }
  ];

  return (
    <Table
      rowKey={(record) => `${record.rewardId}`}
      dataSource={ranks}
      columns={columns}
      pagination={paginationProps}
    />
  );
};

export default RankTable;
