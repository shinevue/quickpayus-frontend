import styled from "styled-components";

interface NotificationCardContainerProps {
  $type: string; // Assuming $type is a string, adjust as necessary
}

interface NotificationIconProps {
  $variant: string; // Same here, assuming $variant is a string
}

interface TitleProps {
  $type: string;
}

interface NotificationIconProps {
  $variant: string; // Adjust the type as needed, e.g., to a more specific type or enum if applicable
}

interface TimeProps {
  $variant: string; // Adjust the type as needed, for example, you might use an enum or union type for specific variant strings
}

export const NotificationCardContainer = styled.div<NotificationCardContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-container);
  margin-bottom: 8px;
  background-color: var(--color-bg-container);
  color: ${(props) => {
    switch (props.$type) {
      case "GENERAL":
        return "blue";
      case "ACTIVITY":
        return "gray";
      case "IMPORTANT":
        return "#f00000";
      default:
        return "gray";
    }
  }};
  transition: all 0.2s ease,
    background var(--transition-time-when-switch-theme-mode),
    border var(--transition-time-when-switch-theme-mode);

  &:hover {
  }
`;

export const NotificationIcon = styled.div<NotificationIconProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 15px;
  font-size: ${(props) =>
    props.$variant === "announcements" ? "18px" : "16px"};
  color: #333;
`;

export const NotificationBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    text-align: left;
    flex-direction: column;
    gap: 8px;
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 8px;
  color: var(--color-text);
`;

export const Message = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 8px;
  font-size: 14px;
`;

export const Time = styled.div<TimeProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.$variant === "announcements" ? "flex-start" : "flex-end"};
  gap: 2px;
  font-size: 10px;
  color: #999;
`;

export const UnreadDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #FF3B30;
  border-radius: 50%;
  display: inline-block;
  margin-top: 2px;
  margin-right: 8px;
  position: relative;
`;

export const Title = styled.div<TitleProps>`
  font-size: 16px;
  font-weight: 600;
  // margin-bottom: 8px;
  color: var(--color-text);
`;

export const Action = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 4px;
  min-width: 170px;
`