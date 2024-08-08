import React, { useState } from "react";
import { Modal, Button, Typography  } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import * as Styled from './SystemNotifications.styled';

const {Text} = Typography;

interface Notification {
  id: number;
  message: string;
  time: string;
  content: string;
}

const SystemNotifications: React.FC = () => {
  // Dummy system notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "New user registered",
      time: "5 minutes ago",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      message: "Order #123 shipped",
      time: "1 hour ago",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      message: "Payment received",
      time: "2 hours ago",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      message: "Server maintenance scheduled",
      time: "1 day ago",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 5,
      message: "Product out of stock",
      time: "2 days ago",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Function to open the modal and set the selected notification
  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  // Function to delete a notification
  const deleteNotification = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
    setModalVisible(false);
  };

  return (
    <div id="no-selection" className="w-full px-6">
      <Title level={2} className="text-2xl font-semibold mb-4">System Notifications</Title>
      {notifications.length > 0 ? (
        <Styled.Card className="dashboard-card">
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="flex justify-between border-b py-2"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <Text className="text-lg font-semibold">
                    {notification.message}
                  </Text>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
                <Button
                  type="primary"
                  danger
                  style={{borderRadius: "8px"}}
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Styled.Card>
      ) : (
        <h2 className="text-7xl opacity-25 text-center py-20 flex flex-col items-center justify-center gap-5">
          <FileImageOutlined />
          <span className="text-2xl font-bold">No Data</span>
        </h2>
      )}
      <Modal
        title={selectedNotification ? selectedNotification.message : ""}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="deleteModal"
            type="primary"
            danger
            onClick={() => deleteNotification(selectedNotification?.id || 0)}
          >
            Delete
          </Button>,
        ]}
      >
        {selectedNotification && (
          <div>
            <p>{selectedNotification.time}</p>
            <p>{selectedNotification.content}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SystemNotifications;
