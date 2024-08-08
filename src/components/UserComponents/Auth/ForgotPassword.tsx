import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import { InputOTP } from "antd-input-otp";
import axios from "axios";

// antd
import { Form, Button } from "antd";

// hooks
import useNavbarheight from "@/utils/Hooks/useNavbarheight";

// components
import FloatingLabelInputPassword from "./FloatingInput/FloatingInputPassword";
import { FloatingInput } from "./FloatingInput/FloatingInput";

// styled components
import * as Styled from "./SignUp.styled";
import { Link } from "react-router-dom";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const steps = ["Email", "OTP", "Password", "Confirm Password"];

const ForgotPassword: React.FC = () => {
  const [otp, setOtp] = useState([]);
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(59);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  const navigate = useNavigate();

  const navbarheight = useNavbarheight();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
  };

  const handleLearnMoreClick = () => {
    setShowMoreInfo(!showMoreInfo); // Toggle the state
  };

  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      window.location.href = "/signin";
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (steps[currentStep] === "Email") {
      try {
        await axios.post("/api/v1/auth/password/forgot", {
          email: values.email,
        });
        nextStep();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
        } else {
          console.error(error);
        }
      } finally {
        setSubmitting(false);
      }
    }

    if (steps[currentStep] === "Confirm Password") {
      // try {
      //   await axios.put("/api/v1/auth/password/reset/" + otp.join(""), {
      //     password: values.password,
      //     confirmPassword: values.confirmPassword,
      //   });
      //   navigate("/signin");
      // } catch (error) {
      //   if (axios.isAxiosError(error)) {
      //     console.error(error.response?.data);
      //   } else {
      //     console.error(error);
      //   }
      // } finally {
      //   setSubmitting(false);
      // }
      navigate("/signin");
    }
  };

  const validate = (values): FormErrors => {
    const errors: FormErrors = {};

    if (steps[currentStep] === "Email") {
      if (!values.email) {
        errors.email = "Email address is required";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }
    }

    if (currentStep === 2) {
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password should be more than 6 characters";
      }
    }

    if (currentStep === 3) {
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Confirm password should be matched";
      }
    }

    return errors;
  };

  const handleOtpInput = (value) => {
    setOtp(value);
    if (value.length === 6) {
      nextStep();
    }
  };

  return (
    <Styled.StyledWrapper className="signup" navbarheight={navbarheight}>
      <Styled.MainCard title="Reset Your Password">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, errors, touched, handleSubmit }) => (
            <Form onFinish={handleSubmit}>
              <Styled.InputBox>
                {steps[currentStep] === "Email" && (
                  <Form.Item
                    label=""
                    validateStatus={
                      touched.email || values.email.length > 0
                        ? !errors.email
                          ? "success"
                          : "error"
                        : ""
                    }
                    help={
                      (touched.email || values.email.length > 0) && errors.email
                        ? errors.email
                        : null
                    }
                  >
                    <Field name="email">
                      {({ field }) => (
                        <FloatingInput
                          label="Email"
                          name="email"
                          field={field}
                        />
                      )}
                    </Field>
                  </Form.Item>
                )}
                {steps[currentStep] === "OTP" && (
                  <>
                    <InputOTP value={otp} onChange={handleOtpInput} />
                    <Styled.CountDownTimer>
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          Time Remaining:
                          <span style={{ fontWeight: 600 }}>
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </span>
                        </p>
                      ) : (
                        // Display if countdown timer reaches 0
                        <p>Didn't receive code?</p>
                      )}
                    </Styled.CountDownTimer>
                  </>
                )}
                {currentStep === 2 && (
                  <Form.Item
                    label=""
                    validateStatus={
                      touched.password || values.password.length > 0
                        ? !errors.password
                          ? "success"
                          : "error"
                        : ""
                    }
                    help={
                      (touched.password || values.password.length > 0) &&
                      errors.password
                        ? errors.password
                        : null
                    }
                  >
                    <Field name="password">
                      {({ field }) => (
                        <FloatingLabelInputPassword
                          label="Password"
                          field={field}
                          name="password"
                        />
                      )}
                    </Field>
                  </Form.Item>
                )}
                {currentStep === 3 && (
                  <Form.Item
                    label=""
                    validateStatus={
                      touched.confirmPassword ||
                      values.confirmPassword.length > 0
                        ? !errors.confirmPassword
                          ? "success"
                          : "error"
                        : ""
                    }
                    help={
                      (touched.confirmPassword ||
                        values.confirmPassword.length > 0) &&
                      errors.confirmPassword
                        ? errors.confirmPassword
                        : null
                    }
                  >
                    <Field name="confirmPassword">
                      {({ field }) => (
                        <FloatingLabelInputPassword
                          label="Confirm Password"
                          field={field}
                          name="confirmPassword"
                        />
                      )}
                    </Field>
                  </Form.Item>
                )}

                {currentStep !== steps.length && (
                  <Styled.BtnGrp>
                    {steps[currentStep] !== "OTP" && (
                      <>
                        {currentStep > 0 && (
                          <Button onClick={prevStep} block>
                            Previous
                          </Button>
                        )}
                        <Styled.NextBtn
                          type="primary"
                          htmlType={
                            steps[currentStep] === "Email" ||
                            steps[currentStep] === "Confirm Password"
                              ? "submit"
                              : "button"
                          }
                          onClick={
                            steps[currentStep] === "Email" ||
                            steps[currentStep] === "Confirm Password"
                              ? undefined
                              : nextStep
                          }
                          loading={isSubmitting}
                          className={
                            currentStep === 1
                              ? "getone"
                              : currentStep === steps.length - 1
                              ? "Submit"
                              : "Next"
                          }
                          disabled={Object.keys(validate(values)).some(
                            (field) => !!field
                          )}
                          block
                        >
                          {currentStep === steps.length - 1 ? "Submit" : "Next"}
                        </Styled.NextBtn>
                      </>
                    )}
                    {currentStep === 1 && (
                      <Button
                        onClick={resendOTP}
                        disabled={seconds > 0 || minutes > 0}
                        block
                      >
                        Resend OTP
                      </Button>
                    )}
                  </Styled.BtnGrp>
                )}
              </Styled.InputBox>
            </Form>
          )}
        </Formik>
        <Styled.SignInWrapper>
          <Styled.SignInBtn>
            <Styled.StyleLink to="/signin">Sign In</Styled.StyleLink>
          </Styled.SignInBtn>
          <p>if you’re a member.</p>
        </Styled.SignInWrapper>

        <Styled.PrivacyTxt>
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a
          bot.
          <Styled.LearnMoreButton href="#" onClick={handleLearnMoreClick}>
            Learn more.
          </Styled.LearnMoreButton>
        </Styled.PrivacyTxt>
        <Styled.PrivacyTxt2 className={showMoreInfo ? "privacy-visible" : ""}>
          The information collected by Google reCAPTCHA is subject to the Google
          <Link
            to="https://policies.google.com/privacy"
            className="color-red"
            target="_blank"
          >
            Privacy Policy
          </Link>
          and
          <Link
            to="https://policies.google.com/terms"
            className="color-red"
            target="_blank"
          >
            Terms of Service,
          </Link>
          and is used for providing, maintaining, and improving the reCAPTCHA
          service and for general security purposes (it is not used for
          personalized advertising by Google).
        </Styled.PrivacyTxt2>
      </Styled.MainCard>
    </Styled.StyledWrapper>
  );
};

export default ForgotPassword;
