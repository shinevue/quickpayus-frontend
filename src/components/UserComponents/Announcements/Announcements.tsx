import React from "react";
import { Layout, Skeleton, Empty } from "antd";
import { NotificationCard } from "../NotificationCard";

// components
import PageTitle from "../PageTitle";

// styled components
import * as Styled from "./Announcements.styled";
import { useAnnouncements } from "./useAnnouncements";

const { Content } = Layout;

export const Announcements: React.FC = () => {

  const { announcements, isLoading, isFetching, currentPage, setCurrentPage } =
    useAnnouncements();

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
          announcements?.data
            .map((announcement) => (
              <NotificationCard
                cardItem={announcement}
                key={announcement._id}
                variant="announcements"
              />
            ))}
        {announcements?.data.length === 0 && (
          <Empty
            description={"No notifications found"}
            style={{
              backgroundColor: "#fff",
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
