import { useState } from "react";

// antd
import { Input, Button, Modal, Form, Select, Flex } from "antd";
import { LeftOutlined, PaperClipOutlined } from "@ant-design/icons";

// components
import { UploadButton } from "../UploadButton/UploadButton";
import useContainer from "@/utils/Hooks/useContainer";

// styles
import * as Styled from "./CustomTicket.styled";
import { API } from "@/utils/api";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const CustomTicket: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);

  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("priority", priority);

    fileList.forEach((file) => {
      formData.append("files", file.fileObj);
    });
    try {
      await API.post("/support/ticket", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/support");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/support");
    setOpen(false);
  };

  const getFileList = (images: any) => {
    const filesWithSerializedDate = images.fileList.map((file: any) => ({
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
      <Styled.TitleBox>
        <Styled.CustomLink to="/support">
          <LeftOutlined />
        </Styled.CustomLink>
        <Styled.StyledTitle>Ticket Submission System</Styled.StyledTitle>
      </Styled.TitleBox>
      <Form
        name="ticket_submit_form"
        onFinish={(values) => {
          setSubject(values.subject);
          setDescription(values.description);
          setPriority(values.priority);
          showModal();
        }}
        layout="vertical"
      >
        <Styled.StyledCard>
          <Flex gap={`30px`}>
            <Form.Item
              style={{ flex: 1 }}
              name="subject"
              rules={[{ required: true, message: "Please input subject!" }]}
              label="Subject"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              style={{ width: "200px" }}
              name="priority"
              rules={[{ required: true, message: "Please input priority!" }]}
              label="Priority"
            >
              <Select
                options={[
                  { label: "LOW", value: "LOW" },
                  { label: "MEDIUM", value: "MEDIUM" },
                  { label: "HIGH", value: "HIGH" },
                ]}
              />
            </Form.Item>
          </Flex>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
            label="Description"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Attachments"
            rules={[{ required: true, message: "Please select the file!" }]}
          >
            <UploadButton getFileList={getFileList} maxCount={2} />
          </Form.Item>
        </Styled.StyledCard>
        <Styled.ButtonWrapper>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Styled.ButtonWrapper>
      </Form>
      <Modal
        title="Review Ticket"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        getContainer={useContainer}
      >
        <Styled.StyledModalTitle>{subject}</Styled.StyledModalTitle>
        <p>{description}</p>
        {fileList.map((item, index) => (
          <p key={index}>
            <PaperClipOutlined />
            {item.name}
          </p>
        ))}
      </Modal>
    </>
  );
};

export default CustomTicket;
