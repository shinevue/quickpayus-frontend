import styled from "styled-components";
import { Typography } from "antd";

const {Title} = Typography;

export const Layout = styled.div`
    margin: 0 auto;
    background-color: var(--color-bg-container);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 18px;
    padding: 40px;
    margin-bottom: 40px;
`

export const Header = styled.h2`
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
    font-weight: 600;
    margin-bottom: 16px;
`;

export const Role = styled.p`
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
    margin-bottom: 16px;
`

export const MainHeader = styled(Title)`
    font-size: 21px !important;
    margin-bottom: 20px !important;
    @media (max-width: 768px) {
        text-align: center;
    }
`