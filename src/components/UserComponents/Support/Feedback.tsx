import React, { useState } from "react";
import styled from "styled-components";

import { Form, Input, Button, Upload, Modal, Card, Rate, Space } from "antd";
import { InboxOutlined, LeftOutlined } from "@ant-design/icons";

import { breakpoint } from "@/breakpoints";
import useContainer from "@/utils/Hooks/useContainer";
import { Link, useNavigate } from "react-router-dom";
import { UploadButton } from "../UploadButton/UploadButton";

import { API } from "@/utils/api";

const { TextArea } = Input;

export const Title = styled.h2`
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  text-align: center;
  ${breakpoint.md} {
    text-align: left;
  }
`;

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  transition: all var(--transition-time-when-switch-theme-mode);
  background: var(--color-bg-container);
  padding-inline: 10px;
  &:hover {
    background: var(--background-affix-hover);
    color: var(--color-text);
  }
  padding: 10px 10px;
  margin-bottom: var(--margin-bottom-page-title);
  border-radius: 5px;
`;

const FeedbackForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [rate, setRate] = useState<number>(5);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    if (values.feedback) setFeedback(values.feedback);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  const handleGo = async (values: any) => {
    const formData = new FormData();
    formData.append("feedback", feedback);
    formData.append("rating", rate.toString());

    fileList.forEach((file) => {
      formData.append("files", file.fileObj);
    });
    try {
      const result = await API.post("/support/feedback", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/support");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleRateChange = (value: number) => {
    setRate(value);
  };

  const getFileList = (images) => {
    const filesWithSerializedDate = images.fileList.map((file) => ({
      // ...file,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate.toISOString(), // Convert Date to string
      name: file.name,
      size: file.size,
      fileObj: file.originFileObj,
      // Copy any other needed properties
    }));
    setFileList(filesWithSerializedDate);
  };

  return (
    <>
      <TitleBox>
        <CustomLink to="/support">
          <LeftOutlined />
        </CustomLink>
        <Title>Send Feedback</Title>
      </TitleBox>
      <Form
        form={form}
        name="feedback_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <StyledCard>
          <Space style={{ margin: "20px" }}>
            <Rate allowHalf defaultValue={rate} onChange={handleRateChange} />
          </Space>
          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true, message: "Please input feedback!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Attach Screenshot">
            <UploadButton getFileList={getFileList} maxCount={2} />
          </Form.Item>
        </StyledCard>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit">
            Submit Feedback
          </Button>
        </ButtonWrapper>
      </Form>

      <Modal
        title="Feedback Submitted"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleGo}>
            OK
          </Button>,
        ]}
        centered
        getContainer={useContainer}
      >
        <p>Thank you for your feedback!</p>
        <p>We'll review it and get back to you if necessary.</p>
      </Modal>
    </>
  );
};

export default FeedbackForm;
