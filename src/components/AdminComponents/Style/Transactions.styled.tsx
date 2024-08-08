import styled from "styled-components";
import { Table, Typography } from "antd";

const {Title} = Typography;

export const Layout = styled.div`
    margin: 25px;
    padding: 25px;
    border-radius: 18px;
    background-color: var(--color-bg-container);
`;

export const Header = styled(Title)`
    font-size: 21px !important;
    margin: 20px 0px !important;
    @media (max-width: 768px) {
        text-align: center;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin: 20px 0;
`;

export const StyledLabel = styled.label`
    margin-right: 8px;
    font-weight: 500;
    color: var(--color-text);
`

export const StyledSelect = styled.select`
    border-width: 1px;
    border-color: #d1d5db;
    border-radius: 4px;
    padding: 4px 12px;
    background-color: var(--color-bg-container);
    color: var(--color-text);
    border-color: var(--color-border-primary);
`