import React, { useState } from "react";

import { Table, Modal, Dropdown, Space, MenuProps, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DownOutlined } from "@ant-design/icons";
import { User } from "@/types/UserType";

import { STATUS } from "@/constants";
interface Props {
  users: User[];
  paginationProps: any;
  handleViewUser: (id: number) => void;
  handleEditUser: (id: number) => void;
  handleSuspendUser: (id: number) => void;
  handleActiveUser: (id: number) => void;
  handleDeleteUser: (id: number) => void;
}

const UsersTable: React.FC<Props> = ({
  users,
  paginationProps,
  handleViewUser,
  handleEditUser,
  handleSuspendUser,
  handleDeleteUser,
  handleActiveUser,
}) => {
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalSuspend, setModalSuspend] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  const genItems = (record: any) => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: <a onClick={() => handleViewUser(record.id)}>View</a>,
      },
      {
        key: "2",
        label: (
          <a
            onClick={() => {
              setUserId(record.id);
              handleEditUser(record.id);
            }}
          >
            Edit
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            onClick={() => {
              setUserId(record.id);
              record.isActive ? setModalSuspend(true) : setModalActive(true);
            }}
          >
            {record.isActive ? "Suspend" : "Active"}
          </a>
        ),
      },
      {
        key: "4",
        label: (
          <a
            onClick={() => {
              setUserId(record.id);
              setModalDelete(true);
            }}
          >
            Delete
          </a>
        ),
      },
    ];
    return items;
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a: User, b: User) => {
        if (!a.username || !b.username) return 0;
        return a.username.localeCompare(b.username);
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: User, b: User) => {
        if (!a.email || !b.email) return 0;
        return a.email.localeCompare(b.email);
      },
    },
    {
      title: "Account Balance",
      dataIndex: "accountBalance",
      key: "accountBalance",
      align: "center" as const,
      sorter: (a: User, b: User) => a.accountBalance - b.accountBalance,
    },
    {
      title: "Equity Balance",
      dataIndex: "equityBalance",
      key: "equityBalance",
      align: "center" as const,
      sorter: (a: User, b: User) => a.equityBalance - b.equityBalance,
    },
    {
      title: "Deposit Balance",
      dataIndex: "depositBalance",
      key: "depositBalance",
      align: "center" as const,
      sorter: (a: User, b: User) => a.depositBalance - b.depositBalance,
    },
    {
      title: "Profit Balance",
      dataIndex: "profitBalance",
      key: "profitBalance",
      align: "center" as const,
      sorter: (a: User, b: User) => a.profitBalance - b.profitBalance,
    },
    {
      title: "Credit Balance",
      dataIndex: "profitBalance",
      key: "profitBalance",
      align: "center" as const,
      sorter: (a: User, b: User) => a.profitBalance - b.profitBalance,
    },
    {
      title: "Reward Balance",
      dataIndex: "rewardBalance",
      key: "rewardBalance",
      align: "center" as const,
      sorter: (a: User, b: User) => a.rewardBalance - b.rewardBalance,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v: string) => {
        switch (v) {
          case STATUS.APPROVED:
            return <Tag color="success">verified</Tag>;
          case STATUS.PENDING:
            return <Tag color="warning">pending</Tag>;
          case STATUS.REJECTED:
            return <Tag color="error">N/A</Tag>;
          default:
            return <Tag color="error">N/A</Tag>;
        }
      },
      sorter: (a: User, b: User) =>
        (a.status || "").localeCompare(b.status || ""),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (v: boolean) => {
        return v ? (
          <Tag color="success">Active</Tag>
        ) : (
          <Tag color="error">Inactive</Tag>
        );
      },
      sorter: (a: User, b: User) => {
        if (a.isActive) return 1;
        if (b.isActive) return -1;
        return 0;
      },
    },
    {
      title: "Verification Date",
      dataIndex: "verificationDate",
      key: "verificationDate",
      sorter: (a: User, b: User) => {
        if (!a.verificationDate || !b.verificationDate) return 0;
        return a.verificationDate.localeCompare(b.verificationDate);
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      render: (item: any) => (
        <Space size="middle" style={{ width: "90px" }}>
          <Dropdown menu={{ items: genItems(item) }}>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleConfirmDelete = () => {
    handleDeleteUser(userId);
    setModalDelete(false);
    setUserId(0);
  };

  const handleCancelDelete = () => {
    setModalDelete(false);
  };

  const handleConfirmSuspend = () => {
    handleSuspendUser(userId);
    setModalSuspend(false);
    setUserId(0);
  };

  const handleCancelSuspend = () => {
    setModalSuspend(false);
  };

  const handleConfirmActive = () => {
    handleActiveUser(userId);
    setModalActive(false);
    setUserId(0);
  };

  const handleCancelActive = () => {
    setModalActive(false);
  };

  return (
    <>
      <Table
        bordered
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={paginationProps}
      />
      <Modal
        title="Confirm Deletion"
        open={modalDelete}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this profile?</p>
      </Modal>
      <Modal
        title="Confirm Suspend"
        open={modalSuspend}
        onOk={handleConfirmSuspend}
        onCancel={handleCancelSuspend}
      >
        <p>Are you sure you want to Suspend this profile?</p>
      </Modal>
      <Modal
        title="Confirm Active"
        open={modalActive}
        onOk={handleConfirmActive}
        onCancel={handleCancelActive}
      >
        <p>Are you sure you want to Active this profile?</p>
      </Modal>
    </>
  );
};

export default UsersTable;
