import React, { useEffect, useState } from "react";

import * as Styled2 from "./ReferralProgram.styled";
import * as Styled from "@/components/AdminComponents/Style/UserDetails.styled";
import {
  Table,
  TablePaginationConfig,
  DatePicker,
  Select,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchUserAsync } from "@/app/actions/userAction";
import {
  selectStatusUsersSlice,
  selectTotalUsers,
  selectUsers,
} from "@/app/slices/userSlice";
import { ColumnType } from "antd/lib/table";

interface ReferralReport {
  id: number;
  username: string;
  referredBy: string;
  credit: number;
  directCount: number;
  indirectCount: number;
}

const ReferralReports: React.FC = () => {
  const [data, setData] = useState<ReferralReport[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const usersState = useSelector(selectUsers);
  const loading = useSelector(selectStatusUsersSlice);
  const total = useSelector(selectTotalUsers);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCriteria, setSearchCriteria] = useState<string>("name");
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);

  useEffect(() => {
    const query = {
      search: searchTerm,
      criteria: searchCriteria,
      startDate: dateRange[0],
      endDate: dateRange[1],
      page,
      pageSize,
    };
    dispatch(fetchUserAsync(query));
  }, [searchTerm, searchCriteria, dateRange, page, pageSize]);

  useEffect(() => {
    setData(
      usersState.map((userState: any) => {
        return {
          id: userState._id,
          username: userState.username,
          credit: userState.referralCreditBalance,
          directCount: userState.directCount,
          indirectCount: userState.indirectCount,
          referredBy: userState.referredBy || "No referrer",
        };
      })
    );
  }, [usersState]);

  const paginationProps: TablePaginationConfig = {
    position: ["bottomRight"],
    total: total,
    showSizeChanger: false,
    current: page,
    pageSize: pageSize,
    onChange(page: number, pageSize: number) {
      setPage(page);
      setPageSize(pageSize);
    },
  };

  const userDataColumns: ColumnType<ReferralReport>[] = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: (a: ReferralReport, b: ReferralReport) => {
        return a.username.localeCompare(b.username);
      },
    },
    {
      title: "Recommender",
      dataIndex: "referredBy",
      key: "referredBy",
      sorter: (a: ReferralReport, b: ReferralReport) => {
        return a.referredBy.localeCompare(b.referredBy);
      },
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      sorter: (a: ReferralReport, b: ReferralReport) => {
        return a.credit - b.credit;
      },
    },
    {
      title: "Direct Referral Count",
      dataIndex: "directCount",
      key: "directCount",
      sorter: (a: ReferralReport, b: ReferralReport) => {
        return a.directCount - b.directCount;
      },
    },
    {
      title: "Indirect Referral Count",
      dataIndex: "indirectCount",
      key: "indirectCount",
      sorter: (a: ReferralReport, b: ReferralReport) => {
        return a.indirectCount - b.indirectCount;
      },
    },
  ];

  return (
    <Styled.Layout>
      <Styled2.Container style={{ marginTop: "40px" }}>
        <Styled.Header>User Referral Details</Styled.Header>

        <Styled.SearchWrapper>
          <Styled.StyledSelect
            style={{ width: "150px" }}
            value={searchCriteria}
            onChange={(value: any) => setSearchCriteria(value)}
            defaultValue="name" // set default value
          >
            {["name", "username", "email"].map((field) => (
              <Select.Option key={field} value={field}>
                {field}
              </Select.Option>
            ))}
          </Styled.StyledSelect>
          <Styled.SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DatePicker.RangePicker
            placeholder={["from", "to"]}
            placement="topLeft"
            onChange={(_: any, dateStrings: [string, string]) => {
              setDateRange(dateStrings);
            }}
          />
        </Styled.SearchWrapper>
        <Divider />
        <Table
          rowKey="id"
          columns={userDataColumns}
          dataSource={data}
          pagination={paginationProps}
        />
      </Styled2.Container>
    </Styled.Layout>
  );
};

export default ReferralReports;
