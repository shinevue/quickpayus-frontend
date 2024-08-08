import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Typography, List } from "antd";
import { addNotification, getNotification } from "../UserNotificationsApi";
import moment from "moment";
// import "antd/dist/antd.css";

const { Title, Text } = Typography;

export interface NotifyData {
  title: string;
  message: string;
  adminCreated: boolean;
}
export interface Notification extends NotifyData {
  _id: number;
  userId: string;
  isRead: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const UserNotifications: React.FC = () => {
  const [notificationTitle, setNotificationTitle] = useState<string>("");
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const formRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { data } = await getNotification();
      setNotifications(data);
    })();
  }, []);

  const handleNotificationSubmit = async (values: any) => {
    const newNotification: NotifyData = {
      title: values.notificationTitle,
      message: values.notificationMessage,
      adminCreated: true,
    };
    const res = await addNotification(newNotification);
    if (res?.success) {
      const { data } = await getNotification();
      setNotifications(data);
      if (formRef.current) formRef.current?.resetFields(); // Reset notificationMessage
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <div style={{borderRadius: "18px", backgroundColor: "var(--color-bg-container)", padding: "30px"}}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "16px" }}>
          Notifications
        </Title>
        <Form
          layout="vertical"
          onFinish={handleNotificationSubmit}
          ref={formRef}
        >
          <Form.Item
            label="Notification Title"
            name="notificationTitle"
            rules={[
              { required: true, message: "Please enter notification title" },
            ]}
          >
            <Input
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Notification Message"
            name="notificationMessage"
            rules={[
              { required: true, message: "Please enter notification message" },
            ]}
          >
            <Input.TextArea
              rows={5}
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{borderRadius: "8px"}} htmlType="submit">
              Send Notification
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: "32px" }}>
          <Title level={2} style={{ marginBottom: "16px" }}>
            Notification Log
          </Title>
          <List
            dataSource={notifications}
            locale={{ emptyText: "No notifications sent yet." }}
            renderItem={(notification: Notification) => (
              <List.Item>
                <div>
                  <Title level={4}>{notification.title}</Title>
                  <Text>
                    Sent by Admin: {notification.userId} |
                    {moment(notification.createdAt).format("MMM-DD-yyyy")}
                  </Text>
                </div>
                <Text className="mt-2">{notification.message}</Text>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
