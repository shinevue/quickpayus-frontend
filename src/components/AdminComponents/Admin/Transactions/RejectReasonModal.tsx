import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

interface RejectReasonModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleSubmit: (reason: string) => void;
}

export const RejectReasonModal: React.FC<RejectReasonModalProps> = ({
  visible,
  setVisible,
  handleSubmit,
}: RejectReasonModalProps) => {
  const [form] = Form.useForm();
  const [reason, setReason] = useState<string>("");

  const handleCancel = () => {
    setReason("");
    form.resetFields();
    setVisible(false);
  };

  const handleOk = () => {
    handleSubmit(reason);
    setVisible(false);
    setReason("");
    form.resetFields();
  };

  const onInputChange = (e: any) => {
    setReason(e.target.value);
  };

  return (
    <Modal
      open={visible}
      title="Reason"
      okText="Submit"
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="description"
          label="Please enter a reason for rejection."
        >
          <Input value={reason} onChange={onInputChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
