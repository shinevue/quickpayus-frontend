import { useSelector } from "react-redux";
import * as Styled from "./Profile.styled.js";
import { Link } from "react-router-dom";
import { selectKycVerification } from "@/app/selectors";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const KYCVerification = () => {
  const kyc = useSelector(selectKycVerification);

  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    switch (kyc.status) {
      case "REJECTED":
        setCurrentState(0);
        return;
      case "PENDING":
        setCurrentState(1);
        return;
      case "APPROVED":
        setCurrentState(3);
        return;
      default:
        setCurrentState(0);
        return;
    }
  }, [kyc.status]);

  return (
    <>
      <Styled.KycMainRow>
        <Styled.StyledKYCCol span={24}>
          <Styled.KycBox className=" text-center">
            {kyc.status === "APPROVED" ? (
              <Styled.KycBtn type="dashed">KYC verified</Styled.KycBtn>
            ) : kyc.status === "PENDING" ? (
              <Link to="/verification">
                <Styled.KycBtn type="default">
                  Pending
                  <Spin
                    style={{ marginLeft: "10px" }}
                    indicator={<LoadingOutlined spin />}
                  />
                </Styled.KycBtn>
              </Link>
            ) : kyc.status === "REJECTED" ? (
              <Link to="/verification">
                <Styled.KycBtn type="primary" danger>
                  Re-Verify
                </Styled.KycBtn>
              </Link>
            ) : (
              <Link to="/verification">
                <Styled.KycBtn type="primary">Get Verified</Styled.KycBtn>
              </Link>
            )}
          </Styled.KycBox>
        </Styled.StyledKYCCol>
      </Styled.KycMainRow>
      {/* <Steps
        current={currentState}
        items={[
          {
            title: "Verify",
            description: "Your KYC doesn't have been submitted.",
          },
          {
            title: "Pending",
            description: "Your KYC verification is in process.",
          },
          {
            title: "Finished",
            description: "Your KYC has been approved.",
          },
        ]}
      /> */}
    </>
  );
};

export default KYCVerification;
