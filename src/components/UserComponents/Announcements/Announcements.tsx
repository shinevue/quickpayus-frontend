import React, { useCallback } from "react";
import { Layout, Skeleton, Empty } from "antd";
import { NotificationCard } from "../NotificationCard";

// components
import PageTitle from "../PageTitle";

// styled components
import * as Styled from "./Announcements.styled";
import { useAnnouncements } from "./useAnnouncements";
import { useDispatch } from "react-redux";
import { API } from "@/utils/api";
import {
  readOne,
  deleteOne,
} from "@/app/slices/announcementsSlice";

const { Content } = Layout;

export const Announcements: React.FC = () => {
  const { announcements, isLoading, isFetching, currentPage, setCurrentPage } =
    useAnnouncements();

  const dispatch = useDispatch();


  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/announcements/${id}`);
      if (response.data.success) {
        dispatch(deleteOne(id));
      }
    } catch (error) {}
  };

  const handleRead = async (id) => {
    try {
      const response = await API.put(`/announcements/${id}`);
      if (response.data.success) {
        dispatch(readOne(id));
      }
    } catch (error) {}
  };

  return (
    <>
      <PageTitle title="Announcements" />
      <Content className="announcement-content">
        {(isLoading || isFetching) && (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        )}
        {announcements &&
          announcements?.data.map((announcement) => (
            <NotificationCard
              cardItem={announcement}
              key={announcement._id}
              variant="announcements"
              onRead={handleRead}
              onDelete={handleDelete}
            />
          ))}
        {announcements?.data.length === 0 && (
          <Empty
            description={"No notifications found"}
            style={{
              backgroundColor: "var(--color-bg-container)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "100px",
            }}
          />
        )}
        <Styled.LoadMoreButtonContainer>
          {announcements?.totalPages > currentPage && (
            <Styled.LoadMoreButton
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
            >
              Load More
            </Styled.LoadMoreButton>
          )}
          {announcements?.totalPages === currentPage && currentPage !== 1 && (
            <Styled.NoMoreData>No more announcements to load</Styled.NoMoreData>
          )}
        </Styled.LoadMoreButtonContainer>
      </Content>
    </>
  );
};
