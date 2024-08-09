import React, { useEffect, useState } from "react";
import { Button, Steps, Form, Input, Modal, Typography, Result } from "antd";

import { requireOTP, sendAuthPayload, verifyOTP } from "../TwoFactorAPI";

import * as Styled from "./TwoFactor.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, selectTwoFactor } from "@/app/selectors";
import { API } from "@/utils/api";
import { AppDispatch } from "@/app/store";
import { updateProfileField } from "@/app/profileSlice";
import { InputOTP } from "antd-input-otp";
import { useDevice } from "@/utils/Hooks/useDevice";

const { Title } = Typography;

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

  const profile = useSelector(selectProfile);
  const twofactor = useSelector(selectTwoFactor);

  const dispatch: AppDispatch = useDispatch();

  const device = useDevice();

  useEffect(() => {
    if (twofactor) setCurrent(Object.keys(STEP).length - 1);
  }, [twofactor]);

  const validationCurrentStep = async () => {
    switch (current) {
      case STEP.ENTERUSERNAME:
        if (authPayload.username.length === 0) {
          setError({ ...initpay, username: "Enter the username" });
          return false;
        }
        if (profile.username !== authPayload.username) {
          setError({ ...initpay, username: "Invalid username" });
          return;
        }
        break;
      case STEP.ENTERPASSWORD:
        if (authPayload.password.length === 0) {
          setError({ ...initpay, password: "Enter the password" });
          return false;
        }
        try {
          const response = await API.post("/auth/signin", {
            email: profile.username,
            password: authPayload.password,
          });

          if (!response?.data.success) {
            setError({ ...initpay, password: "Invalid password" });
            return false;
          }
        } catch (error) {
          setError({ ...initpay, password: "Invalid password" });
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
        if (authPayload.email !== profile.email) {
          setError({ ...initpay, email: "Invalid email" });
          return false;
        }

        break;
    }
    return true;
  };

  const next = async () => {
    setError(initpay);
    if (await validationCurrentStep()) {
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

        dispatch(updateProfileField({ field: "twofactor", value: true }));
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

  const handleChange = (e: any) => {
    setAuthPayload({ ...authPayload, [e.target.name]: e.target.value });
  };

  const handleOtpChange = async (e: any) => {
    if (e.length === 6) {
      await next();
    }
    setAuthPayload({ ...authPayload, otp: e.join("") });
  };

  const steps = [
    {
      title: device.isBreakpoint(1100) ?"Enter Username" : '',
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
      title: device.isBreakpoint(1100) ? "Enter Password" : "",
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
      title: device.isBreakpoint(1100) ? "Verify Email" : "",
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
      title: device.isBreakpoint(1100) ? "Enter OTP" : "",
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
            <InputOTP onChange={handleOtpChange} />
          </Form.Item>
          {/* <Button
            type="primary"
            htmlType="submit"
            className="mt-7"
            style={{ borderRadius: "8px" }}
          >
            Submit
          </Button> */}
        </Form>
      ),
    },
    {
      title: device.isBreakpoint(1100) ? "Verify OTP" : "",
      content: (
        <Result
          status="success"
          title="Successfully verified!"
          // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          // extra={[
          //   <Button type="primary" key="console">
          //     Go Console
          //   </Button>,
          //   <Button key="buy">Buy Again</Button>,
          // ]}
        />
      ),
    },
  ];

  return (
    <Styled.Layout>
      <Styled.Header level={1}>Security Features</Styled.Header>
      <Styled.Container>
        <Steps progressDot={device.isBreakpoint('MD') ? false : true} current={current}  >
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content p-2 md:p-10">{steps[current].content}</div>
        <Styled.ActionContainer>
          {/* {current > 0 && (
            <Button
              style={{ margin: "0 8px", borderRadius: "8px" }}
              onClick={prev}
            >
              Previous
            </Button>
          )} */}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next} style={{ borderRadius: "8px" }}>
              Next
            </Button>
          )}
        </Styled.ActionContainer>
      </Styled.Container>
    </Styled.Layout>
  );
};

export default App;
