import { useState, useEffect } from "react";
import { Input, Select, Button, Modal, message } from "antd";
import { InputOTP } from "antd-input-otp";
import { usePostDataMutation } from "@/app/slice"; // Update the path accordingly
import * as Styled from "./Withdrawal.styled";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { selectKycVerification, selectProfile } from "@/app/selectors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useContainer from "@/utils/Hooks/useContainer";

const { Option } = Select;

interface FormProps {
  withdrawalAmount: string;
  withdrawalAddress: string;
  transactionType: string;
}

const initialValues = {
  withdrawalAmount: "",
  withdrawalAddress: "",
  transactionType: "",
};

const Withdrawal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState([]);
  const [verificationError, setVerificationError] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormProps>({
    withdrawalAmount: "",
    withdrawalAddress: "",
    transactionType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [isKycModalVisible, setIsKycModalVisible] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [postData] = usePostDataMutation();
  const navigate = useNavigate();

  const profile = useSelector(selectProfile);
  const kycRedux = useSelector(selectKycVerification);

  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const isValidKyc = !!kycRedux?.status && kycRedux.status === "APPROVED";

  const validationSchema = Yup.object({
    withdrawalAmount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .max(currentBalance, "Please enter a valid withdrawal amount.")
      .min(10),
    withdrawalAddress: Yup.string()
      .required("Address is required")
      .matches(
        /^T.{33}$/,
        'Address must start with "T" and have a length of 34 characters'
      )
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Address must contain only alphanumeric characters"
      ),
    transactionType: Yup.string()
      .required("Transaction type is required")
      .oneOf(["DEPOSIT", "REWARD", "PROFIT"] as const),
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setOtpSent(false);
            return prevTimer;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const sendOTP = async () => {
    try {
      // Call API to send OTP
      setIsModalVisible(true); // Open the modal after OTP is sent
      setVerificationError("");
      setTimer(30);
      await postData({ url: "/otp/create", data: "", id: "" });
      setTimer(0);
      setOtpSent(true);
    } catch (error) {
      setVerificationError("Failed to send OTP. Please try again.");
    }
  };

  const handleRedirectKyc = () => {
    if (!kycRedux?.status) {
      navigate("/verification");
    } else {
      setIsKycModalVisible(false);
      messageApi.open({
        type: "warning",
        content: "Please wait until KYC is approved.",
      });
    }
  };

  const handleResendOTP = async () => {
    try {
      // Resend OTP logic
      await sendOTP();
      setVerificationError("");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setVerificationError("Failed to resend OTP. Please try again.");
    }
  };

  const handleInputChange = (value: any) => {
    setOtp(value);
  };

  const handleSubmit = async (values: any) => {
    try {
      setFormValues(values);

      if (currentBalance < parseFloat(values.withdrawalAmount)) {
      }
      if (!isValidKyc) {
        setIsKycModalVisible(true);
      } else {
        await sendOTP();
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp]);

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      setVerificationLoading(true);
      try {
        const result = await verifyOTP();
        // Clear OTP input value
        if (result.success) {
          setIsModalVisible(false); //Hide modal
          setOtp([]);
          setConfirmModalVisible(true);

          setVerificationError(""); //Remove error message after verification
        } else {
          setVerificationError("Invalid OTP. Please try again.");
          setOtp([]);
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setVerificationError("Invalid OTP. Please try again.");
      } finally {
        setTimeout(() => {
          setVerificationLoading(false);
        }, 1000);
      }
    } else {
      setVerificationError("Please enter the complete OTP code.");
    }
  };

  const handleBalanceChange = (value: any, callback: any) => {
    switch (value) {
      case "DEPOSIT":
        setCurrentBalance(profile["depositBalance" as keyof typeof profile]);
        break;
      case "PROFIT":
        setCurrentBalance(profile["profitBalance" as keyof typeof profile]);
        break;
      case "REWARD":
        setCurrentBalance(profile["rewardBalance" as keyof typeof profile]);
        break;
    }
    callback("transactionType", value);
  };
  const verifyOTP = async () => {
    try {
      const response = await postData({
        url: "/otp/verify",
        data: {
          userId: profile.id,
          otp: otp.join(""),
        },
        id: "",
      });
      if ("error" in response) {
        // Handle error case
        return response.error;
      } else {
        // Handle success case
        return response.data;
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      setVerificationError("Invalid OTP. Please try again.");
      return false;
    }
  };

  const submitTransaction = async () => {
    setIsLoading(true);

    try {
      // Submit transaction API
      const response = await postData({
        url: "transactions",
        data: {
          amount: formValues.withdrawalAmount,
          withdrawalType: formValues.transactionType,
          transactionType: "WITHDRAWAL",
          senderAddress: "TCCh4m1Hjerfd3bd5AbXFfAriYVndFzSvY", //Mock and Server Address
          receiverAddress: formValues.withdrawalAddress,
        },
        id: "",
      });
      if ("error" in response) {
        // Handle error case
        return response.error;
      } else {
        // Handle success case
        if (response.data.success) {
          messageApi.open({
            type: "success",
            content: 'Withdrawal succeed!',
          });
          setTimeout(() => {
            navigate("/transaction");
          }, 1000);
        }
      }
      // setErrors
    } catch (error) {
      console.error("Error submitting transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getContainer = () => {
    const container = document.getElementById("app-modals");
    return container ? container : document.body;
  };

  const validateNumberInput = (event: any) => {
    // Allow numbers, period, backspace, delete, arrows, enter, and tab
    if (
      !(
        (
          (event.key >= "0" && event.key <= "9") || // Allow numeric keys
          event.key === "." || // Allow period
          [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Enter",
            "Tab",
          ].includes(event.key)
        ) // Allow control keys
      )
    ) {
      event.preventDefault(); // Prevent all other keys
    }
  };

  const handleModalCancel = () => {
    setConfirmModalVisible(false);
  }

  return (
    <>
      {contextHolder}
      <Styled.StyledH2>Withdraw</Styled.StyledH2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Styled.StyledCard>
              <Styled.InputWrapper>
                <label>Amount:</label>
                <Field name="withdrawalAmount">
                  {({ field }: {field: any}) => (
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter amount"
                      style={{
                        overflow: "hidden",
                      }}
                      onKeyDown={validateNumberInput}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="withdrawalAmount"
                  component="div"
                  className="error"
                >
                  {(msg) => (
                    <Styled.AlertMessage
                      message={msg}
                      type="error"
                    ></Styled.AlertMessage>
                  )}
                </ErrorMessage>
              </Styled.InputWrapper>
              <Styled.InputWrapper>
                <label>Address:</label>
                <Field name="withdrawalAddress">
                  {({ field }: {field: any}) => (
                    <Input
                      type="text"
                      {...field}
                      style={{
                        overflow: "hidden",
                      }}
                      placeholder="Enter receiver account ID"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="withdrawalAddress"
                  component="div"
                  className="error"
                >
                  {(msg) => (
                    <Styled.AlertMessage
                      message={msg}
                      type="error"
                    ></Styled.AlertMessage>
                  )}
                </ErrorMessage>
              </Styled.InputWrapper>
              <Styled.BalanceContainer>
                <div>
                  <div style={{ marginBottom: "10px" }}>Type:</div>
                  <Field name="transactionType">
                    {({ field }: {field: any}) => (
                      <Styled.StyledSelect
                        {...field}
                        onChange={(value) =>
                          handleBalanceChange(value, setFieldValue)
                        }
                      >
                        <Option value="">Select Transaction Type</Option>
                        <Option value="PROFIT">Profit</Option>
                        <Option value="DEPOSIT">Deposit</Option>
                        <Option value="REWARD">Reward</Option>
                      </Styled.StyledSelect>
                    )}
                  </Field>
                  <ErrorMessage
                    name="transactionType"
                    component="div"
                    className="error"
                  >
                    {(msg) => (
                      <Styled.AlertMessage
                        message={msg}
                        type="error"
                      ></Styled.AlertMessage>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <div style={{ marginBottom: "10px" }}>My Balance:</div>
                  <Styled.Balance>{currentBalance}</Styled.Balance>
                </div>
              </Styled.BalanceContainer>
            </Styled.StyledCard>

            <Styled.SubmitButtonContainer>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                style={{ background: "#007AFF" }}
              >
                Submit
              </Button>
            </Styled.SubmitButtonContainer>
          </Form>
        )}
      </Formik>
      <Modal
        title="Enter OTP"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        getContainer={getContainer}
      >
        <div>
          <InputOTP
            value={otp}
            onChange={handleInputChange}
            disabled={timer > 0}
          />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              onClick={handleResendOTP}
              disabled={timer > 0}
            >
              {otpSent && timer > 0 ? `Resend OTP (${timer}s)` : "Submit OTP"}
            </Button>
          </div>
          {verificationError && (
            <div className="color-red">{verificationError}</div>
          )}
        </div>
      </Modal>

      <Modal
        title="Please verify your profile first. "
        centered
        open={isKycModalVisible}
        onOk={handleRedirectKyc}
        onCancel={() => setIsKycModalVisible(false)}
      />
      
      <Modal
        title="Confirmation"
        open={isConfirmModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            htmlType="submit"
            onClick={submitTransaction}
            style={{ background: "#007AFF" }}
          >
            Submit
          </Button>,
        ]}
        centered
        getContainer={useContainer}
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  );
};

export default Withdrawal;
