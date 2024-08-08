import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { defaultSecurityQuestions } from "../Signup";
// antd
import { Form } from "antd";

import { InputOTP } from "antd-input-otp";

import * as Styled from "../SignIn.styled";

import { requireOTP, verifyOTP } from "../OTPApi";

interface Props {
  onFinish: (result: boolean) => void;
}
export const OtpForm: React.FC<Props> = ({ onFinish }) => {
  const [otp, setOtp] = useState([]);
  const [countDownValue, setCountDownValue] = useState<number>(0);

  useEffect(() => {
    handleRequireOTP();
  }, []);

  const handleRequireOTP = async () => {
    const res = await requireOTP({
      request_type: "login",
    });
    setCountDownValue(5);
  };

  const handleOtpInput = async (value) => {
    setOtp(value);
    if (value.length === 6) {
      await handleOtpVerification(value.join(""));
    }
  };

  const handleOtpVerification = async (otp: string) => {
    try {
      // Verify OTP logic here
      const res = await verifyOTP(otp);

      onFinish(res.success);
    } catch (error) {
      onFinish(false);
    }
  };

  useEffect(() => {
    let interval;
    if (countDownValue > 0) {
      interval = setInterval(() => {
        setCountDownValue((prevTimer): number => {
          if (prevTimer === 0) {
            clearInterval(interval);
            return prevTimer;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countDownValue]);

  return (
    <>
      <InputOTP value={otp} onChange={handleOtpInput} />

      <Form.Item>
        <Styled.SignInButton
          type="primary"
          disabled={countDownValue !== 0}
          onClick={handleRequireOTP}
        >
          {countDownValue > 0
            ? `Resend OTP (${countDownValue}s)`
            : "Submit OTP"}
        </Styled.SignInButton>
      </Form.Item>
    </>
  );
};
