import React, { useState } from "react";
import { Input, Button, Typography, List, Form } from "antd";
// import 'antd/dist/antd.css';
import * as Styled from './Style/Announcement.styled';
const { Title, Text } = Typography;

interface Announcement {
  id: number;
  subject: string;
  content: string;
  senderId: string;
  timestamp: string;
}

const Announcement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [form] = Form.useForm();

  const handleCreateAnnouncement = (values: any) => {
    const { subject, content } = values;
    if (subject && content) {
      const newId =
        Math.max(...announcements.map((announcement) => announcement.id), 0) +
        1;
      const timestamp = new Date().toISOString();
      const newAnnouncementData: Announcement = {
        id: newId,
        subject: subject,
        content: content,
        senderId: "admin123", // Admin ID placeholder
        timestamp: timestamp,
      };
      setAnnouncements((prevAnnouncements) => [
        ...prevAnnouncements,
        newAnnouncementData,
      ]);
      form.resetFields();
    }
  };

  return (
    <Styled.Container>
      <Title level={2} style={{textAlign: "left", marginBottom: "24px"}}>
        Announcements Page
      </Title>
      <Styled.Layout>
        <Title level={4}>Compose New Announcement:</Title>
        <Form
          form={form}
          onFinish={handleCreateAnnouncement}
          initialValues={{ subject: "", content: "" }}
        >
          <Form.Item
            name="subject"
            rules={[{ required: true, message: "Please enter the subject" }]}
          >
            <Input placeholder="Subject" />
          </Form.Item>
          <Form.Item
            name="content"
            rules={[{ required: true, message: "Please enter the content" }]}
          >
            <Input.TextArea placeholder="Content" autoSize={{ minRows: 3 }} />
          </Form.Item>
          <Form.Item>
            <Button style={{borderRadius: "8px"}} type="primary" htmlType="submit">
              Send Announcement
            </Button>
          </Form.Item>
        </Form>
      </Styled.Layout>
      <Styled.Layout>
        <Title level={3} style={{marginBottom: "16px"}}>
          Announcement Logs:
        </Title>
        {announcements.length === 0 ? (
          <Text>No announcements sent yet.</Text>
        ) : (
          <List
            dataSource={announcements}
            renderItem={(announcement: Announcement) => (
              <List.Item>
                <div>
                  <Title level={4}>Subject: {announcement.subject}</Title>
                  <p style={{fontSize: "14px", color: "#6b7280", marginTop: "4px"}}>
                    Content: {announcement.content}
                  </p>
                  <p style={{fontSize: "14px", color: "#6b7280", marginTop: "4px"}}>
                    Sender ID: {announcement.senderId}
                  </p>
                  <p style={{fontSize: "14px", color: "#6b7280", marginTop: "4px"}}>
                    Timestamp: {announcement.timestamp}
                  </p>
                </div>
              </List.Item>
            )}
          />
        )}
      </Styled.Layout>
    </Styled.Container>
  );
};

export default Announcement;
