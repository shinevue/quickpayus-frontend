import React, { useState } from "react";
import { List, Button, Tag, Typography, Collapse, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { Panel } = Collapse;

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  createdBy: string;
  image?: string;
}

const SupportAndCommunication: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: "Issue with account activation",
      description: "I am unable to activate my account. Please help!",
      status: "Open",
      priority: "High",
      createdAt: "2024-05-15T10:30:00",
      createdBy: "John Doe",
      image:
        "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Payment not processed",
      description: "I made a payment but it's not reflecting in my account.",
      status: "Open",
      priority: "Medium",
      createdAt: "2024-05-14T15:45:00",
      createdBy: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Add more dummy ticket data as needed
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleCloseTicket = (ticketId: number) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: "Closed" } : ticket
      )
    );
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  return (
    <div style={{marginTop: "50px", padding: "0 30px"}} id="no-selection">
      <div
        style={{
          padding: "10px",
          backgroundColor: "var(--color-bg-container)",
          borderRadius: "18px",
          overflow: "auto"
          // boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Tickets
        </Title>

        <Modal
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <img src={selectedImage} alt="User provided" style={{width: "100%", padding: "20px"}}/>
        </Modal>

        <div>
          <Title level={4} style={{ marginBottom: "10px" }}>
            Tickets
          </Title>
          <List
            dataSource={tickets}
            renderItem={(ticket) => (
              <List.Item
                key={ticket.id}
                actions={[
                  ticket.status === "Open" && (
                    <Button
                      type="primary"
                      danger
                      style={{borderRadius: "8px"}}
                      onClick={() => handleCloseTicket(ticket.id)}
                      icon={<CloseOutlined />}
                    >
                      Close Ticket
                    </Button>
                  ),
                ]}
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <List.Item.Meta
                  title={<Text style={{minWidth: "200px"}} strong>{ticket.title}</Text>}
                  description={
                    <div>
                      <Collapse ghost>
                        <Panel header="Description" key="1">
                          <Text>{ticket.description}</Text>
                          {ticket.image && (
                            <div>
                              <Text
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={() => handleImageClick(ticket.image!)}
                              >
                                Image provided
                              </Text>
                            </div>
                          )}
                        </Panel>
                      </Collapse>
                    </div>
                  }
                />
                <div style={{display: 'flex', alignItems: "center", gap: "20px"}}>
                  <Tag color={ticket.status === "Open" ? "gold" : "green"}>
                    {ticket.status}
                  </Tag>
                  <Tag color="blue">{ticket.priority}</Tag>
                  <Text type="secondary">Created by: {ticket.createdBy}</Text>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SupportAndCommunication;
