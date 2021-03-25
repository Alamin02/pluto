import image1 from "../../assets/images/featured-products-alt/image1.jpg";
import image2 from "../../assets/images/featured-products-alt/image2.jpg";
import image3horizontal from "../../assets/images/featured-products-alt/image3horizontal.jpg";
import image3vertical from "../../assets/images/featured-products-alt/image3vertical.jpg";

// Guide: Image format
// image1 & image2 will be in 16:9 aspect ratio for optimal viewing experience
// image 3 has two versions. Aspect ratio for the horizontal version of image3 is 16:9 whereas for the vertical one it's 9:16

const featuredProductsAlt = {
  id: 1,
  image1Title: "Vintage watch",
  image1Src: image1,
  image1Url: "",

  image2Title: "Nike shoe",
  image2Src: image2,
  image2Url: "",

  image3Title: "Lamp",
  image3HSrc: image3horizontal,
  image3VSrc: image3vertical,
  image3Url: "",
};

export default featuredProductsAlt;
