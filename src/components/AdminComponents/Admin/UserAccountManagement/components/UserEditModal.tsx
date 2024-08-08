import React, { useEffect } from "react";
import { Form, Modal } from "antd";
import { User } from "@/types/UserType";

import * as Styled from "../../../Style/UserDetails.styled";

interface UserEditModalProps {
  visible: boolean;
  userInfo: User;
  setVisible: (visible: boolean) => void;
  handleOk: (values: any) => void;
}
const UserEditModal: React.FC<UserEditModalProps> = ({
  visible,
  userInfo,
  setVisible,
  handleOk,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      firstName: userInfo.name.split(" ")[0],
      lastName: userInfo.name.split(" ")[1],
      username: userInfo.username,
      email: userInfo.email,
    });
  }, [userInfo]);

  const handleFinish = (values: any) => {
    handleOk(values);
  };

  return (
    <Modal
      title="Confirm Deletion"
      open={visible}
      onOk={() => form.submit()}
      onCancel={() => setVisible(false)}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter firstname" }]}
        >
          <Styled.SearchInput placeholder="Firstname" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please enter lastName" }]}
        >
          <Styled.SearchInput placeholder="LastName" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter userName" }]}
        >
          <Styled.SearchInput placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter lastName" }]}
        >
          <Styled.SearchInput placeholder="Email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
