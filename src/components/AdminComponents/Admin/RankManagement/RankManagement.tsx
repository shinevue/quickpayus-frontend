import React, { useEffect, useState, useCallback } from "react";
import RankTable from "./RankTable";
import * as Styled from "@/components/AdminComponents/Style/Ranks";
import { fetchRankAsync, updateRankAsync } from "@/app/actions/rankAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { selectRanks } from "@/app/slices/rankSlice";
import { selectRanksCount } from "@/app/selectors";
import { STATUS } from "@/constants";
import { TablePaginationConfig } from "antd/lib";
import { RejectReasonModal } from "./RejectReasonModal";
import { Button, Input, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { RankType } from "@/types/RankType";

const RankPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [rejectModalVisible, setRejectModalVisible] = useState<boolean>(false);
  const [rejectRankId, setRejectRankId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [criteria, setCriteria] = useState<string>("user");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const rankState = useSelector(selectRanks);
  const totalCount = useSelector(selectRanksCount);

  useEffect(() => {
    dispatch(
      fetchRankAsync({ status: filterStatus, criteria, searchQuery, page })
    );
  }, [filterStatus, searchQuery, page, criteria, dispatch]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleCriteriaChange = (value: string) => {
    setCriteria(value);
    setSearchQuery("");
  };

  const rewardsData: RankType[] = rankState;

  const exportToCSV = useCallback(() => {
    const csvRows: string[][] = [
      ["User", "Claimed Rewards", "Amount", "Status", "Date"],
      ...rewardsData.map((item) => [
        item.name,
        item.reward.toString(),
        item.sales.toString(),
        item.status,
        item.date,
      ]),
    ];

    const csvData: string = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "claimed_rewards.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [rewardsData]);

  const refreshRanks = useCallback(() => {
    dispatch(
      fetchRankAsync({ status: filterStatus, criteria, searchQuery, page })
    );
  }, [dispatch, filterStatus, page, criteria, searchQuery]);

  const handleApproveClick = async (id: string) => {
    await dispatch(updateRankAsync({ id, status: STATUS.APPROVED }));
    refreshRanks(); // Refresh ranks after update
  };

  const handleRejectClick = (id: string) => {
    setRejectModalVisible(true);
    setRejectRankId(id);
  };

  const handleReject = async (reason: string) => {
    await dispatch(
      updateRankAsync({ id: rejectRankId, status: STATUS.REJECTED, reason })
    );
    setRejectModalVisible(false); // Close the modal after rejection
    refreshRanks(); // Refresh ranks after update
  };

  const paginationProps: TablePaginationConfig = {
    position: ["bottomRight"],
    total: totalCount,
    showSizeChanger: false,
    current: page,
    pageSize: 15,
    onChange: (page) => {
      setPage(page);
      dispatch(
        fetchRankAsync({ status: filterStatus, criteria, searchQuery, page })
      );
    },
  };

  return (
    <Styled.Layout>
      <Styled.Header>Rank Settings</Styled.Header>
      <Styled.Container>
        <Styled.StyledRow>
          <Select
            value={criteria}
            onChange={(value) => handleCriteriaChange(value)}
            style={{ width: 160 }}
          >
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="claimedRewards">
              Claimed Rewards
            </Select.Option>
            <Select.Option value="amount">Amount</Select.Option>
            <Select.Option value="date">Date</Select.Option>
          </Select>
          <Input
            placeholder={`Search by ${criteria}...`}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 160 }}
            type={criteria === "date" ? "date" : "text"}
          />
          <Select
            id="statusFilter"
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            style={{ width: 160 }}
          >
            <Select.Option value="">All</Select.Option>
            <Select.Option value={STATUS.PENDING}>Pending</Select.Option>
            <Select.Option value={STATUS.APPROVED}>Approved</Select.Option>
            <Select.Option value={STATUS.REJECTED}>Rejected</Select.Option>
          </Select>
          <div style={{flexGrow: "1"}}></div>
          <Button
            onClick={exportToCSV}
            icon={<DownloadOutlined />}
            type="primary"
            style={{ width: 160 }}
          >
            Export CSV
          </Button>
        </Styled.StyledRow>
      </Styled.Container>
      <RankTable
        ranks={rewardsData}
        paginationProps={paginationProps}
        handleApprove={handleApproveClick}
        handleReject={handleRejectClick}
      />
      <RejectReasonModal
        visible={rejectModalVisible}
        setVisible={setRejectModalVisible}
        handleSubmit={handleReject}
      />
    </Styled.Layout>
  );
};

export default RankPage;
