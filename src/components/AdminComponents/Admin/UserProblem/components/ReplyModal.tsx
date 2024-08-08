import React from "react";
import { Modal, Form, Input } from "antd";

interface ReplyModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleSubmit: (payload: any) => void;
}

export const ReplyModal: React.FC<ReplyModalProps> = ({
  visible,
  setVisible,
  handleSubmit,
}: ReplyModalProps) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleReplySubmit = (values: any) => {
    handleSubmit(values);
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
      title="Send Treatment Reply"
      okText="Submit"
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" onFinish={handleReplySubmit}>
        <Form.Item
          label="Reply Title"
          name="title"
          rules={[{ required: true, message: "Please enter Reply title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Reply Message"
          name="content"
          rules={[{ required: true, message: "Please enter Reply message" }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
