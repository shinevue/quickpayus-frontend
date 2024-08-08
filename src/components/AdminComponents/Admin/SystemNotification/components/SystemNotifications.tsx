import React, { useEffect, useState } from "react";
import { Modal, Button, Typography } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import * as Styled from "../../../SystemNotifications.styled";
import {
  delSystemNotification,
  getSystemNotification,
} from "../SystemNotificationApi";
import moment from "moment";

const { Text } = Typography;

interface Notification {
  _id: number;
  title: string;
  message: string;
  updatedAt: string;
  during: number;
}

const SystemNotifications: React.FC = () => {
  // Dummy system notifications data
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await getSystemNotification();
      if (res.data)
        setNotifications(
          res.data.map((item) => {
            return {
              ...item,
              during: moment(new Date()).diff(
                new Date(item.updatedAt),
                "hours"
              ),
            };
          })
        );
    })();
  }, []);

  // Function to open the modal and set the selected notification
  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  // Function to delete a notification
  const deleteNotification = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification._id !== notificationId
      )
    );
    delSystemNotification(notificationId);
    setModalVisible(false);
  };

  return (
    <div id="no-selection" className="w-full px-6">
      <Title style={{fontSize: '21px', marginBottom: "20px"}}>
        System Notifications
      </Title>
      {notifications.length > 0 ? (
        <Styled.Card className="dashboard-card">
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className="flex justify-between border-b py-2"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <Text className="text-[14px] font-semibold">
                    {notification.message}
                  </Text>
                  <p className="text-sm text-gray-500">
                    {notification.during < 24
                      ? `${notification.during}h`
                      : `${Math.floor(notification.during / 24)}d ${Math.floor(
                          notification.during % 24
                        )}h`}{" "}
                    ago
                  </p>
                </div>
                <Styled.DangerButton
                  type="primary"
                  onClick={() => deleteNotification(notification._id)}
                >
                  Delete
                </Styled.DangerButton>
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
        title={selectedNotification ? selectedNotification.title : ""}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Styled.DangerButton
            key="deleteModal"
            type="primary"
            onClick={() => deleteNotification(selectedNotification?._id || 0)}
          >
            Delete
          </Styled.DangerButton>,
        ]}
      >
        {selectedNotification && (
          <div>
            <p>{selectedNotification.message}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SystemNotifications;
