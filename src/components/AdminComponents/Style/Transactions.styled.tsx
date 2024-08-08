import styled from "styled-components";

export const Layout = styled.div`
    margin: 25px;
    padding: 25px;
    border-radius: 18px;
    background-color: var(--color-bg-container);
`;

export const Header = styled.h1`
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
    margin: 20px 0;
    color: var(--color-text);
    font-weight: 700;
`;

export const Container = styled.div`
    display: flex;
    gap: 40px;
    margin: 40px 0;
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