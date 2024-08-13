import * as Styled from "./ReviewForm.styled";
import { Space } from "antd";
import { useDevice } from "@/utils/Hooks/useDevice";
import { useSelector } from "react-redux";

import {
  selectKycVerification,
  selectProfile,
} from "@/app/selectors";
import moment from "moment-timezone";

export const ReviewForm: React.FC = () => {
  const kycFormData = useSelector(selectKycVerification);
  const profileFormData = useSelector(selectProfile);

  const firstName = profileFormData.firstName || "";
  const lastName = profileFormData.lastName || "";
  const phoneNumber = profileFormData.phoneNumber;
  const country = kycFormData.country;
  const gender = kycFormData.gender;
  const addressLine = kycFormData.addressLine;
  const addressLine2 = kycFormData.addressLine2;
  const occupation = kycFormData.occupation;
  const dateOfBirth = kycFormData.dateOfBirth;
  const documentType = kycFormData.documentType;

  // const handleValuesChange = (changedValues, allValues) => {
  //   console.log(allValues);
  // };

  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  const device = useDevice();
  return (
    <div>
      <Styled.Heading>Review your Information</Styled.Heading>
      <Styled.ContainerWrapper>
        <Styled.Container>
          <Space
            size={device?.isBreakpoint("MD") ? 32 : 16}
            direction={device?.isBreakpoint("MD") ? "horizontal" : "vertical"}
          >
            <div>
              <Styled.FieldTitle>First Name</Styled.FieldTitle>
              <Styled.FieldValue>{firstName}</Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Last Name</Styled.FieldTitle>
              <Styled.FieldValue>{lastName}</Styled.FieldValue>
            </div>
          </Space>
          <Space
            size={device?.isBreakpoint("MD") ? 32 : 16}
            direction={device?.isBreakpoint("LG") ? "horizontal" : "vertical"}
          >
            <div>
              <Styled.FieldTitle>Phone Number</Styled.FieldTitle>
              <Styled.FieldValue>{phoneNumber}</Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Date of Birth</Styled.FieldTitle>
              <Styled.FieldValue>
                {moment(dateOfBirth).format("yyyy-MM-DD")}
              </Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Gender</Styled.FieldTitle>
              <Styled.FieldValue>{gender}</Styled.FieldValue>
            </div>
          </Space>
        </Styled.Container>
        <Styled.Container>
          <Space
            size={device?.isBreakpoint("MD") ? 32 : 16}
            direction={device?.isBreakpoint("LG") ? "horizontal" : "vertical"}
          >
            <div>
              <Styled.FieldTitle>Country</Styled.FieldTitle>
              <Styled.FieldValue>{country}</Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Occupation</Styled.FieldTitle>
              <Styled.FieldValue>{occupation}</Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Document Type</Styled.FieldTitle>
              <Styled.FieldValue>{documentType}</Styled.FieldValue>
            </div>
          </Space>
        </Styled.Container>
        <Styled.Container>
          <Space
            size={device?.isBreakpoint("MD") ? 32 : 16}
            direction={device?.isBreakpoint("MD") ? "horizontal" : "vertical"}
          >
            <div>
              <Styled.FieldTitleRight>
                Address Line 1 & Address Line 2
              </Styled.FieldTitleRight>
              <Space
                size={device?.isBreakpoint("MD") ? 32 : 16}
                direction={
                  device?.isBreakpoint("MD") ? "horizontal" : "vertical"
                }
              >
                <div>
                  <Styled.FieldValue>{addressLine}</Styled.FieldValue>
                </div>
                <div>
                  <Styled.FieldValue>{addressLine2}</Styled.FieldValue>
                </div>
              </Space>
            </div>
          </Space>
        </Styled.Container>
        <Styled.UploadSection>
          <Styled.FieldTitle> Uploaded Documents</Styled.FieldTitle>
          <Styled.Heading>Documents:</Styled.Heading>
          <Styled.ImgGrp>
            {kycFormData.documents?.map((item: any, index: number) => (
              // <Styled.UploadImg key={index} />
              <img
                key={index}
                width={"120px"}
                src={URL.createObjectURL(item.fileObj)}
              />
            ))}
          </Styled.ImgGrp>
          <Styled.Heading>User Info:</Styled.Heading>
          <Styled.ImgGrp>
            {kycFormData.images?.map((item: any, index: number) => (
              <img
                key={index}
                width={"120px"}
                src={URL.createObjectURL(item.fileObj)}
              />
            ))}
          </Styled.ImgGrp>
        </Styled.UploadSection>
      </Styled.ContainerWrapper>
    </div>
  );
};
