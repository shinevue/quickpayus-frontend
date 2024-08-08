// antd
import { Table, Pagination, Select, Skeleton, DatePicker, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// redux
import { useTransactionsList } from "./useTransactionsList";

// constants
import { STATUS, TRANSACTION_TYPE } from "./constants";

// styles
import * as Styled from "./TransactionsList.styled";

const { Option } = Select;

const TransactionsList: React.FC = () => {
  const {
    currentPage,
    pageSize,
    isLoading,
    isFetching,
    disabledDate,
    disabledDateTime,
    currentData,
    handleStartDateChange,
    handleEndDateChange,
    handleTransactionTypeChange,
    handleStatusChange,
    handlePageChange,
    transactionsList,
    columns,
  } = useTransactionsList();
  return (
    <Card>
      <Styled.ListHeader>
        <Styled.Title>Transactions</Styled.Title>
        <Styled.FilterContainer>
          <Styled.StyledSpace size={10}>
            <DatePicker
              onChange={handleStartDateChange}
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              placeholder="From"
              allowClear
              format={"DD-MM-YYYY"}
              style={{ width: "100%" }}
            />
            <DatePicker
              onChange={handleEndDateChange}
              placeholder="To"
              allowClear
              format={"DD-MM-YYYY"}
              style={{ width: "100%" }}
            />
          </Styled.StyledSpace>
          <Styled.StyledSpace size={10}>
            <Styled.SelectOne
              defaultValue={""}
              onChange={handleTransactionTypeChange}
              placeholder="Transaction Type"
            >
              <Option value={""}>All</Option>
              <Option value={TRANSACTION_TYPE.DEPOSIT}>Deposit</Option>
              <Option value={TRANSACTION_TYPE.WITHDRAWAL}>Withdrawal</Option>
              <Option value={TRANSACTION_TYPE.PROFIT}>Profit</Option>
              <Option value={TRANSACTION_TYPE.REFERRAL_CREDIT}>Credit</Option>
              <Option value={TRANSACTION_TYPE.RANK}>Rank</Option>
            </Styled.SelectOne>
            <Styled.SelectTwo
              defaultValue={""}
              onChange={handleStatusChange}
              placeholder="Status"
            >
              <Option value={""}>All</Option>
              <Option value={STATUS.APPROVED}>Approved</Option>
              <Option value={STATUS.PENDING}>Pending</Option>
              <Option value={STATUS.REJECTED}>Rejected</Option>
            </Styled.SelectTwo>
          </Styled.StyledSpace>
        </Styled.FilterContainer>
      </Styled.ListHeader>
      {isLoading || isFetching ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <Styled.TableWrapper>
          <Table
            columns={columns}
            dataSource={currentData}
            pagination={false}
            showSorterTooltip={{ align: { offset: [0, -30] } }}
          />
        </Styled.TableWrapper>
      )}
      <Styled.PaginationWrapper>
        <Pagination
          defaultCurrent={1}
          total={transactionsList?.total || 0}
          pageSize={pageSize}
          current={currentPage}
          prevIcon={<LeftOutlined className="color-black" />}
          nextIcon={<RightOutlined className="color-black" />}
          onChange={handlePageChange}
          responsive={true}
        />
      </Styled.PaginationWrapper>
    </Card>
  );
};

export default TransactionsList;
