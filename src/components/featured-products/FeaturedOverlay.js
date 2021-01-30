import { ArrowRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";


const { Link } = Typography;

const FeatureOverlay = ({ overlayStyle, name }) => {
  return (
    <>
      <div className={overlayStyle}>
        <Link href="#" target="_blank" style={{ color: "white" }}>                    
          {name}
          <ArrowRightOutlined />
        </Link>
      </div>
    </>
  );
}
 
export default FeatureOverlay;