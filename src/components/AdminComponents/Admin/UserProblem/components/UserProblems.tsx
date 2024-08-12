import React, { useState, useEffect } from "react";
import {
  List,
  Tag,
  Typography,
  Collapse,
  Modal,
  Flex,
  Input,
  DatePicker,
  Divider,
  Space,
  Pagination,
  Button,
  message,
} from "antd";

const { Text, Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
import { fetchTickets, sendTicketReply } from "../UserProblemsApi";
import { TicketType } from "@/types/TicketsType";
import { PRIORITY, STATUS } from "@/constants";
import { ReplyModal } from "./ReplyModal";
import ExpandableText from "./ExpandableText";

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
const SupportAndCommunication: React.FC = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [totalCount, setTotalCount] = useState<number>();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [dateRange, setDateRange] = useState<string[]>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number>(-1);
  const [replyModalVisible, setReplyModalVisible] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetch = (payload: {
    page: number;
    keyword: string;
    pageSize: number;
    dateRange: string[];
  }) => {
    fetchTickets(payload).then((response) => {
      setTickets(response.tickets);
      setTotalCount(response.totalCount);
    });
  };

  useEffect(() => {
    console.log(keyword);
    fetch({
      page,
      keyword,
      pageSize,
      dateRange,
    });
  }, [page, keyword, pageSize, dateRange]);

  const handleKeywordChange = (e: any) => {
    const keyword = e.currentTarget.value;
    setKeyword(keyword);
  };

  const handleDateRangeChange = (_: any, dateRange: any) => {
    setDateRange(dateRange);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const handleReply = (id: number) => {
    setSelectedTicketIndex(id);
    setReplyModalVisible(true);
  };

  const handleReplySubmit = async (data: any) => {
    if (selectedTicketIndex === -1) {
      setReplyModalVisible(false);
    }

    const result = await sendTicketReply({
      ticketId: tickets[selectedTicketIndex].id,
      username: tickets[selectedTicketIndex].createdBy,
      ...data,
    });
    if (result.success) {
      tickets[selectedTicketIndex].status = "RESOLVED";
      setTickets([...tickets]);
      messageApi.open({
        type: "success",
        content:
          "Message sent successfully!",
      });
    }
  };

  return (
    <div style={{ padding: "25px" }} id="no-selection">
      {contextHolder}
      <Title className="title">
        Support and Communication
      </Title>
      <div
        style={{
          padding: "25px 25px",
          backgroundColor: "var(--color-bg-container)",
          borderRadius: "18px",
          overflow: "auto",
        }}
      >
        <Modal
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <img
            crossOrigin="anonymous"
            src={selectedImage}
            alt={selectedImage}
            style={{ width: "100%", padding: "20px" }}
          />
        </Modal>

        <ReplyModal
          visible={replyModalVisible}
          setVisible={setReplyModalVisible}
          handleSubmit={handleReplySubmit}
        />

        <div>
          <Title level={4} style={{ marginBottom: "10px" }}>
            Tickets
          </Title>
          <Flex justify="center" gap="middle" wrap flex={5} style={{marginBottom: "20px"}}>
            <Flex flex={6}>
              <Input
                value={keyword}
                placeholder="Please type some word"
                onChange={handleKeywordChange}
              />
            </Flex>
            <Flex flex={6}>
              <RangePicker onChange={handleDateRangeChange} />
            </Flex>
          </Flex>
          <Space
            align="center"
            style={{ justifyContent: "center", width: "100%" }}
          >
            <Pagination
              current={page}
              total={totalCount}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
            />
          </Space>
        </div>
      </div>
      {tickets.length === 0 ? (
        <div
          style={{
            backgroundColor: "var(--color-bg-container)",
            padding: "25px",
            borderRadius: "18px",
            marginTop: "25px",
          }}
        >
          <Text>No Tickets</Text>
        </div>
      ) : (
        <List
          style={{ marginTop: "25px" }}
          dataSource={tickets}
          renderItem={(ticket, index) => (
            <List.Item
              key={ticket.id}
              style={{
                borderBottom: "1px solid #f0f0f0",
                padding: "25px",
                backgroundColor: "var(--color-bg-container)",
                borderRadius: "18px",
                flexDirection: "column",
                marginBottom: "25px",
              }}
            >
              <div style={{ width: "100%" }}>
                <Title level={4}>{ticket.title}</Title>
                <Flex justify="space-between" style={{ width: "100%" }}>
                  <Space>
                    <Text type="secondary">Created by: {ticket.createdBy?.username}</Text>
                  </Space>
                  <Space>
                    <Tag
                      color={
                        ticket.status === STATUS.PENDING ? "gold" : "green"
                      }
                    >
                      {ticket.status}
                    </Tag>
                    <Tag
                      color={
                        ticket.priority === PRIORITY.HIGH
                          ? "red"
                          : ticket.priority === PRIORITY.MEDIUM
                          ? "blue"
                          : "green"
                      }
                    >
                      {ticket.priority}
                    </Tag>
                  </Space>
                </Flex>
                <Divider />
                <Paragraph>
                  <ExpandableText text={ticket.description} maxLength={100} />
                  <Flex justify="space-between">
                    {!ticket.image && (
                      <div>
                        <Text
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() =>
                            handleImageClick(baseApiUrl + ticket.image!)
                          }
                        >
                          Image provided
                        </Text>
                      </div>
                    )}
                    <Button type="primary" onClick={() => handleReply(index)}> Reply </Button>
                  </Flex>
                </Paragraph>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default SupportAndCommunication;
