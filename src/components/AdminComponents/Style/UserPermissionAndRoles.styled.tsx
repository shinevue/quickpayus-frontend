import styled from "styled-components";

export const Layout = styled.div`
    padding: 40px;
    background-color: #f3f4f6;
    max-height: calc(100vh - 50px);
    overflow: auto;
    @media (min-width: 768px) {
        padding: 80px;
    }
`;

export const Card = styled.div`
    padding: 40px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

export const Header = styled.h2`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    margin-bottom: 16px;
    text-align: center;
    @media (min-width: 768px) {
        font-size: 1.875rem;
        line-height: 2.25rem;
    }
`;

export const Container = styled.div`
    margin-bottom: 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const SubHeader = styled.h3`
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin-bottom: 8px;
    @media (min-width: 768px) {
        margin-bottom: 0px;
    }
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`

export const CheckBoxLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const CheckBoxGroupHeader = styled.h3`
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin-bottom: 8px;
`

export const CheckBoxWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`