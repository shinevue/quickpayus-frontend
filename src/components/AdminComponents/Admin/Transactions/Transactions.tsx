import React, { useEffect, useState } from "react";
import { fetchTransactionAsync } from "@/app/actions/transactionAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { Dropdown, Button, MenuProps } from "antd";
import TransctionHistory from "./TransctionHistory";
import TransctionManagement from "./TransctionManagement";

import * as Styled from "@/components/AdminComponents/Style/Transactions.styled";

const PageName = ["Transaction History", "Transaction Management"];
const TransactionPage: React.FC = () => {
  const [pageState, setPageState] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => setPageState(0)}>Transaction History</a>,
    },
    {
      key: "2",
      label: <a onClick={() => setPageState(1)}>Transaction Management</a>,
    },
  ];
  useEffect(() => {
    dispatch(fetchTransactionAsync({ type: "", status: "", page: 1 }));
  }, []);

  return (
    <Styled.Layout>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button>{PageName[pageState]} </Button>
      </Dropdown>
      {pageState === 0 ? <TransctionHistory /> : <TransctionManagement />}
    </Styled.Layout>
  );
};

export default TransactionPage;
