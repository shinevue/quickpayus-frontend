// antd
import { Table, Pagination, Select, Skeleton, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// redux
import { useReferralsList } from "./useReferralsList";

// constants
import { REFERRAL_TYPE } from "./constants";

// styles
import * as Styled from "./ReferralsList.styled";
import { useEffect } from "react";

const { Option } = Select;

const Referrals: React.FC = () => {
  const {
    currentPage,
    pageSize,
    isLoading,
    isFetching,
    currentData,
    handleTypeChange,
    handleLevelChange,
    handlePageChange,
    handleSearch,
    columns,
    isSuccess,
    levels,
    referrals,
    type,
    directLevel,
  } = useReferralsList();

  useEffect(() => {
    console.log('referrals', currentData);
  }, [currentData])
  return (
    <Card>
      <Styled.ListHeader>
        <Styled.Title>Referrals</Styled.Title>
        <Styled.FilterContainer>
          <Styled.StyledSpace size={10}>
            <Styled.StyledSearch
              placeholder="Search"
              onSearch={handleSearch}
              allowClear
              style={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            />
          </Styled.StyledSpace>
          <Styled.StyledSpace size={10}>
            <Styled.SelectStyled
              defaultValue={REFERRAL_TYPE.DIRECT}
              onSelect={handleTypeChange}
            >
              <Option value={REFERRAL_TYPE.DIRECT}>Direct</Option>
              <Option value={REFERRAL_TYPE.INDIRECT}>Indirect</Option>
            </Styled.SelectStyled>
            {type === REFERRAL_TYPE.DIRECT && (
              <Styled.SelectStyled defaultValue={1}>
                <Option key={directLevel} value={directLevel}>
                  {"Level 1"}
                </Option>
              </Styled.SelectStyled>
            )}

            {type === REFERRAL_TYPE.INDIRECT && (
              <Styled.SelectStyled
                defaultValue={2}
                onChange={handleLevelChange}
              >
                {levels.map((level) => (
                  <Option key={level} value={level}>
                    {"Level " + level}
                  </Option>
                ))}
              </Styled.SelectStyled>
            )}
          </Styled.StyledSpace>
        </Styled.FilterContainer>
      </Styled.ListHeader>
      {isLoading || isFetching ? ( // Show skeleton loader while data is loading
        <div>
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <Styled.TableWrapper>
          <Table
            columns={columns}
            dataSource={isSuccess ? currentData.slice((currentPage - 1)*15, (currentPage)* 15) : []}
            pagination={false}
            rowKey="username"
            showSorterTooltip={{ align: { offset: [0, -30] } }}
          />
        </Styled.TableWrapper>
      )}
      <Styled.PaginationWrapper>
        <Pagination
          defaultCurrent={1}
          total={referrals?.total || 0}
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

export default Referrals;
