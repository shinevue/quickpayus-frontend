import * as Styled from "./CompleteForm.styled";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

interface CompleteFormProps {
  state: number;
}

interface contentType {
  title: string;
  description: string;
  percent: number;
}
export const CompleteForm: React.FC<CompleteFormProps> = ({ state }) => {
  // 0 => pending 1 => verified 2 => declined
  const [status, setStatus] = useState(state);

  useEffect(() => {
    if (status === 0)
      setTimeout(() => {
        setStatus(3);
      }, 1000);
  }, []);

  const [content, setContent] = useState<contentType>();
  useEffect(() => {
    switch (status) {
      case 0:
        setContent({
          title: "Verification Pending",
          description:
            "Your KYC verification has been submitted.",
          percent: 100,
        });
        break;
      case 1:
        setContent({
          title: "Verification Approved",
          description:
            "Your application has been verified.",
          percent: 100,
        });
        break;
      case 2:
        setContent({
          title: "Verification Rejected",
          description: "Please re-verify your KYC verification.",
          percent: 0,
        });
        break;
    }
  }, [status]);

  return (
    <Styled.CompleteFormWrapper>
      {status === 3 ? (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: "48px" }} spin />}
        />
      ) : (
        <div>
          <Styled.Heading>{content?.title}</Styled.Heading>
          <Styled.StyledDescription>
            {content?.description}
          </Styled.StyledDescription>
          <br />
          {/* {status !== 2 && <Progress strokeColor={"green"} percent={content?.percent} showInfo={false} />} */}
          {status === 2 && <Spin indicator={<LoadingOutlined spin />} />}
        </div>
      )}
    </Styled.CompleteFormWrapper>
  );
};
