import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const MethodNotAllowedPage = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/dashboard">
          <Button type="primary">Back Dashboard</Button>
        </Link>
      }
    />
  );
};
