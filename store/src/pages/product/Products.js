import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Badge, Pagination, Input } from "antd";
import qs from "query-string";

import { agent } from "../../helpers/agent";
import MainHeader from "../../components/main-header/MainHeader";
import ProductMenu from "../../components/product/ProductMenu";
import CardItem from "../../components/product/ProductCard";
import MainContainer from "../../components/layout/MainContainer";
import SearchBar from "../../components/product/SearchBar";
import SortMenu from "../../components/product/SortProductsMenu";

const { Search } = Input;

export default function Products() {
  const history = useHistory();
  const query = qs.parse(window.location.search);

  const [productsData, setProductsData] = useState([]);
  const [totalProductsInfo, setTotalProductsInfo] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(query.page) || 1);
  const [perPage, setPerPage] = useState(parseInt(query.pageSize) || 12);
  const [search, setSearch] = useState("");

  const perPage2 = perPage * 2;
  const perPage3 = perPage * 3;

  function fetchProducts() {
    const queryString = qs.stringify({
      page: currentPage,
      perPage,
      search,
    });

    agent
      .getProducts(queryString)
      .then((res) => res.json())
      .then(({ data }) => {
        setTotalProductsInfo(data);
        setProductsData(data.products);
      });
  }

  function onChange(page, pageSize) {
    setCurrentPage(page);
    setPerPage(pageSize);

    history.push({
      search: `?page=${page}`,
    });
  }

  function onSearch(value) {
    console.log(value);
    setSearch(value);
  }

  useEffect(() => {
    fetchProducts();
  }, [currentPage, perPage, search]);

  return (
    <div>
      <MainHeader name="popular list" sub="home - shop - products" />
      <MainContainer>
        <ProductMenu />
        <br />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <span style={{ marginRight: "10px" }}>Sort By</span>
            <SortMenu />
          </Col>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
              />
            </div>
          </Col>
        </Row>
        <br />
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
          showQuickJumper
          defaultCurrent={1}
          showSizeChanger={false}
          pageSizeOptions={[perPage2, perPage3] || 10}
          current={currentPage}
          onChange={onChange}
          defaultPageSize={totalProductsInfo.perPage || 10}
          pageSize={perPage || 10}
          total={totalProductsInfo.productCount}
          showTotal={(total, range) =>
            `${range[0]} to ${range[1]} of ${total} Products`
          }
        />
      </MainContainer>
    </div>
  );
}
