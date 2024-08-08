import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import UsersTable from "./KycDetailsTable";

import * as Styled from "../../../Style/UserDetails.styled";
import { updateKyc, getAllKycs } from "../KycDetailApi";
import moment from "moment";

const { Option } = Select;
const { Title } = Typography;

export interface User {
  id: string;
  status: string;
  documentationType: string;
  images: string[];
  documents: string[];
  userInfo: {
    username: string;
    address: string;
    dateOfBirth: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    country: string;
  };
  verificationDate: string;
}

const KYCStatusComponent: React.FC = () => {
  // const [filter, setFilter] = useState<string>("all");
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  // const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // const [sortBy, setSortBy] = useState<"id" | "status">("id");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"name" | "dob" | "id">("name");
  const [selectedDateRange, setSelectedDateRange] = useState<
    [string, string] | null
  >(null);
  console.log(selectedDateRange);
  

  useEffect(() => {
    (async () => {
      const { data } = await getAllKycs({
        search: searchTerm,
        startDate: selectedDateRange && selectedDateRange[0],
        endDate: selectedDateRange && selectedDateRange[1],
      });

      setUsers(
        data
          .filter((item) => item.kyc?.status)
          .map((item) => {
            return {
              id: item.id,
              status: item.kyc?.status,
              documentationType: item.kyc?.documentType,
              images: item.kyc?.images.map(item => item.name),
              documents: item.kyc?.documents.map(item => item.name),
              userInfo: {
                username: item.username,
                address: item.kyc?.addressLine,
                dateOfBirth: moment(item.kyc?.dateOfBirth).format(
                  "MMM/DD/yyyy"
                ),
                phoneNumber: item.phoneNumber,
                firstName: item.firstName,
                lastName: item.lastName,
                country: item.kyc.country,
              },
              verificationDate: moment(item.kyc?.updatedAt).format(
                "MMM/DD/yyyy"
              ),
            };
          })
      );
    })();
  }, [searchTerm, selectedDateRange]);

  // Function to handle date range change
  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDateRange(dateStrings);
  };

  // Function to filter users based on selected date range
  const filterUsersByDateRange = () => {
    if (!selectedDateRange || selectedDateRange.length !== 2) {
      console.error("Invalid date range");
      return;
    }

    const [startDate, endDate] = selectedDateRange;

    // Parse the selected date strings into Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Filter users whose verification date falls within the selected date range
    const usersWithinDateRange = users.filter((user) => {
      const verificationDate = new Date(user.verificationDate);
      return (
        verificationDate >= parsedStartDate && verificationDate <= parsedEndDate
      );
    });

    // Log the users within the selected date range
    console.log("Users within selected date range:", usersWithinDateRange);
  };

  // CSV Export Logic
  const exportToCSV = () => {
    if (!users.length) {
      console.log("No users to export");
      return;
    }
    const csvData = [
      [
        "User ID",
        "Status",
        "Documentation Type",
        "User Name",
        "User Address",
        "Date of Birth",
        "Verification Status",
        "Verification Date",
      ],
      ...users.map((user) => [
        user.id,
        user.status,
        user.documentationType,
        user.userInfo.username,
        user.userInfo.address,
        user.userInfo.dateOfBirth,
        user.status === "pending" ? "Pending Approval" : "Approved",
        user.verificationDate,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_kyc_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const approveKYC = async (user: User) => {
    await updateKyc({
      status: "APPROVED",
      reason: "User verify APPROVED.",
      uuid: user.id,
    });
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, status: "APPROVED" };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const rejectKYC = async (user: User) => {
    await updateKyc({
      status: "REJECTED",
      reason: "User verify REJECTED.",
      uuid: user.id,
    });
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, status: "REJECTED" };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  // Cancel KYC
  const cancelKYC = async (user: User) => {
    await updateKyc({
      status: "PENDING",
      reason: "User verify PENDING.",
      uuid: user.id,
    });
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, status: "PENDING" };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  return (
    <Styled.Layout>
      <Styled.Card>
        <Title level={2}>KYC Management</Title>
        <Styled.Container>
          
          <Styled.SearchWrapper>
            <Styled.SearchInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Styled.StyledSelect
              value={searchBy}
              onChange={(value) => setSearchBy(value as "name" | "dob" | "id")}
            >
              <Option value="name">Name</Option>
              <Option value="dob">Date of Birth</Option>
              <Option value="id">ID</Option>
            </Styled.StyledSelect>
          </Styled.SearchWrapper>
          <Styled.FilterWrapper>
            <DatePicker.RangePicker
              onChange={handleDateRangeChange}
              placeholder={["from", "to"]}
            />
            <Button style={{borderRadius: "8px"}} type="primary" onClick={filterUsersByDateRange}>
              Filter
            </Button>
          </Styled.FilterWrapper>
          <div style={{flexGrow: '1'}}></div>
          <Styled.StyledButton type="primary" onClick={exportToCSV}>
            Export CSV <DownloadOutlined />
          </Styled.StyledButton>
        </Styled.Container>
        <Styled.TableWrapper>
          <UsersTable
            users={users}
            approveKYC={approveKYC}
            rejectKYC={rejectKYC}
            cancelKYC={cancelKYC}
          />
        </Styled.TableWrapper>
      </Styled.Card>
    </Styled.Layout>
  );
};

export default KYCStatusComponent;
