import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// antd
import { Layout, Skeleton, Empty, message } from "antd";

// styled components
import * as Styled from "./Notifications.styled";

// redux
import { api } from "@/app/slice";
import { selectNotifications } from "@/app/selectors";
import {
  setNotifications,
  resetNotifications,
  setNotificationsReadStatus,
} from "@/app/slices/notificationsSlice";
import {
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
  useGetUnreadNotificationsCountQuery,
} from "@/app/slice";

// components
import PageTitle from "../PageTitle";
import { NotificationCard } from "../NotificationCard";

const { Content } = Layout;

export const Notifications = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const notifications = useSelector(selectNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: notificationsList,
    error,
    isError,
    isSuccess,
    isLoading: isNotificationsLoading,
    isFetching,
    refetch,
  } = useGetNotificationsQuery({ page: currentPage });
  useEffect(() => {
    if (isFetching || isNotificationsLoading) {
      setIsLoading(true);
      return;
    }

    if (isError) {
      setIsLoading(false);
      return;
    }

    if (isSuccess) {
      setIsLoading(false);
      if (notificationsList) {
        dispatch(setNotifications(notificationsList));
      }
    }
  }, [
    isFetching,
    isError,
    isSuccess,
    error,
    isNotificationsLoading,
    notificationsList?.data,
    dispatch,
    notificationsList,
  ]);

  const {
    data: unreadNotifications,
    isError: isUnreadError,
    isFetching: isUnreadFetching,
    isLoading: isUnreadLoading,
    isSuccess: isUnreadSuccess,
    refetch: refetchTotal,
  } = useGetUnreadNotificationsCountQuery(null);

  useEffect(() => {
    if (isUnreadFetching || isUnreadLoading) {
      return;
    }
    if (isUnreadError) {
      return;
    }

    if (isUnreadSuccess) {
      setCounter(unreadNotifications?.total || 0);
    }
  }, [
    isUnreadError,
    isUnreadFetching,
    isUnreadLoading,
    isUnreadSuccess,
    unreadNotifications,
  ]);

  useEffect(() => {
    if (location.pathname === "/notifications") {
      setCurrentPage(1);
      dispatch(api.util.invalidateTags(["getNotifications"]));
      dispatch(resetNotifications());
    }
  }, [dispatch, location.pathname]);

  const [putData] = useUpdateNotificationMutation();
  useEffect(() => {
    refetch();
    refetchTotal();
  }, []);

  const handlePutData = useCallback(async () => {
    try {
      const result = await putData({
        data: { isRead: true },
      });
      if ("data" in result && result.data.success) {
        refetchTotal();
        dispatch(setNotificationsReadStatus());
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch, putData, refetchTotal]);

  return (
    <>
      <PageTitle title="Notifications" />
      {counter > 0 && (
        <>
          <Styled.Counter>{`(New ${counter})`}</Styled.Counter>
          <Styled.ctaButton onClick={handlePutData}>
            Mark All Read
          </Styled.ctaButton>
          <Styled.ctaButton >
            Delete All
          </Styled.ctaButton>
        </>
      )}
      <Content className="notification-content">
        <div>
          {(isLoading || isFetching) && (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          )}
          {notifications?.data &&
            notifications?.data?.map((notification) => (
              <NotificationCard
                cardItem={notification}
                key={notification._id}
                variant="notification"
              />
            ))}
          {notifications?.length === 0 && (
            <div>
              <Empty description={"No notifications found"} />
            </div>
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
