import { Input, Typography } from "antd";
import styled from "styled-components";

const {Title} = Typography;

export const Layout = styled.div`
    padding: 25px;
    background-color: var(--color-bg-container);
    margin: 25px;
    border-radius: 18px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    @media (max-width: 768px) {
        margin: 0;
        margin-top: 40px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    @media (max-width: 768px) {
        align-items: center;
    }
`

export const StyledInput = styled(Input)`
    border-width: 1px;
    border-color: #d1d5db;
    border-radius: 4px;
    padding: 4px 12px;
    margin-top: 8px;
`

export const Header = styled(Title)`
    margin-bottom: 20px !important;
    font-weight: 700 !important;
    @media (max-width: 768px) {
        text-align: center;
    }
`