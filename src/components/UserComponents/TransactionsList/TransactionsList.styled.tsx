import styled from "styled-components";

// antd
import { Select, Space } from "antd";

// breakpoints
import { breakpoint } from "@/breakpoints";

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

// export const ListContainer = styled.div`
//   background: var(--color-bg-container);
//   padding: 24px;

//   border-radius: 18px;
// `;

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
export const TableWrapper = styled.div`
  overflow-x: auto;
`;
export const PaginationWrapper = styled.div`
  margin-top: 20px;
  text-align: right;
`;
export const SelectOne = styled(Select)`
  width: 100%;
  flex: 1;
`;
export const SelectTwo = styled(Select)`
  width: 100%;
  flex: 1;
`;
export const StyledSpace = styled(Space)`
  display: flex;
  flex: 1;
  .ant-space-item {
    flex: 1;
  }
`;
