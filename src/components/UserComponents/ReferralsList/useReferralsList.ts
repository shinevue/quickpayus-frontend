import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetReferralsListQuery } from "@/app/slice";
import { REFERRAL_TYPE } from "./constants";

interface Referal {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  username: string;
}

export function useReferralsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState(REFERRAL_TYPE.DIRECT);
  const [level, setLevel] = useState(2);
  const [referralsList, setReferralsList] = useState<Referal[]>([]);
  const levels = Array.from({ length: 9 }, (_, index) => index + 2);

  const directLevel = 1;
  const referralQuery = {
    type: type,
    level: type === REFERRAL_TYPE.DIRECT ? directLevel : level,
    page: currentPage,
  };
  const {
    data: referrals,
    isLoading: isReferralsListLoading,
    refetch,
    isError,
    error,
    isFetching,
    isSuccess,
  } = useGetReferralsListQuery(referralQuery);

  const pageSize = 5;

  const newReferralList = referralsList?.map((obj) => ({
    ...obj,
    fullName: `${obj.firstName} ${obj.lastName}`,
  }));

  const currentData = newReferralList;

  const handleTypeChange = (value) => {
    setType(value);
    refetch();
  };

  const handleLevelChange = (value) => {
    setLevel(value);
    refetch();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const handleSearch = (value) => {
    if (!value) return setReferralsList(referrals.data);
    const filteredData = newReferralList.filter(
      (referral) =>
        referral.fullName.toLowerCase().includes(value.toLowerCase()) ||
        referral.username.toLowerCase().includes(value.toLowerCase())
    );
    setReferralsList(filteredData);
  };

  useEffect(() => {
    if (isFetching || isReferralsListLoading) {
      setIsLoading(true);
      return;
    }

    if (isError) {
      setIsLoading(false);
      return;
    }

    if (isSuccess) {
      setIsLoading(false);
      setReferralsList(referrals?.data || []);
    }
  }, [
    isFetching,
    isReferralsListLoading,
    isError,
    isSuccess,
    referrals,
    error,
  ]);

  useEffect(() => {
    refetch();
  }, [refetch, type, level, currentPage]);

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Investment Level",
      dataIndex: "investmentLevel",
      key: "investment",
      render: (investmentLevel) => investmentLevel || "N/A",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "joiningDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  ];

  return {
    columns,
    currentData,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    handleSearch,
    handleTypeChange,
    handleLevelChange,
    handlePageChange,
    directLevel,
    levels,
    currentPage,
    pageSize,
    referrals,
    type,
  };
}
