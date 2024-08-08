import styled from "styled-components";

export const Card = styled.div`
    background-color: var(--color-bg-container);
    border-radius: 18px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 40px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
    @media (max-width: 768px) {
        align-items: center;
    }
`