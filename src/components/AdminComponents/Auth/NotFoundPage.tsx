import { selectProfile } from "@/app/selectors";
import { Button, Result } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPermission } from "./authSlice";


export const NotFoundPage = () => {
  const profile = useSelector(selectProfile);
  const permissions = useSelector(selectPermission);
  if (profile.role === "user")
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
  else
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          permissions&&permissions?.includes('View Dashboard' as never) && <Link to="/admin/dashboard">
            <Button type="primary">Back Dashboard</Button>
          </Link>
        }
      />
    );
};
