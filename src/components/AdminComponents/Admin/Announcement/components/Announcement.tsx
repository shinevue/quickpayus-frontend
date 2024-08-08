import React, { useEffect, useState } from "react";
import { Input, Button, Typography, List, Form } from "antd";
// import 'antd/dist/antd.css';
import * as Styled from "../../../Style/Announcement.styled";
import { addAnnouncement, getAnnouncement } from "../AnnouncementApi";
import moment from "moment";
const { Title, Text } = Typography;

interface Announcement {
  id: number;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
}

const Announcement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const res = await getAnnouncement();
      if (res.success) setAnnouncements(res.data);
    })();
  }, []);

  const handleCreateAnnouncement = async (values: any) => {
    const { title, description } = values;
    if (title && description) {
      const res = await addAnnouncement({
        title: title,
        description: description,
      });

      if (res.success) {
        const { data } = await getAnnouncement();
        setAnnouncements(data);
      }
      form.resetFields();
    }
  };

  return (
    <Styled.Container>
      <Title level={2} style={{ textAlign: "left", marginBottom: "24px" }}>
        Announcements
      </Title>
      <Styled.Layout>
        <Title level={4}>Compose New Announcement:</Title>
        <Form
          form={form}
          onFinish={handleCreateAnnouncement}
          initialValues={{ title: "", description: "" }}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea
              placeholder="description"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ borderRadius: "8px" }}
              type="primary"
              htmlType="submit"
            >
              Send Announcement
            </Button>
          </Form.Item>
        </Form>
      </Styled.Layout>
      <Styled.Layout>
        <Title level={3} style={{ marginBottom: "16px" }}>
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
                  <Title level={4}>title: {announcement.title}</Title>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    description: {announcement.description}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    Sender ID: {announcement.userId}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    Timestamp: {moment(announcement.createdAt).format("YYYY-MM-DD HH:mm")}
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
