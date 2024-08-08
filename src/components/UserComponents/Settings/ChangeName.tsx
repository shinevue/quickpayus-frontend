import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Form, Input, Card, message, Modal } from "antd";

import { breakpoint } from "@/breakpoints";
import { updateProfile } from "@/app/profileSlice";
import { selectProfile } from "@/app/selectors";

import useContainer from "@/utils/Hooks/useContainer";
import { API } from "@/utils/api";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const StyledTitle = styled.h1`
  text-align: center;
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  font-size: var(--font-size-page-title);
  ${breakpoint.md} {
    text-align: left;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  transition: all var(--transition-time-when-switch-theme-mode);
  background: var(--color-bg-container);
  padding-inline: 10px;
  &:hover {
    background: var(--background-affix-hover);
    color: var(--color-text);
  }
  padding: 10px 10px;
  margin-bottom: var(--margin-bottom-page-title);
  border-radius: 5px;
`;

const ChangeNamePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const [messageApi, contextHolder] = message.useMessage();

  const handleNameChangeSubmit = (values: any) => {
    const { name } = values;
    if (name === profile.username) {
      messageApi.open({
        type: "warning",
        content: "Please enter a new username and try again.",
      });
      return;
    }
    setName(name);
    setIsModalVisible(true);
  };

  const handlePasswordSubmit = async (values: any) => {
    const { password } = values;

    try {
      const { data } = await API.put("user/update/profile", {
        password,
        username: name,
      });
      if (data.success) {
        dispatch(updateProfile({ data: { ...data.user } }));
        messageApi
          .open({
            type: "success",
            content: data.message,
          })
          .then(() => {
            setIsModalVisible(false);
            navigate("/settings");
          });
      }
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <TitleBox>
        <CustomLink to="/settings">
          <LeftOutlined />
        </CustomLink>
        <StyledTitle>Settings</StyledTitle>
      </TitleBox>
      <Card>
        <StyledTitle>Change Name</StyledTitle>
        <Form
          name="change_name_form"
          initialValues={{ name }}
          onFinish={handleNameChangeSubmit}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="confirmName"
            dependencies={["name"]}
            rules={[
              { required: true, message: "Please confirm your Name!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("name") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two names do not match!")
                  );
                },
              }),
            ]}
          >
            <Input placeholder="Confirm Name" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Change Name
          </Button>
        </Form>
      </Card>

      <Modal
        title="Confirm Password"
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        centered
        getContainer={useContainer}
      >
        <Form name="password_form" onFinish={handlePasswordSubmit}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeNamePage;
