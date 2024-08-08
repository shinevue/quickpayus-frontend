import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { StyledUpload } from "./UploadButton.styled";

export const UploadButton = ({ getFileList, maxCount }) => {
  const handleUploadFileList = (fileList) => {
    getFileList(fileList);
  };

  return (
    <> 
      <StyledUpload 
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture"
        defaultFileList={[]}
        style={{ width: "100%" }}
        onChange={handleUploadFileList} 
        maxCount = {maxCount}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </StyledUpload>
    </>
  );
};
