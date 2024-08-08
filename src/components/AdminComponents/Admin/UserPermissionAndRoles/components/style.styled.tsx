import styled from "styled-components";
import { Typography } from "antd";

const {Title} = Typography;

export const Card = styled.div`
    background-color: var(--color-bg-container);
    border-radius: 18px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 40px;
    @media (max-width: 768px) {
        align-items: center;
    }
`

export const Header = styled(Title)`
    font-size: 21px !important;
    margin-bottom: 20px !important;
    @media (max-width: 768px) {
        text-align: center !important;
    }
`