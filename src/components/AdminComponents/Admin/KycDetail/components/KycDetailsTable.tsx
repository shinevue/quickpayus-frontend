import { useState } from "react";
import { Table, Button, Modal, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { User } from "./KycDetails";
import * as Styled from "../../../Style/UserDetails.styled";

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

interface Props {
  users: User[];
  approveKYC: (user: User) => void;
  rejectKYC: (user: User) => void;
  cancelKYC: (user: User) => void;
}

const UsersTable: React.FC<Props> = ({
  users,
  approveKYC,
  rejectKYC,
  cancelKYC,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalApprove, setModalApprove] = useState(false);
  const [modalReject, setModalReject] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

  // Handle click on Document Details button
  const handleDocumentDetailsClick = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleSortBy = (key: string) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "ascend" ? "descend" : "ascend");
    } else {
      setSortKey(key);
      setSortOrder("ascend");
    }
  };

  const sortedUsers = sortKey
    ? [...users].sort((a, b) => {
        const aValue = a[sortKey as keyof User];
        const bValue = b[sortKey as keyof User];
        if (sortOrder === "ascend") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
        }
      })
    : users;

  const columns = [
    {
      title: "First Name",
      dataIndex: ["userInfo", "firstName"],
      key: "firstName",
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: ["userInfo", "lastName"],
      key: "lastName",
      sorter: true,
    },
    {
      title: "User Name",
      dataIndex: ["userInfo", "username"],
      key: "username",
      sorter: true,
    },
    {
      title: "Country",
      dataIndex: ["userInfo", "country"],
      key: "country",
      sorter: true,
    },
    {
      title: "User Address",
      dataIndex: ["userInfo", "address"],
      key: "address",
      sorter: true,
    },
    {
      title: "Date of Birth",
      dataIndex: ["userInfo", "dateOfBirth"],
      key: "dateOfBirth",
      sorter: true,
    },
    {
      title: "Phone Number",
      dataIndex: ["userInfo", "phoneNumber"],
      key: "phoneNumber",
      sorter: true,
    },
    {
      title: "Verification Date",
      dataIndex: "verificationDate",
      key: "verificationDate",
      sorter: true,
    },
    {
      title: "Documentation Type",
      dataIndex: "documentationType",
      key: "documentationType",
      sorter: true,
    },
    {
      title: "Documentation Provided",
      key: "documentation",
      render: (text: string, record: User) => (
        <>
          <Button
            className="text-blue-500 hover:text-blue-700 underline"
            onClick={() => handleDocumentDetailsClick(record)}
          >
            More Detail
          </Button>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: User) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <Button
                type="primary"
                onClick={() => {
                  setSelectedUser(record);
                  setModalApprove(true);
                }}
                block
              >
                Approve
              </Button>
            ),
          },
          {
            key: "2",
            label: (
              <Button
                type="primary"
                danger
                onClick={() => {
                  setSelectedUser(record);
                  setModalReject(true);
                }}
                block
              >
                Reject
              </Button>
            ),
          },
        ];
        return (
          <span>
            {record.status === "PENDING" ? (
              <>
                <Dropdown menu={{ items }} placement="bottomCenter">
                  <Button block>Action</Button>
                </Dropdown>
              </>
            ) : record.status === "APPROVED" ? (
              <Button
                type="primary"
                danger
                onClick={() => {
                  setSelectedUser(record);
                  setModalCancel(true);
                }}
              >
                Cancel KYC
              </Button>
            ) : null}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
    },
  ];

  const handleConfirmApprove = () => {
    if (selectedUser) approveKYC(selectedUser);
    setModalApprove(false);
  };

  const handleCancelApprove = () => {
    setModalApprove(false);
  };

  const handleConfirmReject = () => {
    if (selectedUser) rejectKYC(selectedUser);
    setModalReject(false);
  };

  const handleCancelReject = () => {
    setModalReject(false);
  };

  const handleConfirmCancel = () => {
    if (selectedUser) cancelKYC(selectedUser);
    setModalCancel(false);
  };

  const handleCancelCancel = () => {
    setModalCancel(false);
  };
  return (
    <div>
      <Table
        id="no-selection"
        columns={columns}
        dataSource={sortedUsers}
        rowKey="id"
        onChange={(pagination, filters, sorter: any) => {
          if (sorter && sorter.columnKey && sorter.order) {
            handleSortBy(sorter.columnKey);
          }
        }}
      />
      <Modal
        title="Documentations Provided"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p className="text-md">
              <strong>Documentation Type:</strong>
              {selectedUser.documentationType}
            </p>
            <p className="text-md">
              <strong>User Id:</strong> {selectedUser.userInfo.username}
            </p>
            <p className="text-md">
              <strong>Image Provided:</strong>
              {selectedUser.images != undefined && (
                <>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <Styled.Card>
                        <img
                          crossOrigin="anonymous"
                          src={`${baseApiUrl}uploads/kyc/${selectedUser.userInfo.username}/${selectedUser.documents[0]}`}
                          alt="Front Side"
                          style={{ width: "100%" }}
                        />
                      </Styled.Card>
                      <Styled.Card>
                        <img
                          crossOrigin="anonymous"
                          src={`${baseApiUrl}uploads/kyc/${selectedUser.userInfo.username}/${selectedUser.documents[1]}`}
                          alt="Back Side"
                          style={{ width: "100%" }}
                        />
                      </Styled.Card>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Styled.Card>
                        <img
                          crossOrigin="anonymous"
                          src={`${baseApiUrl}uploads/kyc/${selectedUser.userInfo.username}/${selectedUser.images[0]}`}
                          alt="User Image"
                          style={{ width: "100%" }}
                        />
                      </Styled.Card>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div
                      style={{
                        width: "50%",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      Documents Images
                    </div>
                    <div
                      style={{
                        width: "50%",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      User Images for verify
                    </div>
                  </div>
                </>
              )}
            </p>
          </div>
        )}
      </Modal>
      <Modal
        title="Confirm Approve"
        visible={modalApprove}
        onOk={handleConfirmApprove}
        onCancel={handleCancelApprove}
      >
        <p>Are you sure you want to Approve this profile?</p>
      </Modal>
      <Modal
        title="Confirm Reject"
        visible={modalReject}
        onOk={handleConfirmReject}
        onCancel={handleCancelReject}
      >
        <p>Are you sure you want to Reject this profile?</p>
      </Modal>
      <Modal
        title="Confirm Cancel"
        visible={modalCancel}
        onOk={handleConfirmCancel}
        onCancel={handleCancelCancel}
      >
        <p>Are you sure you want to Cancel this profile?</p>
      </Modal>
    </div>
  );
};

export default UsersTable;
