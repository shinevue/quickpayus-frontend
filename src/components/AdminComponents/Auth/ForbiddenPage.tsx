import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const ForbiddenPage = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link to="/signin">
          <Button type="primary">Back Dashboard</Button>
        </Link>
      }
    />
  );
};
