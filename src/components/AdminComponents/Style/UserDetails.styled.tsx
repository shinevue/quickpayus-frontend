import { Button, Select, Typography } from "antd";
import styled from "styled-components";

const {Title} = Typography;

export const Layout = styled.div`
    padding: 25px;
`;

export const Card = styled.div`
    margin: 0 auto;
    padding: 24px;
    border-radius: 18px;
    background-color: var(--color-bg-container);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow-x: auto;
`

export const Header = styled(Title)`
    font-size: 21px !important;
    margin-bottom: 20px !important;
    @media (max-width: 768px) {
        text-align: center;
    }
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    // justify-content: space-between;
    gap: 12px;
    margin-bottom: 24px;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`

export const StyledButton = styled(Button)`
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s;
    display: flex;
    border-radius: 8px;
    align-items: center;
    &:hover {
        background-color: #2563eb;
    }
`;

export const SearchWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`

export const SearchInput = styled.input`
    border-width: 1px;
    border-color: var(--color-border-primary);
    background-color: transparent;
    border-radius: 6px;
    padding: 4px 12px;
    &:focus {
        outline: none;
        border-color: #3b82f6;
    }
`

export const StyledSelect = styled(Select)`
    height: 100%;
    border-radius: 4px;
    min-width: 120px !important;
`

export const FilterWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
`

export const TableWrapper = styled.div`
    width: calc(100vw - 400px);
    
    overflow: auto;
    @media (max-width: 768px) {
        width: calc(100vw - 100px);
    }
`