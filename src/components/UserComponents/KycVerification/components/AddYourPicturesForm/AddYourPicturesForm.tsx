import { Form, Select, Radio, Divider } from "antd";
import * as Styled from "./AddYourPicturesForm.styled";
import { UploadButton } from "../../../UploadButton/UploadButton";
import { updateKycField } from "@/app/slices/KycVerificationSlice";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

interface AddYourPicturesFormProps {
  errors: {
    images: string;
  };
}

export const AddYourPicturesForm: React.FC<AddYourPicturesFormProps> = ({
  errors,
}) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [value, setValue] = useState(1);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleValuesChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const getFileList = (images) => {
    const filesWithSerializedDate = images.fileList.map((file) => ({
      // ...file,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate.toISOString(), // Convert Date to string
      name: file.name,
      size: file.size,
      fileObj: file.originFileObj
      // Copy any other needed properties
    }));
    dispatch(
      updateKycField({ field: "images", value: filesWithSerializedDate })
    );
  };

  const InfoPoints = [
    "Upload a well-lit, clear photo of yourself",
    "Ensure your face and ID are clearly visible and not obscured",
    "Avoid wearing sunglasses or hats that may obscure your face",
  ];
  return (
    <div>
      <Styled.Heading>Upload your pictures</Styled.Heading>
      <Styled.FormDetailsContainer>
        <Styled.StyledForm
          form={form}
          onValuesChange={handleValuesChange}
          layout="vertical"
        >
          <Form.Item label="Add Document">
            <UploadButton getFileList={getFileList} maxCount={1} />
          </Form.Item>
          <Styled.ErrorMessage>{errors.images}</Styled.ErrorMessage>
        </Styled.StyledForm>
        <Styled.InfoContainer>
          <Styled.InfoTitle>
            Take pictures of both sides of your government issued id card
          </Styled.InfoTitle>
          <Styled.InfoList>
            {InfoPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </Styled.InfoList>
        </Styled.InfoContainer>
      </Styled.FormDetailsContainer>
    </div>
  );
};
