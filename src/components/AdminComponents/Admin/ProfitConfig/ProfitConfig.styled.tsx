import styled from "styled-components";
import { Button, Typography } from "antd";

const {Title} = Typography;

export const Layout = styled.div`
    padding: 25px;
    margin: 25px;
    background-color: var(--color-bg-container);
    border-radius: 18px;
`

export const Wrapper = styled.div`
    display: flex;
    gap: 40px;
    margin: 20px 0;
`;

export const StyledLabel = styled.label`
    font-weight: 500;
`;

export const StyledSelect = styled.select`
    border-width: 1px;
    border-color: #d1d5db;
    border-radius: 4px;
    padding: 4px 12px;
`;

export const table = styled.table`
    min-width: 100%;
    border-top: 1px solid #e5e7eb;
`

export const th = styled.th`
    padding: 12px 24px;
    text-align: left;
    font-size: 0.75rem /* 12px */;
    line-height: 1rem /* 16px */;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const td = styled.td`
    padding: 16px 24px;
    white-space: nowrap;
`

export const input = styled.input`
    border-width: 1px;
    border-color: #d1d5db;
    border-radius: 4px;
    padding: 4px 12px;
    margin-right: 8px;
    min-width: 96px;
`;

export const button = styled.button`
    background-color: #3b82f6;
    color: white;
    padding: 4px 8px;
    border-radius: 8px;
`

export const PaginationWrapper = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledButton = styled(Button)`
    background-color: #3b82f6;
    color: white;
    padding: 0 8px;
    border-radius: 6px;
`

export const Header = styled(Title)`
    text-align: left;
    font-size: 21px !important;
    margin-bottom: 20px !important;
    @media (max-width: 768px) {
        text-align: center;
    }
`