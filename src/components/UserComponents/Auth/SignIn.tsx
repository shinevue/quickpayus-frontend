import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import axios, { HeadersDefaults, AxiosHeaderValue } from "axios";

// hooks
import useNavbarheight from "@/utils/Hooks/useNavbarheight";

// redux
import { updateProfile } from "@/app/profileSlice";
import { updateOtpStatus } from "@/app/slices/otpSlice";
import { updateKyc } from "@/app/slices/KycVerificationSlice";

// styled components
import * as Styled from "./SignIn.styled";
import { API, setToken } from "@/utils/api";
import { requireOTP, verifyOTP } from "./OTPApi";

import { defaultSecurityQuestions } from "./Signup";
import { SecurityQuestionForm } from "./SignInForm/SecurityQuestionForm";
import { BackupCodeForm } from "./SignInForm/BackupCodeForm";
import { SignInForm } from "./SignInForm/SignInForm";
import { OtpForm } from "./SignInForm/OtpForm";
import { deviceInfo } from "@/utils/deviceInfo";

interface FormErrors {
  email?: string;
  password?: string;
  answer?: string;
  question?: string;
  backupCode?: string;
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

  const [mode, setMode] = useState<"cre" | "otp" | "que" | "bac">("cre");
  const [resData, setResData] = useState({ user: { kyc: {} }, token: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientInfo = deviceInfo();

  const navbarheight = useNavbarheight();

  const handleLearnMoreClick = () => {
    setShowMoreInfo(!showMoreInfo); // Toggle the state
  };

  const handleCheckQuestion = async (
    values: {
      question: number;
      answer: string;
    },
    { setSubmitting, setErrors }: FormikBag
  ): Promise<void> => {
    try {
      const result = await API.post("/auth/security_question", values);
      if (result.data.success) {
        console.log(result.data.message);
        navigate("/dashboard");
      }
      handleVerifyFinish(result.data.success);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error during sign-in:", error.response?.data);
        if (error.response?.data.message === "Invalid Security Question") {
          setErrors({
            question:
              "Invalid question or answer! Please check your input and try again.",
            answer: "Incorrect answer! Please try again.",
          });
        }
      } else {
        console.error("Error during sign-in:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckBackup = async (
    values: { backupCode },
    { setSubmitting, setErrors }: FormikBag
  ): Promise<void> => {
    try {
      const result = await API.post("/auth/backupcode", values);
      if (result.data.success) {
        navigate("/dashboard");
      }
      handleVerifyFinish(result.data.success);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error during sign-in:", error.response?.data);
        if (error.response?.data?.message == "Invalid Backup Code") {
          setErrors({
            backupCode: "Incorrect backup code! Please try again.",
          });
        }
      } else {
        console.error("Error during sign-in:", error);
      }
    } finally {
      setSubmitting(false);
    }
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
      const signInRes = await API.post("/auth/signin", {
        ...reqData,
        ...clientInfo,
      });

      // Axios automatically parses JSON, so you don't need to call `.json()`
      const { user, token } = signInRes.data;

      API.defaults.headers.token = token;

      if(user.role === 'admin') {
        localStorage.setItem("token", token);
        API.defaults.headers.token = token;
        // Save user data in redux
        dispatch(updateProfile({ data: { ...user } }));

        navigate('/admin/dashboard');
       return; 
      }
      else {
        if (user.isEnableMFA) {
          setMode("otp");
          setResData({ user, token });
        } else {
          localStorage.setItem("token", token);
          API.defaults.headers.token = token;
          // Save user data in redux
          dispatch(updateProfile({ data: { ...user } }));
          dispatch(updateKyc({ data: user?.kyc }));
          dispatch(updateOtpStatus("verified"));
  
          setSubmitting(false);
          navigate("/dashboard");
        }
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

  const handleVerifyFinish = (result: boolean) => {
    if (result) {
      setToken(resData.token);
      dispatch(updateProfile({ data: { ...resData.user } }));
      dispatch(updateKyc({ data: resData.user?.kyc }));
      dispatch(updateOtpStatus("verified"));

      navigate("/dashboard", { replace: true });
    } else {
      dispatch(updateOtpStatus("failed"));

      navigate("/signin", { replace: true });
    }
  };

  return (
    <Styled.MainRow navbarheight={navbarheight}>
      <Styled.MainCard>
        <Styled.StyledH1>Sign In if you're a member</Styled.StyledH1>
        {mode === "cre" && <SignInForm onSubmit={handleSignIn} />}
        {mode === "otp" && (
          <>
            <OtpForm onFinish={handleVerifyFinish} />
            <p
              style={{
                textAlign: "center",
                color: "dodgerblue",
                cursor: "pointer",
              }}
              onClick={() => setMode("que")}
            >
              Didn't receive code?
            </p>
          </>
        )}
        {mode === "que" && (
          <SecurityQuestionForm
            setMode={setMode}
            onSubmit={handleCheckQuestion}
          />
        )}

        {mode === "bac" && (
          <BackupCodeForm setMode={setMode} onSubmit={handleCheckBackup} />
        )}

        <p>
          <Styled.SignUpBtn>
            <Styled.StyleLink to="/signup">Sign Up</Styled.StyleLink>
          </Styled.SignUpBtn>
          to join QUICKPAYUS.
        </p>
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
