import React, { useState } from "react";
import { Button, Steps, Form, Input, Modal } from "antd";

import * as Styled from './Style/TwoFactor.styled';

const { Step } = Steps;

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = () => {
    if (current === steps.length - 1) {
      setModalVisible(true);
    } else if (current === 2) {
      setTimeout(() => {
        setOtpSent(true);
        next();
      }, 2000);
    } else {
      next();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const steps = [
    {
      title: "Enter Username",
      content: (
        <Form name="usernameForm" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Enter Password",
      content: (
        <Form name="passwordForm" onFinish={onFinish}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Verify Email",
      content: (
        <Form name="emailForm" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Enter OTP",
      content: (
        <Form name="otpForm" onFinish={onFinish}>
          <h1 className="text-xl mb-4 text-center font-semibold">
            Enter OTP sent on your email: example@gmail.com
          </h1>
          <Form.Item name="otp">
            <Input placeholder="Enter OTP" />
            <Button type="primary" htmlType="submit" className="mt-7">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Styled.Layout>
      <Styled.Header>
        Two Factor Authentication
      </Styled.Header>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Styled.Layout>
        <Styled.Layout className="steps-content">{steps[current].content}</Styled.Layout>
      </Styled.Layout>
      <div className="steps-action">
        {current > 0 && (
          <Button style={{ margin: "0 8px", borderRadius: "8px" }} onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={onFinish} style={{borderRadius: "8px"}}>
            {current === 2 && !otpSent ? "Send OTP" : "Next"}
          </Button>
        )}
      </div>
      <Modal
        title="Authentication Completed"
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>Your authentication process has been completed successfully!</p>
      </Modal>
    </Styled.Layout>
  );
};

export default App;
