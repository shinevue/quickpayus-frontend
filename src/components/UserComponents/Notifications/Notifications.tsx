import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// antd
import { Layout, Skeleton, Empty, theme } from "antd";

// styled components
import * as Styled from "./Notifications.styled";

// redux
import { api } from "@/app/slice";
import {
  selectNotifications,
  selectUnreadNotificationCount,
} from "@/app/selectors";
import {
  setNotifications,
  resetNotifications,
  setNotificationsReadStatus,
  readOne,
  deleteOne,
} from "@/app/slices/notificationsSlice";
import { useUpdateNotificationMutation } from "@/app/slice";

// components
import PageTitle from "../PageTitle";
import { NotificationCard } from "../NotificationCard";
import { API } from "@/utils/api";
import useThemeMode from "@/utils/Hooks/useThemeMode";

const { Content } = Layout;

export const Notifications = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const notifications = useSelector(selectNotifications);
  const counter = useSelector(selectUnreadNotificationCount);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === "/notifications") {
      setCurrentPage(1);
      dispatch(api.util.invalidateTags(["getNotifications"]));
      dispatch(resetNotifications());
    }
  }, [dispatch, location.pathname]);

  const [putData] = useUpdateNotificationMutation();

  const handlePutData = useCallback(async () => {
    notifications?.data?.map((notification) => {
      handleRead(notification._id)
    })
  }, [dispatch, putData]);

  const handleDeleteData = useCallback(async () => {
    try {
      const result = await API.delete("/notifications/");
      if ("data" in result && result?.data.success) {
        dispatch(setNotifications({ data: [] }));
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch, putData]);

  const handleRead = async (id) => {
    try {
      const response = await API.put(`/notifications/${id}`);
      if (response.data.success) {
        dispatch(readOne(id));
      }
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/notifications/${id}`);
      if (response.data.success) {
        dispatch(deleteOne(id));
      }
    } catch (error) {}
  };

  const { themeMode } = useThemeMode();
  return (
    <>
      <PageTitle title="Notifications" />
      {counter > 0 && (
        <>
          <Styled.Counter>{`(New ${counter})`}</Styled.Counter>
          <Styled.ctaButton onClick={handlePutData}>
            Mark All Read
          </Styled.ctaButton>
          <Styled.ctaButton onClick={handleDeleteData}>
            Delete All
          </Styled.ctaButton>
        </>
      )}
      <Content className="notification-content">
        <div>
          {/* {(isLoading || isFetching) && (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          )} */}
          {notifications?.data &&
            notifications?.data?.map((notification) => (
              <NotificationCard
                cardItem={notification}
                key={notification._id}
                variant="notification"
                onRead={handleRead}
                onDelete={handleDelete}
              />
            ))}
          {notifications?.data?.length === 0 && (
            <Empty
              description={"No notifications found"}
              style={{
                backgroundColor: "var(--color-bg-container)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "100px",
                color: themeMode === "dark" ? "#fff" : "#000",
              }}
            />
          )}
        </div>
        <Styled.LoadMoreButtonContainer>
          {notifications?.totalPages > currentPage && (
            <Styled.LoadMoreButton
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
            >
              Load More
            </Styled.LoadMoreButton>
          )}
          {notifications?.totalPages === currentPage && currentPage !== 1 && (
            <Styled.NoMoreData>No more notifications to load</Styled.NoMoreData>
          )}
        </Styled.LoadMoreButtonContainer>
      </Content>
    </>
  );
};
