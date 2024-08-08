import { selectProfile } from "@/app/selectors";
import { Button, Result } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  const profile = useSelector(selectProfile);
  if(profile.role === 'user')
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to='/dashboard'>
          <Button type="primary">Back Dashboard</Button>
        </Link>
      }
    />
  );
  else return <div>dsofijsdfj</div>
};
