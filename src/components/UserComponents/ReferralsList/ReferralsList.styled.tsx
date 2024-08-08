import styled from "styled-components";

// antd
import { Empty, Select, Space, Input } from "antd";

// breakpoints
import { breakpoint } from "@/breakpoints";

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  gap: 10px;
  flex-direction: column;
  ${breakpoint.lg} {
    flex-direction: row;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin: 0px;
  padding-bottom: 10px;
  width: 100%;
  font-size: 20px;
  ${breakpoint.md} {
    text-align: left;
  }
  ${breakpoint.lg} {
    padding-bottom: 0px;
    width: auto;
  }
`;
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  ${breakpoint.md} {
    flex-direction: row;
  }
  ${breakpoint.lg} {
    width: auto;
  }
`;
export const searchField = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 100%;
  }
`;

export const EmptyStateContainer = styled.div`
  padding: 20px;
`;

export const TableWrapper = styled.div`
  overflow: auto;
  border-radius: 18px;
`;

export const PaginationWrapper = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export const EmptyState = styled(Empty)`
  span {
    color: #ff0000;
  }
`;

export const SelectStyled = styled(Select)`
  width: 100%;
`;

export const StyledSpace = styled(Space)`
  display: flex;
  flex: 1;
  .ant-space-item {
    flex: 1;
  }
`;

export const StyledSearch = styled(Input.Search)`
  .ant-input-affix-wrapper {
    border-start-start-radius: var(--border-radius-input) !important;
    border-end-start-radius: var(--border-radius-input) !important;
    .ant-input {
      border-radius: unset !important;
    }
  }
  .ant-input-group-addon {
    button {
      border-radius: unset !important;
      border-start-end-radius: var(--border-radius-input) !important;
      border-end-end-radius: var(--border-radius-input) !important;
    }
  }
`;
