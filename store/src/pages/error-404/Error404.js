import { Link } from "react-router-dom";
import { Button, Result } from "antd";

function Error404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Go Back Home</Button>
        </Link>
      }
    />
  );
}

export default Error404;
