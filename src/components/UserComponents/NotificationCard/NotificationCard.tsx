import { NOTIFICATION_TYPES } from "../Notifications/constanst";
import { ANNOUNCEMENT_TYPES } from "../Announcements/constants";
import * as Styled from "./NotificationCard.styled";
import dayjs from "dayjs";
import {
  AlertOutlined,
  BellOutlined,
  CheckOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const NotificationCard = ({ cardItem, variant }) => {
  const icon =
    variant === "notification" ? (
      cardItem.type === NOTIFICATION_TYPES.GENERAL ? (
        <BellOutlined style={{color: "#007AFF"}} />
      ) : cardItem.type === NOTIFICATION_TYPES.IMPORTANT ? (
        <AlertOutlined style={{color: "#FF3B30"}}/>
      ) : (
        <InfoCircleOutlined className="color-gray" />
      )
    ) : variant === "announcements" ? (
      cardItem.type === ANNOUNCEMENT_TYPES.GENERAL ? (
        <BellOutlined twoToneColor="blue" />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.IMPORTANT ? (
        <AlertOutlined style={{color: "#FF3B30"}} />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.UPDATES ? (
        <InfoCircleOutlined className="color-green" />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.URGENT ? (
        <AlertOutlined style={{color: "#FF3B30"}} />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.WARNING ? (
        <WarningOutlined className="color-orange" />
      ) : (
        <InfoCircleOutlined className="color-gray" />
      )
    ) : null;

  return (
    <Styled.NotificationCardContainer $type={cardItem.type}>
      {variant === "notification"
        ? !cardItem.isRead && <Styled.UnreadDot />
        : null}
      <Styled.NotificationIcon $variant={variant}>
        {icon}
      </Styled.NotificationIcon>
      <Styled.NotificationBody>
        <Styled.NotificationContent>
          <Link to={cardItem.link}>
            <Styled.Title $type={cardItem.$type}>{cardItem.title}</Styled.Title>
            {variant === "announcements" ? (
              cardItem.description && (
                <Styled.Message>{cardItem.description}</Styled.Message>
              )
            ) : (
              <Styled.Message>{cardItem.message}</Styled.Message>
            )}
          </Link>
        </Styled.NotificationContent>
        <Styled.Action>
          <Styled.Time $variant={variant}>
            <span>{dayjs(cardItem?.createdAt).format("DD-MM-YYYY hh:mm A")}</span>
          </Styled.Time>
          <Button size="small" type="text" icon={<CheckOutlined />} />
          <Button size="small" type="text" danger icon={<DeleteOutlined />} />
        </Styled.Action>
      </Styled.NotificationBody>
    </Styled.NotificationCardContainer>
  );
};
