import React, { useEffect, useState } from "react";
import { Typography, Button, List, Modal, Alert, Form, Input } from "antd";

import * as Styled from "../../../Style/ReceiverAddressManagement.styled";
import {
  addAddress,
  getAllAddress,
  requireOTP,
  verifyOTP,
} from "../ReceiverAddressManagementApi";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { isValidAddress } from "../ReceiverAddressValidation";

export interface AddressChange {
  oldAddress: string;
  newAddress: string;
  createdAt: string;
  action: string;
  adminId: string;
}

const ReceiverAddressManagement: React.FC = () => {
  const [addressChanges, setAddressChanges] = useState<AddressChange[]>([]);
  const [newAddress, setNewAddress] = useState<string>("");
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [modalOTP, setModalOTP] = useState<boolean>(false);
  const [errorValidation, setErrorValidation] = useState<string>("");
  const [successValidation, setSuccessValidation] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await getAllAddress();
      setAddressChanges(res.data);
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleEditAddress = async () => {
    const response = await addAddress({
      newAddress: newAddress,
      oldAddress: addressChanges[0]?.newAddress,
    });

    if (response.success) {
      const res = await getAllAddress();
      setAddressChanges(res.data);
      setSuccessValidation("Receiver Address was updated successfully");
    } else {
      setModalOTP(true);
      setErrorValidation(response.msg);
      setTimeout(() => {
        setErrorValidation("");
      }, 3000);
    }
    setModalOTP(false);
  };

  const handleConfirmChange = async () => {
    setModalOTP(true);

    const isCreateOTP = await createOTP();
    if (isCreateOTP.success) {
      setModalOTP(true);
    } else {
      Modal.error({
        title: "Two Factor Authentication",
        content: isCreateOTP.message || "Create OTP failed",
      });
    }
    setModalConfirm(false);
  };

  const confirmOTP = async () => {
    const result = await verifyOTP(otp);

    if (!result.success) {
      //verify opt failed
      Modal.error({
        title: "Two Factor Authentication",
        content: result.message || "Invalid OTP",
      });
      return;
    }
    Modal.success({
      title: "Two Factor Authentication",
      content: `Your authentication process has been completed successfully!`,
    });
    handleEditAddress();
    setModalConfirm(false);
  };

  const createOTP = async () => {
    setLoading(true);
    const result = await requireOTP();
    setLoading(false);
    setModalConfirm(false);
    return result;
  };

  const handleConfirmSubmit = () => {
    if (isValidAddress(newAddress)) setModalConfirm(true);
    else
      Modal.error({
        title: "Validation Error",
        content: "Please enter validate wallet address",
      });
  };

  return (
    <Styled.Layout>
      <Styled.Header
        level={2}
      >
        Address Management
      </Styled.Header>
      <Styled.Wrapper>
        <Styled.Wrapper>
          <Typography.Text style={{ fontWeight: 700, fontSize: "18px" }}>
            Old Address:
          </Typography.Text>
          <Typography.Paragraph style={{ color: "#4b5563" }}>
            {addressChanges?.length ? addressChanges[addressChanges.length - 1]?.newAddress : ""}
          </Typography.Paragraph>
          <Typography.Text
            style={{ fontWeight: 700, fontSize: "18px", marginTop: "16px" }}
          >
            Enter New Address:
          </Typography.Text>
          <Styled.StyledInput
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            style={{ width: "300px" }}
          />
          {errorValidation && (
            <Alert type="error" message={errorValidation} banner />
          )}
          {successValidation && (
            <Alert type="success" message={successValidation} banner />
          )}
        </Styled.Wrapper>
        <div style={{ marginTop: "20px" }}>
          {addressChanges?.length > 0 ? (
            <Typography.Title
              level={3}
              style={{ marginBottom: "8px", fontWeight: "700" }}
            >
              Address Change History:
            </Typography.Title>
          ) : (
            <Typography.Title
              level={3}
              style={{ marginBottom: "8px", fontWeight: "700" }}
            >
              No Changes yet
            </Typography.Title>
          )}
          <List
          style={{width: "100%"}}
            dataSource={addressChanges}
            renderItem={(change) => (
              <List.Item style={{display: "grid", gridTemplateColumns: "auto auto auto", gap: "20px"}}>
                <Typography.Text>
                  <strong>Action:</strong> {change.action}
                </Typography.Text>
                <Typography.Text>
                  <strong>New Address:</strong> {change.newAddress}
                </Typography.Text>
                <Typography.Text>
                  <strong>Old Address:</strong> {change.oldAddress}
                </Typography.Text>
                <Typography.Text>
                  <strong>Timestamp:</strong> {moment(change.createdAt).format("LLL")}
                </Typography.Text>
                <Typography.Text>
                  <strong>Admin ID:</strong> {change.adminId}
                </Typography.Text>
              </List.Item>
            )}
          />
        </div>
        <div>
        <Button type="primary" onClick={handleConfirmSubmit} disabled={loading}>
          Save Address
          {loading && <LoadingOutlined />}
        </Button>
      </div>
      </Styled.Wrapper>
      
      <Modal
        title="Confirm Active"
        visible={modalConfirm}
        onOk={handleConfirmChange}
        onCancel={() => setModalConfirm(false)}
      >
        <p>Are you sure you want to change receiver address?</p>
      </Modal>
      <Modal
        title="Confirm Pin Code"
        visible={modalOTP}
        onCancel={() => {
          setModalOTP(false);
        }}
        footer={null}
      >
        <Form name="otpForm" onFinish={confirmOTP}>
          <h1 className="text-xl mb-4 text-center font-semibold">
            Enter OTP sent on your email:
            {/* {authPayload.email || "example@gmail.com"} */}
          </h1>
          <Form.Item
            name="otp"
            // validateStatus={error.otp.length > 0 ? "error" : "success"}
            // help={error.otp}
          >
            <Input placeholder="Enter OTP" name="otp" onChange={handleChange} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mt-7">
            Submit
          </Button>
          <Button
            type="default"
            color="warning"
            htmlType="button"
            className="mt-7"
            onClick={createOTP}
            disabled={loading}
          >
            Resend
            {loading && <LoadingOutlined />}
          </Button>
        </Form>
      </Modal>
    </Styled.Layout>
  );
};

export default ReceiverAddressManagement;
