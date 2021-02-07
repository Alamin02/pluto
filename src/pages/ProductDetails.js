import { useParams } from "react-router-dom";
import MainHeader from "../components/main-header/MainHeader";
import ProductView from "../components/product-view/ProductView";

import productList from "../assets/data/sampleProductData";
import Error404 from "../components/error-404/Error404";

const ProductDetails = () => {
  const { id } = useParams();

  const product = productList.find((product) => product.id === parseInt(id));

  if (!product) return <Error404 />;

  return (
    <div>
      <MainHeader name="popular products" sub="home - shop - products" />
      <ProductView product={product} />
    </div>
  );
};

export default ProductDetails;
