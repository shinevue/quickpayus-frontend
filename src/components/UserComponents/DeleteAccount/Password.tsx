import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, Modal, Input, Button } from "antd";
import { Formik, Field } from "formik";
import * as Styled from "./accountdelete.styled";
import FloatingLabelInputPassword from "../Auth/FloatingInput/FloatingInputPassword";
import useContainer from "@/utils/Hooks/useContainer";
import { useDispatch, useSelector } from "react-redux";
import { API } from "@/utils/api";
import { selectProfile } from "@/app/selectors";
import { updateProfileField } from "@/app/profileSlice";
import { usePostDataMutation, useSendDataMutation } from "@/app/slice"; // Update the path accordingly
import axios from "axios";

interface FormErrors {
  password?: string;
}

interface DeleteAccountValues {
  password: string;
}

const AccountDelete: React.FC = () => {
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [otp, setOtp] = useState("");
  const [getOtp, setGetOtp] = useState(""); // will get from backend
  const [deletePassword, setDeletePassword] = useState("");
  const [wrongPwd, setWrongPwd] = useState("");

  const { id: userId } = useSelector(selectProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postData] = usePostDataMutation();
  const [sendData] = useSendDataMutation();

  const handlePasswordSubmit = async (
    values: DeleteAccountValues
  ): Promise<void> => {
    setDeletePassword(values.password);

    try {
      const result = await API.post("/auth/delete", {
        pwd: values.password,
        userId,
        check: "check",
      });
      setWrongPwd("");
      try {
        // Call API to send OTP
        const { data }:any = await postData({ url: "/otp/create", data: "", id: "" });
        setGetOtp(data?.otp);
        setOtpModalVisible(true);
      } catch (error) {
        console.error("Failed to send OTP:", error);
        alert("There is some mistake. Please try again later");
      }

      // signOut();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // alert("Wrong Password");
        setWrongPwd("Wrong Password");
        setConfirmationModalVisible(false);
      }
    }
  };

  const handleOtpSubmit = async () => {
    // Simulate OTP verification process
    if (otp === getOtp) {
      // Assuming 123456 as the correct OTP for demonstration
      setOtpModalVisible(false);
      setConfirmationModalVisible(true);
    } else {
      alert("Invalid OTP");
      setOtpModalVisible(false);
    }
  };

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(updateProfileField({ field: "username", value: null }));
  }, []);

  const handleFinalDeleteAccount = async () => {
    // Simulate account deletion process

    try {
      await sendData({ url: "/otp/send", data: "", id: "" });
    } catch (error) {
      console.log(error);
    }

    const result = await API.post("/auth/delete", {
      pwd: deletePassword,
      userId,
    });
    signOut();
    setConfirmationModalVisible(false);
  };

  return (
    <Styled.MainRow className="account-delete">
      <Col xs={24} sm={14} md={12} lg={10} xl={9}>
        <Styled.MainCard>
          <Styled.StyledH1>Delete Your Account</Styled.StyledH1>
          <Formik
            initialValues={{ password: "" }}
            validate={(values) => {
              const errors: FormErrors = {};
              if (!values.password) {
                errors.password = "Please input your password";
              }
              return errors;
            }}
            onSubmit={handlePasswordSubmit}
          >
            {({ errors, handleSubmit, isSubmitting }) => (
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label=""
                  validateStatus={errors.password && "error"}
                  style={{ marginTop: "30px" }}
                  help={errors.password}
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
                <Form.Item>
                  <Styled.SignInButton
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    Delete My Account
                  </Styled.SignInButton>
                  {wrongPwd.length != 0 ? (
                    <p style={{ color: "red", textAlign: "center" }}>
                      {wrongPwd}
                    </p>
                  ) : (
                    ""
                  )}
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Styled.MainCard>
      </Col>

      <Modal
        title="Please check your email for OTP"
        open={otpModalVisible}
        onOk={handleOtpSubmit}
        onCancel={() => setOtpModalVisible(false)}
        centered
        getContainer={useContainer}
      >
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>

      <Modal
        title="Confirm Account Deletion"
        open={confirmationModalVisible}
        onOk={handleFinalDeleteAccount}
        onCancel={() => setConfirmationModalVisible(false)}
        centered
        getContainer={useContainer}
      >
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
      </Modal>
    </Styled.MainRow>
  );
};

export default AccountDelete;
