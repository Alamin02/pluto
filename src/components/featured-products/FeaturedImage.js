import { Image } from "antd";

const FeatureImage = ({ source, style, blur }) => {
  return (
    <>
      <Image className={blur} src={source} preview={false} style={style} />
    </>
  );
};

export default FeatureImage;
