import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Typography } from "antd";

import ProductCard from "../../components/product/ProductCard";
import MainContainer from "../../components/layout/MainContainer";
import Loading from "../../components/Loading";
import { agent } from "../../helpers/agent";

const { Title } = Typography;

function Offers() {
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    agent
      .getCategoryProducts(id)
      .then((res) => res.json())
      .then(({ data }) => {
        setCategoryInfo(data);
        setProducts(data.products);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainContainer>
      <Title level={2}>Product category: {categoryInfo.name}</Title>
      {products.length ? (
        <>
          {products.map((product) => {
            return (
              <Row gutter={[16, 16]}>
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <ProductCard
                      title={product.name}
                      src={product.images[0].path}
                      price={product.price}
                      discount={product.offer && product.offer.discount}
                    />
                  </Link>
                </Col>
              </Row>
            );
          })}
        </>
      ) : (
        <>There are no products in this category yet.</>
      )}
    </MainContainer>
  );
}

export default Offers;
