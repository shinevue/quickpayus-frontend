import React, { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import { TransactionType } from "@/types/TransactionType";
import * as Styled from "@/components/AdminComponents/Style/Transactions.styled";
import {
  fetchTransactionAsync,
  updateTransactionAsync,
} from "@/app/actions/transactionAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { selectTranctions } from "@/app/slices/transactionSlice";
import { STATUS, TRANSACTION_TYPES } from "@/constants";
import { TablePaginationConfig } from "antd/lib";
import { selectTransactionsCount } from "@/app/selectors";
import { RejectReasonModal } from "./RejectReasonModal";

const TransctionManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]); // Empty array since transactions are managed internally in TransactionTable component
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [rejectModalVisible, setRejectModalVisible] = useState<boolean>(false);
  const [rejectTransactionId, setRejectTransactionId] = useState<string>("");
  const [page, setPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();

  const transactionState = useSelector(selectTranctions);
  const totalCount = useSelector(selectTransactionsCount);

  useEffect(() => {
    dispatch(
      fetchTransactionAsync({ type: filterType, status: filterStatus, page })
    );
  }, [filterType, filterStatus]);

  useEffect(() => {
    setTransactions(transactionState);
  }, [transactionState]);

  // Define empty functions for handleApprove and handleReject
  const handleApproveClick = (id: string) => {
    dispatch(updateTransactionAsync({ id, status: STATUS.APPROVED }));
  };

  const handleRejectClick = (id: string) => {
    setRejectModalVisible(true);
    setRejectTransactionId(id);
  };

  const handleReject = (reason: string) => {
    dispatch(
      updateTransactionAsync({
        id: rejectTransactionId,
        status: STATUS.REJECTED,
        reason,
      })
    );
  };

  const paginationProps: TablePaginationConfig = {
    position: ["bottomRight"],
    total: totalCount,
    showSizeChanger: false,
    current: page,
    pageSize: 15,
    onChange(page) {
      setPage(page);
      dispatch(
        fetchTransactionAsync({ type: filterType, status: filterStatus, page })
      );
    },
  };

  return (
    <>
      <Styled.Header>Transaction Management</Styled.Header>
      <Styled.Container>
        <div>
          <Styled.StyledLabel htmlFor="typeFilter">
            Filter by Type:
          </Styled.StyledLabel>
          <Styled.StyledSelect
            id="typeFilter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value={TRANSACTION_TYPES.WITHDRAWAL}>Withdrawal</option>
            <option value={TRANSACTION_TYPES.DEPOSIT}>Deposit</option>
            <option value={TRANSACTION_TYPES.PROFIT}>Profit</option>
            <option value={TRANSACTION_TYPES.REFERRAL_CREDIT}>
              Referral Credit
            </option>
          </Styled.StyledSelect>
        </div>
        <div>
          <Styled.StyledLabel htmlFor="statusFilter">
            Filter by Status:
          </Styled.StyledLabel>
          <Styled.StyledSelect
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value={STATUS.PENDING}>Pending</option>
            <option value={STATUS.APPROVED}>Approved</option>
            <option value={STATUS.REJECTED}>Rejected</option>
          </Styled.StyledSelect>
        </div>
      </Styled.Container>
      {/* Pass dummyTransactions as props to the TransactionTable component */}
      <TransactionTable
        transactions={transactions}
        paginationProps={paginationProps}
        handleApprove={handleApproveClick}
        handleReject={handleRejectClick}
      />
      <RejectReasonModal
        visible={rejectModalVisible}
        setVisible={(visible) => setRejectModalVisible(visible)}
        handleSubmit={handleReject}
      />
    </>
  );
};

export default TransctionManagement;
