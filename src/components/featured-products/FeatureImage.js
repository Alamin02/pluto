import { Image } from "antd";
const FeatureImage = ({source, style}) => {
  return(
    <>
      <Image 
        src={source}
        preview={false}
        style={style}
      />
    </>
  );
};

export default FeatureImage;