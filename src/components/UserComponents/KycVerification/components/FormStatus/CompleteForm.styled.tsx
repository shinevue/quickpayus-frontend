import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

export const Heading = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 16px 0px;
  // color: #0a0a0a;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
`;
export const CompleteFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: center;
`;
export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  @keyframes rotateHourglass {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  font-size: 70px;
  margin-bottom: 20px;
  animation: rotateHourglass 2s linear infinite;
`;

export const StyledDescription = styled.p`
  margin-top: 0;
  color: #767678;
`;

export const StyledCheckIcon = styled(CheckCircleOutlined)`
  font-size: 70px;
  color: green;
`;

export const StyledCancelIcon = styled(CloseCircleOutlined)`
  font-size: 70px;
  color: red;
`;
