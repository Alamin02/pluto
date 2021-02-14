import { useParams } from "react-router-dom";
import MainHeader from "../components/main-header/MainHeader";
import ProductView from "../components/product-view/ProductView";

import productList from "../assets/data/sampleProductData";
import Error404 from "../components/error-404/Error404";
import HeaderSection from "../components/styled-components/HeaderSection";

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  marginTop: "25px",
  padding: "0 1rem",
};

const ProductDetails = () => {
  const { id } = useParams();

  const product = productList.find((product) => product.id === parseInt(id));

  if (!product) return <Error404 />;

  return (
    <div>
      {/* <MainHeader name="product details" sub="home ⋅ shop ⋅ products" /> */}
      <div style={container}>
        <HeaderSection headerText="product details" />
      </div>
      <ProductView product={product} />
    </div>
  );
};

export default ProductDetails;
