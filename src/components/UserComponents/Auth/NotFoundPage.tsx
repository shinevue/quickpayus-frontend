import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/dashboard">
          <Button type="primary">Back Dashboard</Button>
        </Link>
      }
    />
  );
};
