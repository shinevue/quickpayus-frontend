import React, { useEffect, useState } from "react";

import {
  List,
  Typography,
  Tag,
  Card,
  Space,
  Avatar,
  Layout,
  Modal,
  Pagination,
  Divider,
  Input,
  Flex,
  DatePicker,
  Rate,
} from "antd";

const { Text } = Typography;
const { RangePicker } = DatePicker;

import { fetchFeedbacks } from "../FeedbackApi";
import { FeedbackType } from "@/types/FeedbackType";
import { UserOutlined } from "@ant-design/icons";

import * as Styled from "./FeedbackMechanism.styled";

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

const FeedbackMechanism: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [dateRange, setDateRange] = useState<string[]>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fetch = (payload: {
    page: number;
    keyword: string;
    pageSize: number;
    dateRange: string[];
  }) => {
    fetchFeedbacks(payload).then((response) => {
      setFeedbacks(response.feedbacks);
      setTotalCount(response.totalCount);
    });
  };

  useEffect(() => {
    fetch({
      page,
      keyword,
      pageSize,
      dateRange,
    });
  }, [page, keyword, pageSize, dateRange]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleKeywordChange = (e: any) => {
    const keyword = e.currentTarget.value;
    setKeyword(keyword);
  };

  const handleDateRangeChange = (_: any, dateRange: any) => {
    setDateRange(dateRange);
  };

  return (
    <Styled.Layout>
      <Typography.Title className="title">Feedbacks</Typography.Title>
      <Card style={{ borderRadius: "18px", borderColor: "var(--color-border-primary)" }}>
        <Flex justify="space-between" gap="middle" wrap flex={5}>
          <Flex flex={3}>
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
        <Divider />
        <List
          dataSource={feedbacks}
          renderItem={(feedback) => (
            <List.Item key={feedback.id}>
              <Card style={{ width: "100%" }} bordered={false}>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <Space
                    align="center"
                    style={{ justifyContent: "space-between", width: "100%" }}
                  >
                    <Space align="center">
                      {feedback.user ? (
                        <Avatar style={{ background: feedback?.user.avatarBg }}>
                          {feedback?.user?.username[0]?.toUpperCase()}
                        </Avatar>
                      ) : (
                        <Avatar icon={<UserOutlined />} />
                      )}

                      <Flex align="center">
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {feedback.user ? feedback?.user?.username : "------"}
                        </Typography.Title>
                        <Divider type="vertical" />
                        <Typography.Text type="secondary">
                          {new Date(feedback.createdAt).toLocaleString()}
                        </Typography.Text>
                      </Flex>
                    </Space>
                    <Rate allowHalf disabled defaultValue={feedback.rating} />
                  </Space>
                  <Typography.Paragraph>
                    {feedback.comment}
                  </Typography.Paragraph>
                  {feedback.image && (
                    <Text
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(baseApiUrl + feedback.image!)
                      }
                    >
                      Image provided
                    </Text>
                  )}
                </Space>
              </Card>
            </List.Item>
          )}
          itemLayout="vertical"
          split={false}
        />
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
      </Card>
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
    </Styled.Layout>
  );
};

export default FeedbackMechanism;
