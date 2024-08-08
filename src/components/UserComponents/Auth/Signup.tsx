import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import { InputOTP } from "antd-input-otp";

// antd
import { Form, Steps, Button, Select, Modal } from "antd";

// hooks
import useNavbarheight from "@/utils/Hooks/useNavbarheight";

// components
import { FloatingInput } from "./FloatingInput/FloatingInput";
import { AntPhone } from "./AntPhone";
import { ReferralInput } from "./ReferralInput";
import { deviceInfo } from "@/utils/deviceInfo";

// styled components
import * as Styled from "./SignUp.styled";

export const defaultSecurityQuestions = [
  "What was the name of your first pet?",
  "What is the name of the street you grew up on?",
  "What is your mother's maiden name?",
  "What was the make and model of your first car?",
  "What was the name of your elementary school?",
  "In what city were you born?",
  "What is your favorite food?",
  "What is the name of your favorite childhood friend?",
  "What was your high school mascot?",
  "What was the title of your favorite book as a child?",
];
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  referral?: string;
  termsAndConditions?: string;
  phoneNumber?: string;
  countryCode?: string;
  question?: string;
  answer?: string;
}

const { Step } = Steps;

export const steps = [
  "Get Started",
  "Name",
  "Number",
  "Email & Username",
  "Password",
  "Question",
  "Referral",
  "Otp",
];

interface TransportConfig {
  secure?: boolean | "STARTTLS";
  auth: {
    user: string;
    pass: string;
  };
}

const SignupForm = () => {
  const [otp, setOtp] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  // const [phone, setPhone] = useState<string>("");
  // const [dial, setDial] = useState<string>("");
  const [countryCode, setCountryCode] = useState("");

  const [countDownValue, setCountDownValue] = useState<number>(0);
  const navigate = useNavigate();

  const navbarheight = useNavbarheight();
  const [token, setToken] = useState("");

  // const handleChangePhone = (dial, phone) => {
  //   setPhone(phone);
  //   setDial(dial);
  // };

  const { username } = useParams();
  const clientInfo = deviceInfo();
  const handleRequireOTP = async () => {
    setCountDownValue(5);
    const otpResult = await axios.post(
      "/api/v1/otp/create",
      {
        request_type: "signup",
      },
      {
        headers: {
          token,
        },
      }
    );
  };

  useEffect(() => {
    (async () => await handleRequireOTP())();
  }, [token]);

  const handleLearnMoreClick = () => {
    setShowMoreInfo(!showMoreInfo); // Toggle the state
  };

  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", {...values, ...clientInfo});
      if (response.data.success) {
        Modal.info({
          title: "Registration successful",
          content:
            "Please check your email. You will receive the backup codes.",
        });
        setToken(response.data.token);
        setCountDownValue(5);
        nextStep();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error during sign-up:", error.response?.data);
      } else {
        console.error("Error during sign-up:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validate = (values): FormErrors => {
    const errors: FormErrors = {};

    if (currentStep === 1) {
      if (!values.firstName) {
        errors.firstName = "First name is required";
      }
      if (!values.lastName) {
        errors.lastName = "Last name is required";
      }
    } else if (currentStep === 2) {
      if (!values.phoneNumber || !values.phoneNumber.length) {
        errors.phoneNumber = "Phone number is required";
        // } else if (values.phoneNumber.length - dial.length !== 11) {
      } else if (values.phoneNumber.length <= 11) {
        // errors.phoneNumber = "Phone number must be at least 10";
        errors.phoneNumber = "Phone number must be at least 12";
      }
    } else if (currentStep === 3) {
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.username) {
        errors.username = "Username is required";
      }
    } else if (currentStep === 4) {
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Password must have one uppercase";
      } else if (
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(values.password)
      ) {
        errors.password = "Password must have one special character";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    } else if (currentStep === 5) {
      if (values.question < 0) {
        errors.question = "Select the any security question";
      }
      if (!values.answer) {
        errors.answer = "Please enter the answer of the selected question";
      }
    } else if (currentStep === 6) {
      if (!values.termsAndConditions) {
        errors.termsAndConditions = "";
      }
    }

    return errors;
  };

  const handleOtpInput = async (value) => {
    setOtp(value);
  };

  useEffect(() => {
    if (otp.length === 6) {
      (async () => {
        try {
          const otpResult = await axios.post(
            "/api/v1/otp/verify",
            {
              otp: otp.join(""),
            },
            {
              headers: {
                token,
              },
            }
          );
          if (otpResult.data.success) {
            navigate("/signin");
          }
        } catch (error) {}
      })();
    }
  }, [otp]);

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

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    referral: username || "",
    phoneNumber: "",
    countryCode: "",
    question: "",
    answer: "",
  };
  return (
    <Styled.StyledWrapper className="signup" navbarheight={navbarheight}>
      <Styled.MainCard title="Sign Up to join QUICKPAYUS">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onFinish={handleSubmit}>
              <Styled.Steps
                current={currentStep}
                progressDot
                responsive={false}
              >
                {steps.slice(0, steps.length - 1).map((step) => (
                  <Step key={step} />
                ))}
              </Styled.Steps>

              <Styled.InputBox>
                {steps[currentStep] === "Get Started" && <p></p>}
                {steps[currentStep] === "Name" && (
                  <>
                    <Form.Item
                      validateStatus={
                        touched.firstName
                          ? !errors.firstName
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.firstName ? "shake" : ""}`}
                    >
                      <Field name="firstName">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            {/* <Styled.InputLabel htmlFor="firstName" >
                              First Name
                            </Styled.InputLabel>
                            <Styled.InputField {...field}
                            placeholder="First Name" />  */}
                            <FloatingInput
                              label="First Name"
                              name="firstName"
                              field={field}
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        touched.lastName
                          ? !errors.lastName
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.lastName ? "shake" : ""}`}
                    >
                      <Field name="lastName">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            {/* <Styled.InputLabel htmlFor="lastName">
                              Last Name
                            </Styled.InputLabel>
                            <Styled.InputField {...field} placeholder="Last Name" /> */}
                            <FloatingInput
                              label="Last Name"
                              name="lastName"
                              field={field}
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                  </>
                )}
                {steps[currentStep] === "Number" && (
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <Styled.InputWrapper>
                        <AntPhone
                          {...field}
                          handleChange={(countryCode, value) => {
                            setFieldValue("countryCode", countryCode);
                            setFieldValue("phoneNumber", value);
                          }}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="color-red"
                        />
                      </Styled.InputWrapper>
                    )}
                  </Field>
                )}
                {steps[currentStep] === "Email & Username" && (
                  <>
                    <Form.Item
                      validateStatus={
                        touched.email
                          ? !errors.email
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.email ? "shake" : ""}`}
                    >
                      <Field name="email">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <FloatingInput
                              label="Email"
                              name="email"
                              field={field}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        touched.username
                          ? !errors.username
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.username ? "shake" : ""}`}
                    >
                      <Field name="username">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <FloatingInput
                              label="Username"
                              name="username"
                              field={field}
                            />
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                  </>
                )}
                {steps[currentStep] === "Password" && (
                  <>
                    <Form.Item
                      validateStatus={
                        touched.password
                          ? !errors.password
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.password ? "shake" : ""}`}
                    >
                      <Field name="password">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <Styled.InputLabel htmlFor="password">
                              Password
                            </Styled.InputLabel>
                            <Styled.InputFieldPassword
                              {...field}
                              type="password"
                              placeholder="Password"
                            />
                            <PasswordStrengthBar
                              password={field.value}
                              style={{ height: "5px", borderRadius: "3px" }}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        touched.confirmPassword
                          ? !errors.confirmPassword
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.confirmPassword ? "shake" : ""}`}
                    >
                      <Field name="confirmPassword">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <Styled.InputLabel htmlFor="confirmPassword">
                              Confirm Password
                            </Styled.InputLabel>
                            <Styled.InputFieldPassword
                              {...field}
                              type="password"
                              placeholder="Confirm Password"
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                  </>
                )}
                {steps[currentStep] === "Referral" && (
                  <>
                    <Field name="referral">
                      {({ field }) => (
                        <Styled.InputWrapper>
                          <ReferralInput
                            field={field}
                            onChange={(value) =>
                              setFieldValue("referral", value)
                            }
                          />
                          <ErrorMessage
                            name="referral"
                            component="div"
                            className="color-red"
                          />
                        </Styled.InputWrapper>
                      )}
                    </Field>
                    <Field name="termsAndConditions">
                      {({ field }) => (
                        <Styled.InputWrapper>
                          <Styled.StyledCheckbox
                            checked={field.value}
                            {...field}
                          >
                            I agree with the
                            <a
                              href="#"
                              className="color-blue"
                              style={{ margin: "0 5px" }}
                            >
                              Privacy Policy
                            </a>
                            and
                            <a
                              href="#"
                              className="color-blue"
                              style={{ marginLeft: 5 }}
                            >
                              Terms of Services.
                            </a>
                          </Styled.StyledCheckbox>
                          <ErrorMessage
                            name="termsAndConditions"
                            component="div"
                            className="color-red"
                          />
                        </Styled.InputWrapper>
                      )}
                    </Field>
                  </>
                )}

                {steps[currentStep] === "Question" && (
                  <>
                    <Form.Item
                      validateStatus={
                        touched.question
                          ? !errors.question
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.question ? "shake" : ""}`}
                    >
                      <Field name="question">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <Select
                              size="large"
                              {...field}
                              onChange={(value) =>
                                setFieldValue("question", value)
                              }
                              options={defaultSecurityQuestions.map(
                                (quetion: string, index: number) => ({
                                  label: quetion,
                                  value: index,
                                })
                              )}
                            />
                            <ErrorMessage
                              name="question"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        touched.answer
                          ? !errors.answer
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.answer ? "shake" : ""}`}
                    >
                      <Field name="answer">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <FloatingInput
                              label="Answer"
                              name="answer"
                              field={field}
                            />
                            <ErrorMessage
                              name="answer"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                  </>
                )}

                {steps[currentStep] === "Otp" && (
                  <>
                    <InputOTP value={otp} onChange={handleOtpInput} />
                    <Styled.BtnGrp>
                      <Styled.NextBtn
                        type="primary"
                        loading={isSubmitting}
                        className="getone Next"
                        disabled={countDownValue !== 0}
                        onClick={handleRequireOTP}
                        block
                      >
                        {countDownValue > 0
                          ? `Resend OTP (${countDownValue}s)`
                          : "Submit OTP"}
                      </Styled.NextBtn>
                    </Styled.BtnGrp>
                  </>
                )}

                {steps[currentStep] !== "Otp" && (
                  <Styled.BtnGrp>
                    {currentStep > 0 && (
                      <Button onClick={prevStep} block>
                        Previous
                      </Button>
                    )}
                    <Styled.NextBtn
                      type="primary"
                      htmlType={
                        steps[currentStep] === "Referral" ? "submit" : "button"
                      }
                      onClick={
                        steps[currentStep] !== "Referral" ? nextStep : undefined
                      }
                      loading={isSubmitting}
                      className={
                        steps[currentStep] === "Get Started"
                          ? "getone"
                          : steps[currentStep] === "Referral"
                          ? "Submit"
                          : "Next"
                      }
                      disabled={Object.keys(validate(values)).some(
                        (field) => !!field
                      )}
                      block
                    >
                      {steps[currentStep] === "Get Started"
                        ? "Get Started"
                        : steps[currentStep] === "Referral"
                        ? "Submit"
                        : "Next"}
                    </Styled.NextBtn>
                  </Styled.BtnGrp>
                )}
              </Styled.InputBox>
            </Form>
          )}
        </Formik>
        <Styled.SignInWrapper>
          <p>
            <Styled.SignInBtn>
              <Styled.StyleLink to="/signin">Sign In</Styled.StyleLink>
            </Styled.SignInBtn>
            if you’re a member.
          </p>
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
          <a
            href="https://policies.google.com/privacy"
            className="color-blue"
            target="_blank"
            style={{ margin: "0 5px" }}
          >
            Privacy Policy
          </a>
          and
          <a
            href="https://policies.google.com/terms"
            className="color-blue"
            target="_blank"
            style={{ margin: "0 5px" }}
          >
            Terms of Service
          </a>
          and is used for providing, maintaining, and improving the reCAPTCHA
          service and for general security purposes (it is not used for
          personalized advertising by Google).
        </Styled.PrivacyTxt2>
      </Styled.MainCard>
    </Styled.StyledWrapper>
  );
};

export default SignupForm;
