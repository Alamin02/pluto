import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Pagination, Input, Select, Skeleton } from "antd";
import qs from "query-string";

import { getProducts } from "../../client/products.client";
import MainHeader from "../../components/main-header/MainHeader";
import ProductMenu from "../../components/product/ProductMenu";
import CardItem from "../../components/product/ProductCard";
import MainContainer from "../../components/layout/MainContainer";

const { Search } = Input;
const { Option } = Select;

export default function Products() {
  const history = useHistory();
  const query = qs.parse(window.location.search);

  const [productsData, setProductsData] = useState([]);
  const [totalProductsInfo, setTotalProductsInfo] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(query.page) || 1);
  const [perPage, setPerPage] = useState(parseInt(query.pageSize) || 12);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");

  function onChange(page, pageSize) {
    setCurrentPage(page);
    setPerPage(pageSize);

    history.push({
      search: `?page=${page}`,
    });
  }

  function onSearch(value) {
    setSearch(value);
    setCurrentPage(1);
    history.push({
      search: `?page=1`,
    });
  }

  function onSort(value) {
    console.log(`Sort by > ${value}`);
    setSort(value);
    setCurrentPage(1);
    history.push({
      search: `?page=1`,
    });
  }

  useEffect(() => {
    const fetchProducts = () => {
      const queryString = qs.stringify({
        page: currentPage,
        perPage,
        search,
        sort,
      });

      getProducts(queryString)
        .then((res) => res.json())
        .then(({ data }) => {
          setTotalProductsInfo(data);
          setProductsData(data.products);
        });
    };
    fetchProducts();
  }, [currentPage, perPage, search, sort]);

  return (
    <div>
      <MainHeader name="all products" sub="home - shop - products" />
      <MainContainer>
        {productsData.length ? (
          <div>
            <ProductMenu />
            <br />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                {/* sort menu */}
                <span style={{ marginRight: "10px" }}>Sort By:</span>
                <Select
                  defaultValue="createdAt"
                  style={{ width: 200 }}
                  onChange={onSort}
                >
                  <Option value="createdAt">Product added</Option>
                  <Option value="name">Name</Option>
                  <Option value="price">Price</Option>
                </Select>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* search bar */}
                  <Search
                    placeholder="Search products"
                    onSearch={onSearch}
                    enterButton
                    allowClear="true"
                    style={{ width: "300px" }}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <br />

            {/* all products list */}
            <Row gutter={[16, 16]}>
              {productsData.map((product) => {
                return (
                  <Col xxl={6} xl={6} md={8} sm={12} xs={12} key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <CardItem
                        title={product.name}
                        src={product.productImage[0].path}
                        price={product.price}
                        discount={product.offer && product.offer.discount}
                      />
                    </Link>
                  </Col>
                );
              })}
            </Row>
            <Pagination
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "50px",
              }}
              showQuickJumper
              defaultCurrent={1}
              showSizeChanger={false}
              current={currentPage}
              onChange={onChange}
              defaultPageSize={totalProductsInfo.perPage || 10}
              pageSize={perPage || 10}
              total={totalProductsInfo.productCount}
              showTotal={(total, range) =>
                `${range[0]} to ${range[1]} of ${total} Products`
              }
            />
          </div>
        ) : (
          <div style={{ marginTop: "1em" }}>
            <Skeleton active />
          </div>
        )}
      </MainContainer>
    </div>
  );
}
