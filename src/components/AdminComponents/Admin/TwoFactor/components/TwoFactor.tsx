import React, { useState } from "react";
import { Button, Steps, Form, Input, Modal, Typography } from "antd";

import { requireOTP, sendAuthPayload, verifyOTP } from "../TwoFactorAPI";

import * as Styled from './TwoFactor.styled';

const {Title} = Typography; 

const { Step } = Steps;

interface AuthPayload {
  username: string;
  password: string;
  email: string;
  otp: string;
}

const STEP = {
  ENTERUSERNAME: 0,
  ENTERPASSWORD: 1,
  ENTEREMAIL: 2,
  ENTEROTP: 3,
};

const initpay = {
  username: "",
  password: "",
  email: "",
  otp: "",
};



const App: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [authPayload, setAuthPayload] = useState<AuthPayload>(initpay);
  const [error, setError] = useState<AuthPayload>(initpay);

  const validationCurrentStep = () => {
    switch (current) {
      case STEP.ENTERUSERNAME:
        if (authPayload.username.length === 0) {
          setError({ ...initpay, username: "Enter the username" });
          return false;
        }
        break;
      case STEP.ENTERPASSWORD:
        if (authPayload.password.length === 0) {
          setError({ ...initpay, password: "Enter the password" });
          return false;
        }
        break;
      case STEP.ENTEREMAIL:
        if (authPayload.email.length === 0) {
          setError({ ...initpay, email: "Enter the email" });
          return false;
        }
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(
            authPayload.email
          )
        ) {
          setError({ ...initpay, email: "Enter the valid email" });
          return false;
        }

        break;
    }
    return true;
  };

  const next = async () => {
    setError(initpay);
    if (validationCurrentStep()) {
      if (current === STEP.ENTEROTP) {
        const result = await verifyOTP(authPayload.otp);
        if (!result.success) {
          //verify opt failed
          setError({ ...initpay, otp: result.message || "Invalid OTP" });
          return;
        }
        Modal.success({
          title: "Two Factor Authentication",
          content: `Your authentication process has been completed successfully!`,
        });
        return;
      }
      if (current === STEP.ENTEREMAIL) {
        const result = await sendAuthPayload(authPayload);

        if (!result.success) {
          setError({ ...initpay, email: result.message || "Invalid User" });
          return;
        }

        if (result.role === "user") {
          setError({ ...initpay, email: result.message || "Not Admin" });
          return;
        }

        const result2 = await requireOTP();
        if (!result2.success) {
          setError({
            ...initpay,
            email: result2.message || "Create OTP failed",
          });
          return;
        }
      }

      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleChange = (e: any) => {
    setAuthPayload({ ...authPayload, [e.target.name]: e.target.value });
  };
  const steps = [
    {
      title: "Enter Username",
      content: (
        <Form name="usernameForm">
          <Form.Item
            name="username"
            validateStatus={error.username.length > 0 ? "error" : "success"}
            help={error.username}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Enter Password",
      content: (
        <Form name="passwordForm">
          <Form.Item
            name="password"
            validateStatus={error.password.length > 0 ? "error" : "success"}
            help={error.password}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Verify Email",
      content: (
        <Form name="emailForm">
          <Form.Item
            name="email"
            validateStatus={error.email.length > 0 ? "error" : "success"}
            help={error.email}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" name="email" onChange={handleChange} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Enter OTP",
      content: (
        <Form name="otpForm" onFinish={next}>
          <h1 className="text-xl mb-4 text-center font-semibold">
            Enter OTP sent on your email:
            {authPayload.email || "example@gmail.com"}
          </h1>
          <Form.Item
            name="otp"
            validateStatus={error.otp.length > 0 ? "error" : "success"}
            help={error.otp}
          >
            <Input placeholder="Enter OTP" name="otp" onChange={handleChange} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mt-7" style={{borderRadius: "8px"}}>
            Submit
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <Styled.Layout>
      <Title level={1}>
        Security Features
      </Title>

      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content p-10">{steps[current].content}</div>
      <Styled.ActionContainer>
        {current > 0 && (
          <Button style={{ margin: "0 8px", borderRadius: "8px" }} onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}  style={{borderRadius: "8px"}}>
            Next
          </Button>
        )}
      </Styled.ActionContainer>
    </Styled.Layout>
  );
};

export default App;
