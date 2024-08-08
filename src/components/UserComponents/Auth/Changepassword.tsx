import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import { Form, Col, Modal, Input, Button, message, Card } from "antd";
import useContainer from "@/utils/Hooks/useContainer";

import * as Styled from "./Changepassword.style";
import { API } from "@/utils/api";
import { LeftOutlined } from "@ant-design/icons";

interface FormData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
interface FormErrors {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const handleChangePassword = (values: FormData) => {
    setFormData({
      oldPassword: values.currentPassword,
      password: values.password,
    });
    setOtp("");
    setIsOtpModalVisible(true);
  };

  const handleOtpSubmit = async () => {
    if (otp === "123456") {
      try {
        const { data } = await API.patch("auth/password/change", formData);
        if (data.success)
          messageApi
            .open({
              type: "success",
              content: data.message,
            })
            .then(() => {
              setIsOtpModalVisible(false);
              navigate("/settings");
            });
      } catch (err: any) {
        messageApi
          .open({
            type: "error",
            content: err.response.data.message,
          })
          .then(() => setIsOtpModalVisible(false));
      }
    } else {
      setOtpError("Invalid OTP");
    }
  };

  const validateForm = (values: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Please input current password!";
    }
    if (!values.password) {
      errors.password = "Please input new password!";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (values.currentPassword === values.password) {
      errors.password = "Please input a different password with former!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please input confirm password!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <>
      {contextHolder}
      <Styled.TitleBox>
        <Styled.CustomLink to="/settings">
          <LeftOutlined />
        </Styled.CustomLink>
        <Styled.Title>Settings</Styled.Title>
      </Styled.TitleBox>
      <Card>
        <Styled.Title>Change Password</Styled.Title>
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmPassword: "",
          }}
          validate={validateForm}
          onSubmit={handleChangePassword}
        >
          {({ errors, handleSubmit, touched, values }) => (
            <Form style={{ width: "100%" }} onFinish={handleSubmit}>
              <Form.Item
                validateStatus={
                  touched.currentPassword || values.currentPassword.length !== 0
                    ? !errors.currentPassword
                      ? "success"
                      : "error"
                    : ""
                }
                help={
                  touched.currentPassword && errors.currentPassword
                    ? errors.currentPassword
                    : null
                }
              >
                <Field name="currentPassword">
                  {({ field }) => (
                    <Input
                      type="password"
                      name="currentPassword"
                      placeholder="Current Password"
                      {...field}
                    />
                  )}
                </Field>
              </Form.Item>
              <Form.Item
                validateStatus={
                  touched.password || values.password.length !== 0
                    ? !errors.password
                      ? "success"
                      : "error"
                    : ""
                }
                help={
                  touched.password && errors.password ? errors.password : null
                }
                style={{ marginTop: "24px" }}
              >
                <Field name="password">
                  {({ field }) => (
                    <Input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      {...field}
                    />
                  )}
                </Field>
              </Form.Item>
              <Form.Item
                validateStatus={
                  touched.confirmPassword || values.confirmPassword.length !== 0
                    ? !errors.confirmPassword
                      ? "success"
                      : "error"
                    : ""
                }
                help={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : null
                }
                style={{ marginTop: "24px" }}
              >
                <Field name="confirmPassword">
                  {({ field }) => (
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  )}
                </Field>
              </Form.Item>
              <Col span={24}>
                <Button type="primary" htmlType="submit" block>
                  Change Password
                </Button>
              </Col>
            </Form>
          )}
        </Formik>
      </Card>

      <Modal
        title="Enter OTP"
        open={isOtpModalVisible}
        onCancel={() => setIsOtpModalVisible(false)}
        footer={null}
        centered
        getContainer={useContainer}
      >
        <Form onFinish={handleOtpSubmit}>
          <Form.Item
            label="OTP"
            validateStatus={otpError ? "error" : ""}
            help={otpError || ""}
          >
            <Input
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpError("");
              }}
              placeholder="Enter OTP"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
