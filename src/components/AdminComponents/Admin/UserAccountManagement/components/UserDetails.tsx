import React, { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { DatePicker, Select, TablePaginationConfig, Typography } from "antd";
import UserDetailsTable from "./UserDetailsTable";
import moment from "moment";

import {
  activeGuest,
  delGuest,
  editGuest,
  getAllGuests,
  suspendGuest,
} from "../AdminUsersApi";
import { User } from "@/types/UserType";

import * as Styled from "../../../Style/UserDetails.styled";
import UserEditModal from "./UserEditModal";
import UserViewModal from "./UserViewModal";
import { useSelector } from "react-redux";
import { selectTotalUsers } from "@/app/slices/userSlice";

const { Title } = Typography;

const { Option } = Select;

const UserDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCriteria, setSearchCriteria] = useState<string>("name");
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);

  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<User>({
    id: 0,
    name: "string",
    username: "",
    email: "",
    isActive: false,
    status: "",
    verificationDate: "",
    accountBalance: 0,
    equityBalance: 0,
    depositBalance: 0,
    rewardBalance: 0,
    creditBalance: 0,
    profitBalance: 0,
  });
  const total = useSelector(selectTotalUsers);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

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

  useEffect(() => {
    (async () => {
      const query = {
        type: "Active",
        kycStatus: "",
        search: searchTerm,
        criteria: searchCriteria,
        startDate: dateRange[0],
        endDate: dateRange[1],
        page,
        pageSize,
      };
      const users = await getAllGuests(query);

      const sorted = [
        ...users.data.map((user: any) => {
          const {
            _id,
            firstName,
            lastName,
            username,
            email,
            depositBalance,
            rewardBalance,
            referralCreditBalance,
            profitBalance,
            kyc,
            isActive,
          } = user;

          return {
            id: _id,
            username,
            email,
            accountBalance: depositBalance + profitBalance,
            equityBalance: referralCreditBalance + profitBalance,
            depositBalance,
            rewardBalance,
            creditBalance: referralCreditBalance,
            profitBalance,
            isActive,
            status: kyc?.status,
            verificationDate: kyc?.updatedAt
              ? moment(kyc?.updatedAt).format("YYYY-MM-DD HH:mm")
              : "N/A",
            name: `${firstName} ${lastName}`,
          };
        }),
      ];

      setSortedUsers(sorted);
    })();
  }, [dateRange, searchTerm, searchCriteria, page, pageSize]);

  const handleExportCSV = () => {
    const csvData = [
      [
        "Id",
        "Name",
        "Username",
        "Email",
        "Status",
        "VerificationDate",
        "AccountBalance",
        "EquityBalance",
        "DepositBalance",
        "RewardBalance",
        "CreditBalance",
        "ProfitBalance",
      ],
      ...sortedUsers.map((user: User) => [
        user.id,
        user.name,
        user.username,
        user.email,
        user.status,
        user.verificationDate,
        user.accountBalance,
        user.equityBalance,
        user.depositBalance,
        user.rewardBalance,
        user.creditBalance,
        user.profitBalance,
      ]),
    ];

    const csvString = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDeleteUser = (userId: number) => {
    delGuest(userId);
    setSortedUsers(sortedUsers.filter((user) => user.id !== userId));
  };

  const handleSuspendUser = (userId: number) => {
    suspendGuest(userId);
    const current = sortedUsers.find((user) => user.id === userId);
    if (current) {
      setSortedUsers(
        sortedUsers.map((user) => {
          if (user.id === userId) return { ...current, isActive: false };
          return user;
        })
      );
    }
  };

  const handleActiveUser = (userId: number) => {
    activeGuest(userId);
    const current = sortedUsers.find((user) => user.id === userId);
    if (current) {
      setSortedUsers(
        sortedUsers.map((user) => {
          if (user.id === userId) return { ...current, isActive: true };
          return user;
        })
      );
    }
  };

  const handleEditUser = (userId: number) => {
    setEditModalVisible(true);
    const current = sortedUsers.find((user) => user.id === userId);

    if (current) {
      setUpdateInfo(current);
    }
  };

  const handleViewUser = (userId: number) => {
    setViewModalVisible(true);
    const current = sortedUsers.find((user) => user.id === userId);
    if (current) setUpdateInfo({ ...current });
  };

  const handleConfirmEdit = (values: any) => {
    const newInfo = {
      ...updateInfo,
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      username: values.username,
    };

    editGuest(updateInfo.id, newInfo);

    setSortedUsers(
      sortedUsers.map((user) => {
        if (user.id === updateInfo.id) return newInfo;
        else return user;
      })
    );
    setEditModalVisible(false);
  };

  return (
    <Styled.Layout>
      <Styled.Card>
        <Styled.Header>Users</Styled.Header>
        <Styled.Container>
          <Styled.SearchWrapper>
            <Styled.StyledSelect
              style={{ width: "150px" }}
              value={searchCriteria}
              onChange={(value: any) => setSearchCriteria(value)}
              defaultValue="name" // set default value
            >
              {["name", "username", "email"].map((field) => (
                <Option key={field} value={field}>
                  {field}
                </Option>
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
          <Styled.FilterWrapper></Styled.FilterWrapper>

          <Styled.StyledButton type="primary" onClick={handleExportCSV}>
            Export CSV <DownloadOutlined />
          </Styled.StyledButton>
        </Styled.Container>

        <Styled.TableWrapper>
          <UserDetailsTable
            users={sortedUsers} // Pass the sorted array of user objects
            paginationProps={paginationProps}
            handleViewUser={handleViewUser} // Pass the callback function for viewing a user
            handleEditUser={handleEditUser} // Pass the callback function for editing a user
            handleSuspendUser={handleSuspendUser} // Pass the callback function for suspending a user
            handleActiveUser={handleActiveUser} // Pass the callback function for activating a user
            handleDeleteUser={handleDeleteUser} // Pass the callback function for deleting a user
          />
        </Styled.TableWrapper>
      </Styled.Card>

      <UserEditModal
        visible={editModalVisible}
        userInfo={updateInfo}
        setVisible={setEditModalVisible}
        handleOk={handleConfirmEdit}
      />

      <UserViewModal
        userInfo={updateInfo}
        visible={viewModalVisible}
        setVisible={setViewModalVisible}
      />
    </Styled.Layout>
  );
};

export default UserDetails;
