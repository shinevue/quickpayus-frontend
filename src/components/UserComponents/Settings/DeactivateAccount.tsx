import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form, Input, message, Typography } from "antd";
import { ExclamationCircleOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { updateProfile } from "@/app/profileSlice";
import useContainer from "@/utils/Hooks/useContainer";
import { API } from "@/utils/api";

const { Title, Text } = Typography;
const { confirm } = Modal;

const MainContainer = styled.div`
  // background-color: #f4f4f4;
  padding: 17px;
  height: 100%;
`;

const DeactivateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: var(--color-bg-container); /* White background */
  border-radius: 16px;
  max-width: 500px;
  margin: 0 auto;
  box-sizing: border-box;
  transition: background-color var(--transition-time-when-switch-theme-mode);
`;

const DeactivateButton = styled(Button)`
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: white;
  width: 100%;

  &:hover {
    background-color: #ff7875;
    border-color: #ff7875;
  }

  &:focus {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
  }
`;

const DeactivateAccount: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const showDeactivateConfirm = () => {
    confirm({
      title: "Are you sure you want to deactivate your account?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <Form
          name="deactivate_form"
          layout="vertical"
          onFinish={handleDeactivate}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
      ),
      okText: "Deactivate",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDeactivate();
      },
      onCancel() {
        setIsModalVisible(false);
      },
    });
  };

  const handleDeactivate = async () => {
    if (!password) {
      messageApi.open({
        type: "error",
        content: "Please enter your password to deactivate your account.",
      });
      return;
    }
    try {
      const { data } = await API.patch("auth//user/deactivate", { password });
      if (data.success) {
        dispatch(updateProfile({ data: { ...data.user } }));
        messageApi
          .open({
            type: "success",
            content: data.message,
          })
          .then(() => navigate("/settings"));
      }
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
    } finally {
      setIsModalVisible(false);
      setPassword("");
    }
  };

  return (
    <MainContainer>
      {contextHolder}
      <DeactivateContainer>
        <Title level={3}>Deactivate Account</Title>
        <Text type="secondary" style={{ marginBottom: 24 }}>
          Please note that deactivating your account is irreversible. You will
          lose access to your data, and this action cannot be undone.
        </Text>
        <DeactivateButton
          type="primary"
          danger
          onClick={() => setIsModalVisible(true)}
        >
          Deactivate Account
        </DeactivateButton>

        <Modal
          title="Confirm Deactivation"
          open={isModalVisible}
          onOk={showDeactivateConfirm}
          onCancel={() => setIsModalVisible(false)}
          okText="Deactivate"
          okType="danger"
          cancelText="Cancel"
          centered
          getContainer={useContainer}
        >
          <Form
            name="deactivate_form"
            layout="vertical"
            onFinish={handleDeactivate}
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </DeactivateContainer>
    </MainContainer>
  );
};

export default DeactivateAccount;
