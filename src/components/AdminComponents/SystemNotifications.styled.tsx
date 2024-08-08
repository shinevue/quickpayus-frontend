import { Button } from "antd";
import styled from "styled-components";

export const Card = styled.div`
    background-color: var(--color-bg-container);
    padding: 16px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

export const DangerButton = styled(Button)`
    background: var(--accent-red);
    border-radius: var(--border-radius-button) !important;
    &:hover {
        background: var(--accent-red-affix-hover) !important;
        color: black !important;
    }
`