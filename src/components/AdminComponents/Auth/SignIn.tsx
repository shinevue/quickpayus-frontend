import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formik, Field } from "formik";
import axios from "axios";

// antd
import { Form } from "antd";

// components
import { FloatingInput } from "./FloatingInput/FloatingInput";
import FloatingLabelInputPassword from "./FloatingInput/FloatingInputPassword";

// hooks
import useNavbarheight from "@/utils/useNavbarheight";

// redux
// import { updateProfile } from "../../Redux/profileSlice";

// styled components
import * as Styled from "./SignIn.styled";
import { API } from "@/utils/api";
import { updateProfile } from "@/app/profileSlice";
// import { jwtDecode } from "jwt-decode";

interface FormErrors {
  email?: string;
  password?: string;
}

interface SignInValues {
  email: string;
  password: string;
}

interface FormikBag {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (error: FormErrors) => void;
}

const SignIn: React.FC = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [failedSignIn, setFailedSignIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navbarheight = useNavbarheight();

  const handleLearnMoreClick = () => {
    setShowMoreInfo(!showMoreInfo); // Toggle the state
  };

  const handleSignIn = async (
    values: SignInValues,
    { setSubmitting, setErrors }: FormikBag
  ): Promise<void> => {
    const reqData = {
      email: values.email,
      password: values.password,
    };

    try {
      const signInRes = await API.post("/auth/signin", reqData);
      // Axios automatically parses JSON, so you don't need to call `.json()`
      const { user, token } = signInRes.data;

      localStorage.setItem("token", token);
      API.defaults.headers.token = token;
      // Save user data in redux
      // dispatch(updateProfile({ data: { ...user } }));
      // Check user role and redirect accordingly
      dispatch(updateProfile({ data: { ...user } }));
      if (user.role !== "user") {
        navigate("/admin/dashboard");
      } else if (user.role === "user") {
        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error during sign-in:", error.response?.data);
        if (error.response?.data?.message == "Invalid Credientials") {
          setErrors({
            email:
              "Invalid email or username! Please check your input and try again.",
            password: "Incorrect password! Please try again.",
          });
        }
      } else {
        console.error("Error during sign-in:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Styled.MainRow navbarheight={navbarheight}>
      <Styled.MainCard>
        <Styled.StyledH1>Sign In if you're a member</Styled.StyledH1>
        <Formik
          initialValues={{ email: "", password: "", remember: true }}
          validate={(values) => {
            const errors: FormErrors = {};

            if (!values.email) {
              errors.email = "Please input your email / username";
            }
            if (!values.password) {
              errors.password = "Please input your password";
            }
            return errors;
          }}
          onSubmit={handleSignIn}
        >
          {({ values, errors, touched, handleSubmit, isSubmitting }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label=""
                validateStatus={
                  touched.email || values.email.length !== 0
                    ? !errors.email
                      ? "success"
                      : "error"
                    : ""
                }
                className={`${errors.email ? "shake" : ""}`}
                help={touched.email && errors.email ? errors.email : null}
              >
                <Field name="email">
                  {({ field }: { field: any }) => (
                    <FloatingInput
                      label="Email / Username"
                      name="email"
                      field={field}
                    />
                  )}
                </Field>
              </Form.Item>

              <Form.Item
                label=""
                validateStatus={
                  touched.password || values.password.length !== 0
                    ? !errors.password
                      ? "success"
                      : "error"
                    : ""
                }
                style={{ marginTop: "30px" }}
                help={
                  touched.password && errors.password ? errors.password : null
                }
                className={`${errors.password ? "shake" : ""}`}
              >
                <Field name="password">
                  {({ field }: { field: any }) => (
                    <FloatingLabelInputPassword
                      label="Password"
                      name="password"
                      field={field}
                    />
                  )}
                </Field>
              </Form.Item>

              <Form.Item>
                <Styled.SignInButton
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  Sign In
                </Styled.SignInButton>
              </Form.Item>
              <span>
                <Styled.ForgetTxt>
                  <Styled.StyleLink to="/forgot-password">
                    Forget Password?
                  </Styled.StyleLink>
                </Styled.ForgetTxt>
              </span>
              <Form.Item valuePropName="checked"></Form.Item>
            </Form>
          )}
        </Formik>

        <Styled.PrivacyTxt>
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a
          bot.
          <Styled.LearnMoreButton onClick={handleLearnMoreClick}>
            Learn more.
          </Styled.LearnMoreButton>
        </Styled.PrivacyTxt>
        <Styled.PrivacyTxt2 className={showMoreInfo ? "privacy-visible" : ""}>
          The information collected by Google reCAPTCHA is subject to the Google
          <Link
            to="https://policies.google.com/privacy"
            className="color-blue"
            target="_blank"
          >
            Privacy Policy
          </Link>
          and
          <Link
            to="https://policies.google.com/terms"
            className="color-blue"
            target="_blank"
          >
            Terms of Service,
          </Link>
          and is used for providing, maintaining, and improving the reCAPTCHA
          service and for general security purposes (it is not used for
          personalized advertising by Google).
        </Styled.PrivacyTxt2>
      </Styled.MainCard>
    </Styled.MainRow>
  );
};

export default SignIn;
