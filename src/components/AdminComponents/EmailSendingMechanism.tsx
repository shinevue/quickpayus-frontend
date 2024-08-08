import React, { useState } from "react";
import { Button, Input, Upload, message, Modal, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { TextArea } = Input;
const { Dragger } = Upload;
const {Title} = Typography;

const Card = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  background-color: var(--color-bg-container);
  border-radius: 8px;
`

const EmailSending = () => {
  const [emailContent, setEmailContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAttachmentUrl, setModalAttachmentUrl] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!emailSubject || !emailContent) {
      message.error("Subject and content cannot be empty");
      return;
    }

    const timestamp = new Date().toISOString();
    const sentEmail = {
      id: sentEmails.length + 1,
      subject: emailSubject,
      content: emailContent,
      timestamp: timestamp,
      attachment: attachment,
    };
    setSentEmails([...sentEmails, sentEmail]);
    setEmailSubject("");
    setEmailContent("");
    setAttachment(null);

    message.success("Email sent successfully");
  };

  const handleViewAttachment = (attachmentUrl) => {
    setModalAttachmentUrl(attachmentUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalAttachmentUrl("");
  };

  return (
    <div style={{padding: "24px"}}>
      <Card style={{borderRadius: "18px", padding: "25px"}}>
        <div style={{marginTop: '16px'}}>
          <Title level={2} style={{textAlign: "center", marginBottom: "30px"}}>
            Compose Email
          </Title>
          <form onSubmit={handleEmailSubmit}>
            <Input
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Email Subject"
              style={{marginBottom: "16px"}}
            />
            <TextArea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Email Content"
              rows={5}
              style={{marginBottom: "16px"}}
            />
            <Dragger
              name="attachment"
              multiple={false}
              onChange={(info) => {
                const { status, originFileObj } = info.file;
                if (status === "done") {
                  setAttachment(originFileObj);
                  message.success(
                    `${info.file.name} file uploaded successfully.`
                  );
                } else if (status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
              style={{marginBottom: '16px'}}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px"}}>
              <Button style={{borderRadius: "8px"}} type="primary" htmlType="submit">
                Send Email
              </Button>
              <Button style={{borderRadius: "8px"}} type="default" onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>

        <div style={{marginTop: '32px'}}>
          <Title level={3} style={{textAlign: "center"}}>
            Sent Emails Log
          </Title>
          {sentEmails.length === 0 ? (
            <p style={{color: "#6b7280", textAlign: "center"}}>No emails sent yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {sentEmails.map((email, index) => (
                <li key={index} className="py-4">
                  <h4 style={{fontSize: '16px', fontWeight: 600}}>
                    Subject: {email.subject}
                  </h4>
                  <p style={{marginTop: '4px', fontSize: '14px', color: "#374151"}}>
                    Content: {email.content}
                  </p>
                  <p style={{marginTop: '4px', fontSize: '14px', color: "#374151"}}>
                    Timestamp: {email.timestamp}
                  </p>
                  {email.attachment && (
                    <div style={{marginTop: "4px", display: "flex", gap: "8px"}}>
                      Attachment :
                      <span
                      style={{color: "#3b82f6", textDecoration: "underline", cursor: "pointer"}}
                        onClick={() =>
                          handleViewAttachment(
                            URL.createObjectURL(email.attachment)
                          )
                        }
                      >
                        View Attachment
                      </span>
                      <a
                        href={URL.createObjectURL(email.attachment)}
                        style={{color: "#3b82f6", textDecoration: "underline", cursor: "pointer"}}
                        download={email.attachment.name}
                      >
                        Download Attachment
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
      <Modal open={modalVisible} onCancel={closeModal} footer={null}>
        <img
          src={modalAttachmentUrl}
          alt="Attachment"
          style={{ maxWidth: "100%" }}
        />
      </Modal>
    </div>
  );
};

export default EmailSending;
