import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Badge, Pagination } from "antd";
import qs from "query-string";

import { agent } from "../../helpers/agent";
import MainHeader from "../../components/main-header/MainHeader";
import ProductMenu from "../../components/product/ProductMenu";
import ProductOption from "../../components/product/option/ProductOption";
import CardItem from "../../components/product/ProductCard";
import MainContainer from "../../components/layout/MainContainer";

export default function Products() {
  let history = useHistory();
  let query = qs.parse(window.location.search);

  const [productsData, setProductsData] = useState([]);
  const [totalProductsInfo, setTotalProductsInfo] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(query.page) || 1);

  function fetchProducts() {
    let queryString = `?page=${currentPage}`;

    agent
      .getProducts(queryString)
      .then((res) => res.json())
      .then(({ data }) => {
        setTotalProductsInfo(data);
        setProductsData(data.products);
      });
  }

  function onChange(page) {
    setCurrentPage(page);

    history.push({ search: `?page=${page}` });
  }

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <div>
      <MainHeader name="popular list" sub="home - shop - products" />
      <MainContainer>
        <ProductMenu />
        <ProductOption />
        <br />
        <Row gutter={[16, 16]}>
          {productsData.map((product) => {
            if (product.offer) {
              return (
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <Badge.Ribbon
                      color="red"
                      text={product.offer.discount + ` % off`}
                    >
                      <CardItem
                        title={product.name}
                        src={product.images[0].path}
                        price={Math.floor(
                          product.price -
                            (product.price * product.offer.discount) / 100
                        )}
                        discount={product.price}
                      />
                    </Badge.Ribbon>
                  </Link>
                </Col>
              );
            } else {
              return (
                <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <CardItem
                      title={product.name}
                      src={product.images.length && product.images[0].path}
                      price={product.price}
                    />
                  </Link>
                </Col>
              );
            }
          })}
        </Row>

        <Pagination
          style={{ display: "flex", justifyContent: "center", margin: "50px" }}
          showSizeChanger
          showQuickJumper
          defaultCurrent={1}
          current={currentPage}
          onChange={onChange}
          defaultPageSize={totalProductsInfo.perPage}
          total={totalProductsInfo.productCount}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} Products`
          }
        />
      </MainContainer>
    </div>
  );
}
