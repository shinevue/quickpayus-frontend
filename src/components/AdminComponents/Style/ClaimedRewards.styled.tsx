import styled from "styled-components";

import { Row } from "antd";

export const Layout = styled.div`
    padding: 25px;
`

export const Header = styled.h2`
    font-size: 30px;
    line-height: 36px;
    color: #2e2e2e;
    font-weight: bold;
    margin-bottom: 16px;
`

export const StyledRow = styled(Row)`
    margin-bottom: 16px;
    gap: 10px;
` 

export const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    background: var(--color-bg-container);
    padding: 30px;
    border-radius: 18px;
    @media (max-width: 640px) {
        max-width: 640px;
    }
    @media (max-width: 768px) {
        max-width: 768px;
    }
`

export const TableWrapper = styled.div`
    @media (max-width: 530px) {
        // width: calc(100vw - 80px);
        overflow: auto;
    }
`