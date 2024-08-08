import { useEffect, useState, useCallback } from "react";
import { useGetTransactionsListQuery } from "@/app/slice";
import dayjs from "dayjs";
import { DefaultOptionType } from 'antd/lib/select';

// Assuming the structure of your transaction list items and defining an interface for it
interface Transaction {
  originalAmount: number;
  amount: number;
  feesAmount: number;
  status: string;
  createdAt: string;
  receiverAddress: string;
  senderAddress: string;
}

interface ListData {
  data?: Transaction[];
  total?: number;
}

// Define the type for the transactions query parameters
interface TransactionsListQuery {
  transactionType: string;
  status: string;
  page: number;
  from: string;
  to: string;
}

export function useTransactionsList() {
  const oneMonthBackDate = dayjs().subtract(1, "month");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactionsList, setTransactionsList] = useState<ListData>({});
  const [transactionType, setTransactionType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [from, setFrom] = useState<string>(oneMonthBackDate.format("YYYY-MM-DD"));
  const [to, setTo] = useState<string>(dayjs().format("YYYY-MM-DD"));

  const pageSize = 15;
  const currentData = transactionsList?.data;

  const transactionsListQuery: TransactionsListQuery = {
    transactionType: transactionType,
    status: status,
    page: currentPage,
    from: from,
    to: to,
  };
  const {
    data: listData,
    isLoading: isTransactionsListLoading,
    refetch,
    isError,
    isFetching,
    isSuccess,
  } = useGetTransactionsListQuery(transactionsListQuery);

  const range = (start: number, end: number): number[] => {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // const handleTransactionTypeChange = useCallback(
  //   (value: string) => {
  //     setTransactionType(value);
  //     refetch();
  //   },
  //   [refetch]
  // );

  const handleTransactionTypeChange = useCallback(
    // Adjust the function signature to accept a second parameter and to handle `unknown` type for the value
    (value: unknown, option: DefaultOptionType | DefaultOptionType[]) => {
      // Since you expect the value to be a string, you can assert the type to string.
      // However, be cautious with type assertions and ensure that the value can indeed be treated as a string.
      const transactionType = value as string;
      setTransactionType(transactionType);
      refetch();
    },
    [setTransactionType, refetch]
  );

  const handleStatusChange = useCallback(
    // Adjust the function signature to accept the expected parameters
    (value: unknown, option: DefaultOptionType | DefaultOptionType[]) => {
      // Assuming the value will always be a string, assert the type to string
      const statusValue = value as string;
      setStatus(statusValue);
      refetch();
    },
    [setStatus, refetch] // Ensure all used state setters and functions are included in the dependencies array
  );

  // const handleStatusChange = useCallback(
  //   (value: string) => {
  //     setStatus(value);
  //     refetch();
  //   },
  //   [refetch]
  // );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      refetch();
    },
    [refetch]
  );

  const handleStartDateChange = (date: string | null) => {
    if (date === null) {
      setFrom(oneMonthBackDate.format("YYYY-MM-DD"));
    } else {
      setFrom(dayjs(date).format("YYYY-MM-DD"));
    }
  };

  const handleEndDateChange = (date: string | null) => {
    if (date === null) {
      setTo(dayjs().format("YYYY-MM-DD"));
    } else {
      setTo(dayjs(date).format("YYYY-MM-DD"));
    }
  };

  const disabledDate = (current: dayjs.Dayjs): boolean => {
    return current.isBefore(dayjs().subtract(1, "month").endOf("day"));
  };
  const disabledDateTime = () => ({
    disabledHours: (): number[] => range(0, 24).splice(4, 20),
    disabledMinutes: (): number[] => range(30, 60),
    disabledSeconds: (): number[] => [55, 56],
  });

  useEffect(() => {
    if (isFetching || isTransactionsListLoading) {
      setIsLoading(true);
      return;
    }

    if (isError) {
      setIsLoading(false);
      return;
    }

    if (isSuccess) {
      setIsLoading(false);
      setTransactionsList(listData || {});
    }
  }, [
    isFetching,
    isTransactionsListLoading,
    isError,
    isSuccess,
    transactionsList,
    listData,
  ]);

  useEffect(() => {
    refetch();
  }, [refetch, from, to]);

  const handleDateFormatter = (date: string): string => {
    const dateObject = new Date(date);
    const utcOffsetMilliseconds = dateObject.getTimezoneOffset() * 60 * 1000;
    const adjustedDateObject = new Date(
      dateObject.getTime() + utcOffsetMilliseconds
    );
    const formatedDate = adjustedDateObject.toISOString().split("T")[0];
    return formatedDate;
  };

  const columns = [
    {
      title: "Original Amount",
      dataIndex: "originalAmount",
      sorter: (a: Transaction, b: Transaction) => a.originalAmount - b.amount,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a: Transaction, b: Transaction) => a.amount - b.amount,
    },
    {
      title: "Amount Fee",
      dataIndex: "feesAmount",
      sorter: (a: Transaction, b: Transaction) => a.feesAmount - b.feesAmount,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: string) => handleDateFormatter(date),
      sorter: (a: Transaction, b: Transaction) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Receiver Address",
      dataIndex: "receiverAddress",
      sorter: (a: Transaction, b: Transaction) => a.receiverAddress.localeCompare(b.receiverAddress),
    },
    {
      title: "Sender Address",
      dataIndex: "senderAddress",
      sorter: (a: Transaction, b: Transaction) => a.senderAddress.localeCompare(b.senderAddress),
    },
  ];

  return {
    isLoading,
    isFetching,
    transactionsList,
    currentData,
    columns,
    pageSize,
    currentPage,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    handlePageChange,
    handleTransactionTypeChange,
    handleStatusChange,
    handleStartDateChange,
    handleEndDateChange,
    disabledDate,
    disabledDateTime,
  };
}