import { Image } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const imageStyle = {
  display: "inline-block",
  position: "relative",
};

const titleStyle = {
  display: "inline-block",
  position: "absolute",
  top: "40%",
  width: "300px",
  margin: "0px 20px",
};

const deleteButtonStyle = {
  cursor: "pointer",
  position: "absolute",
  marginLeft: "325px",
  top: "40%",
  fontSize: "25px",
  color: "red",
};

export default function DisplayImage({
  imageArray,
  token,
  deleteImage,
  handleImageFromState,
}) {

  return imageArray.map((image) => (
    <div key={image.id}>
      <div style={imageStyle}>
        <Image width={100} height={136} src={image.path} />
        <div style={titleStyle}>
          <p>{image.originalname}</p>
        </div>

        <CloseCircleOutlined
          onClick={() => {
            deleteImage(image.id, token);
            handleImageFromState(image.id, image.originalname);
          }}
          style={deleteButtonStyle}
        />
      </div>
    </div>
  ));
}
