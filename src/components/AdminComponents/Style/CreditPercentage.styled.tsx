import styled from "styled-components";

import { Card } from "antd";

export const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 50px);
    overflow: auto;
    padding: 25px;
    background-color: var(--color-bg-layout);
`

export const StyledCard = styled(Card)`
    border-radius: 18px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const Header = styled.h1`
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: bold;
`;

export const Item = styled.div`
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
`

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`