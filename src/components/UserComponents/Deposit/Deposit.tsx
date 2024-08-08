import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleOutlined, CopyOutlined } from "@ant-design/icons";
import { Select, Button, Modal, message } from "antd";

import {
  usePostDepositFormMutation,
  useGetProgramsDataQuery,
} from "@/app/slice";

import * as Styled from "./Deposit.styled";
import useContainer from "@/utils/Hooks/useContainer";
import { API } from "@/utils/api";

const { Option } = Select;

interface FormProps {
  receiverAddress: string;
  senderAddress: string;
  investmentAmount: number;
}

const Deposit: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formValues, setFormValues] = useState<FormProps>({
    receiverAddress: "",
    senderAddress: "TCCh4m1Hjerfd3bd5AbXFfAriYVndFzSvY",
    investmentAmount: 500,
  });
  const [address, setAddress] = useState<string>("");

  const {
    data: programsData,
    isLoading: programsLoading,
    refetch,
  } = useGetProgramsDataQuery(null);
  const [postData, { isLoading: submitLoading }] = usePostDepositFormMutation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    refetch();
    (async () => {
      const { data } = await API.get("/transactions/receiver");
      setAddress(data.address.newAddress);
      setFormValues({
        ...formValues,
        receiverAddress: data.address.newAddress,
      });
    })();
  }, []);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirm = (values) => {
    setFormValues(values);
    setIsModalVisible(true);
  };

  const handleModalSubmit = async () => {
    try {
      await postData({
        receiverAddress: address,
        senderAddress: formValues.senderAddress,
        transactionType: "DEPOSIT",
        amount: formValues.investmentAmount,
      });
      setIsModalVisible(false);
      messageApi.open({
        type: "success",
        content: 'Deposit succeed!',
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {contextHolder}
      <Styled.PageHeading>Deposit</Styled.PageHeading>
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object().shape({
          investmentAmount: Yup.string().required(
            "Investment amount is required"
          ),
          senderAddress: Yup.string().required("Sender Address is required"),
        })}
        onSubmit={(values) => handleConfirm(values)}
      >
        {({ errors, touched, setFieldValue, handleSubmit }) => {
          return (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                (e.nativeEvent as any).submitter.className.split(" ")[0] ===
                  "ant-btn" && handleSubmit();
              }}
            >
              <Styled.StyledCard bordered={true}>
                <Styled.PageCover className="hoverdata">
                  <Styled.FlexColumnContainer>
                    <Styled.StyledLabel>
                      <span>Investment amount:</span>
                    </Styled.StyledLabel>
                    <Styled.FieldCover>
                      <Field name="investmentAmount">
                        {({ field }) => (
                          <Styled.SelectOne
                            className="select"
                            style={{
                              overflow: "hidden",
                            }}
                            {...field}
                            loading={programsLoading}
                            onChange={(value) => {
                              setFieldValue("investmentAmount", value);
                            }}
                          >
                            {programsData &&
                              programsData?.data?.map((item) => {
                                if ("data" in item) {
                                  return item.data.map((program) => {
                                    if ("investment" in program) {
                                      const { investment } = program;
                                      return (
                                        <Option
                                          key={investment}
                                          value={investment}
                                        >
                                          ${investment}
                                        </Option>
                                      );
                                    } else {
                                      return null;
                                    }
                                  });
                                } else {
                                  return null;
                                }
                              })}
                          </Styled.SelectOne>
                        )}
                      </Field>
                    </Styled.FieldCover>
                    <ErrorMessage
                      name="investmentAmount"
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
                  </Styled.FlexColumnContainer>
                  <Styled.FlexColumnContainer>
                    <Styled.StyledLabel>
                      <span>Receiver Address:</span>
                    </Styled.StyledLabel>
                    <Styled.FieldCover>
                      <Field name="receiverAddress">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <Styled.InputBox
                              style={{ background: "transparent" }}
                              {...field}
                              contentEditable="false"
                              value={address}
                              disabled
                            />
                            <CopyToClipboard text={field.value} onCopy={onCopy}>
                              <Styled.CopyToClipboardContent>
                                {copied ? (
                                  <CheckCircleOutlined />
                                ) : (
                                  <CopyOutlined />
                                )}
                              </Styled.CopyToClipboardContent>
                            </CopyToClipboard>
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Styled.FieldCover>
                  </Styled.FlexColumnContainer>
                  <Styled.FlexColumnContainer>
                    <Styled.StyledLabel>
                      <span>Sender Address:</span>
                    </Styled.StyledLabel>
                    <Styled.FieldCover>
                      <Field name="senderAddress">
                        {({ field }) => (
                          <Styled.InputBox
                            style={{
                              overflow: "hidden",
                            }}
                            {...field}
                            placeholder="Enter sender address"
                          />
                        )}
                      </Field>
                    </Styled.FieldCover>
                    <ErrorMessage
                      name="senderAddress"
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
                  </Styled.FlexColumnContainer>
                </Styled.PageCover>
              </Styled.StyledCard>
              <Styled.SubmitButtonContainer>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: "#007AFF" }}
                >
                  Submit
                </Button>
              </Styled.SubmitButtonContainer>
            </Form>
          );
        }}
      </Formik>
      <Modal
        title="Confirmation"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleModalSubmit}
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

export default Deposit;
