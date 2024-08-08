import styled from 'styled-components'

import {Col} from 'antd';

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 50px);
    padding: 25px;
`;

export const Header = styled.div`
    font-size: 30px;
    text-align: left;
    font-weight: 600;
    margin-bottom: 32px;
`

export const Card = styled.div`
    background-color: var(--color-bg-container);
    padding: 24px;
    border-radius: 18px;
    margin-bottom: 1.5rem;
`

export const SubHeader = styled.div`
    font-size: 18px;
    font-weight: 600;   
`

export const Description = styled.div`
    color: #4B5563;
    margin-right: 8px;
`

export const RadioGroup = styled(Col)`
    gap: 12px;
    margin: 16px 0;
`