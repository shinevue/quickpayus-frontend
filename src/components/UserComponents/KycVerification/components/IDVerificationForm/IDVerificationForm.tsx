import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryCode, getCountryData } from "countries-list";

// antd
import { Form, Radio } from "antd";

// styles
import * as Styled from "./IDVerificationForm.styled";

// components
import { UploadButton } from "../../../UploadButton/UploadButton";

// redux
import { updateKycField } from "@/app/slices/KycVerificationSlice";
import { selectKycVerification } from "@/app/selectors";

// constants
import { DOCUMENT_TYPES } from "./constants";

interface IDVerificationFormProps {
  errors: {
    country: string;
    documents: string;
  };
}

export const IDVerificationForm: React.FC<IDVerificationFormProps> = ({
  errors,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [country, setCountry] = useState("");
  const [maxCount, setMaxCount] = useState(2);

  const [images, setImages] = useState([]);
  const kycFormData = useSelector(selectKycVerification);

  const [selected, setSelected] = useState(
    getCountryCode(kycFormData?.country)
  );
  const [documentType, setDocumentType] = useState(kycFormData?.documentType);

  const onChange = (e: any) => {
    setDocumentType(e.target.value);
    if (e.target.value === DOCUMENT_TYPES.PASSPORT) {
      setMaxCount(1);
    } else {
      setMaxCount(2);
    }
    dispatch(updateKycField({ field: "documentType", value: e.target.value }));
  };

  const handleValuesChange = useCallback(
    (changedValues: any, _allValues: any) => {
      setFormValues(changedValues);
      Object.entries(changedValues).forEach(([field, value]) => {
        console.log("field", field);
        if (field === "country") {
          console.log("country", value);
          dispatch(updateKycField({ field, value: country }));
        }
        if (field === "images") {
          dispatch(updateKycField({ field, value: images }));
        }
      });
    },
    [country, dispatch, images]
  );

  const InfoPoints = [
    "Ensure all details are readable in the image you upload",
    "Ensure the document is the original and has not expired",
    "Place documents against a solid-colored background",
  ];

  const getFileList = (images:any) => {
    setImages(images);
    console.log(images);
    const filesWithSerializedDate = images.fileList?.map((file:any) => ({
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate.toISOString(),
      name: file.name,
      size: file.size,
      fileObj: file.originFileObj
    })) || [];
    
    dispatch(updateKycField({ field: "documents", value: filesWithSerializedDate }));
    
    // Validate number of images
    if (filesWithSerializedDate.length === 0) {
      dispatch(updateKycField({ field: "errors", value: { ...errors, documents: "Please upload the required document(s)" } }));
    } else if (documentType !== DOCUMENT_TYPES.PASSPORT && filesWithSerializedDate.length < 2) {
      dispatch(updateKycField({ field: "errors", value: { ...errors, documents: "Please upload both sides of the document" } }));
    } else {
      dispatch(updateKycField({ field: "errors", value: { ...errors, documents: "" } }));
    }
  };

  const handleCountryChange = (value: any) => {
    const countryData = getCountryData(value);
    // setCountry(countryData.name);
    setSelected(value);
    dispatch(updateKycField({ field: "country", value: countryData.name }));
  };

  return (
    <div>
      <Styled.Heading>ID Verification Form</Styled.Heading>
      <Styled.FormDetailsContainer>
        <Styled.StyledForm
          form={form}
          initialValues={{
            country: kycFormData?.country
              ? getCountryCode(kycFormData?.country)
              : "",
            images: kycFormData?.images,
            documentType: kycFormData?.documentType,
          }}
          onValuesChange={handleValuesChange}
          layout="vertical"
        >
          <Styled.StyledFormItem label="Country" name="country">
            <Styled.CountrySelect
              searchable
              selected={selected || ""}
              onSelect={handleCountryChange}
            />
          </Styled.StyledFormItem>
          <Styled.ErrorMessage>{errors.country}</Styled.ErrorMessage>
          <Form.Item label="Choose Document Type">
            <Radio.Group
              className="id-radiobtn"
              onChange={onChange}
              value={documentType}
            >
              <Styled.RadioCardContainer>
                <Styled.RadioCard>
                  <Radio value={DOCUMENT_TYPES.ID_CARD}>ID Card</Radio>
                </Styled.RadioCard>
                <Styled.RadioCard>
                  <Radio value={DOCUMENT_TYPES.PASSPORT}>Passport</Radio>
                </Styled.RadioCard>
                <Styled.RadioCard>
                  <Radio value={DOCUMENT_TYPES.LICENSE}>License</Radio>
                </Styled.RadioCard>
              </Styled.RadioCardContainer>
            </Radio.Group>
          </Form.Item>
          <Styled.StyledFormItem label="Upload Documents" name="images">
            <UploadButton getFileList={getFileList} maxCount={maxCount} />
          </Styled.StyledFormItem>
          <Styled.ErrorMessage>{errors.documents}</Styled.ErrorMessage>
        </Styled.StyledForm>
        <Styled.InfoContainer>
          <Styled.InfoTitle>
            {documentType === DOCUMENT_TYPES.ID_CARD &&
              "Take pictures of both sides of your government issued id card"}
            {documentType === DOCUMENT_TYPES.PASSPORT &&
              "Take picture of your passport"}
            {documentType === DOCUMENT_TYPES.LICENSE &&
              "Take pictures of both sides of your license"}
          </Styled.InfoTitle>
          {/* <div>  
            <Styled.StyledSolutionIcon/>
          </div>   */}
          <Styled.InfoList>
            <li>
              {documentType === DOCUMENT_TYPES.ID_CARD &&
                "Please upload clear images of both the front and back of your ID card."}
              {documentType === DOCUMENT_TYPES.PASSPORT &&
                "Kindly upload a high-quality, clear picture of your passport."}
              {documentType === DOCUMENT_TYPES.LICENSE &&
                "Upload a clear image of your driving license."}
            </li>
            {InfoPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </Styled.InfoList>
        </Styled.InfoContainer>
      </Styled.FormDetailsContainer>
    </div>
  );
};
