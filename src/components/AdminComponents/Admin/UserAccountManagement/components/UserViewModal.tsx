import React from "react";
import { Modal, Tag } from "antd";
import { STATUS } from "@/constants";
import { User } from "@/types/UserType";

interface UserViewModalProps {
  visible: boolean;
  userInfo: User;
  setVisible: (visible: boolean) => void;
}
const UserViewModal: React.FC<UserViewModalProps> = ({
  visible,
  setVisible,
  userInfo,
}) => {
  function statusString(v: string) {
    switch (v) {
      case STATUS.APPROVED:
        return <Tag color="success">verified</Tag>;
      case STATUS.PENDING:
        return <Tag color="warning">pending</Tag>;
      case STATUS.REJECTED:
        return <Tag color="error">unverified</Tag>;
      default:
        return <Tag color="error">unverified</Tag>;
    }
  }
  return (
    <Modal
      title="View detail"
      open={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <div>
        Full Name: <span>{userInfo.name}</span>
      </div>
      <div>
        Username: <span>{userInfo.username}</span>
      </div>
      <div>
        Email: <span>{userInfo.email}</span>
      </div>
      <div>
        KYC: <span>{statusString(userInfo.status)}</span>
      </div>
      <div>
        Balance: <span>{userInfo.accountBalance}</span>
      </div>
      <div>
        Balance: <span>{userInfo.equityBalance}</span>
      </div>
      <div>
        Balance: <span>{userInfo.depositBalance}</span>
      </div>
      <div>
        Balance: <span>{userInfo.profitBalance}</span>
      </div>
      <div>
        Profit: <span>{userInfo.creditBalance}</span>
      </div>
      <div>
        VerificationDate:{" "}
        <span>{userInfo.verificationDate || "unverified"}</span>
      </div>
    </Modal>
  );
};

export default UserViewModal;
