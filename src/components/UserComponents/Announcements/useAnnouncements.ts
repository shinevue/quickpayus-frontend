import { api } from "@/app/slice";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetAnnouncementsQuery } from "@/app/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectAnnouncements } from "@/app/selectors";
import {
  setAnnouncements,
  resetAnnouncements,
} from "@/app/slices/announcementsSlice";

export function useAnnouncements() {
  // const [announcements, setAnnouncements] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const announcements = useSelector(selectAnnouncements);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    data: announcementsList,
    error,
    isError,
    isSuccess,
    isLoading: isAnnouncementsLoading,
    isFetching,
    refetch,
  } = useGetAnnouncementsQuery({ page: currentPage });

  useEffect(() => {
    if (isFetching || isAnnouncementsLoading) {
      setIsLoading(true);
      return;
    }

    if (isError) {
      setIsLoading(false);
      return;
    }

    if (isSuccess) {
      setIsLoading(false);
      if (announcementsList) {
        dispatch(setAnnouncements(announcementsList));
      }
    }
  }, [
    isFetching,
    isError,
    isSuccess,
    error,
    isAnnouncementsLoading,
    announcementsList,
    dispatch,
  ]);

  useEffect(() => {
    if (location.pathname === "/announcements") {
      setCurrentPage(1);
      dispatch(api.util.invalidateTags(["getAnnouncements"]));
      dispatch(resetAnnouncements());
    }
  }, [dispatch, location.pathname]);

  return {
    announcements,
    isLoading,
    refetch,
    currentPage,
    setCurrentPage,
    isFetching
  };
}
