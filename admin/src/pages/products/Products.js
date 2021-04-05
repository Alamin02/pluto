import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Table,
  Space,
  Button,
  Popconfirm,
  message,
  Typography,
  Row,
  Col,
  Pagination,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import qs from "query-string";

import { columns } from "./productTableColumn";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import { agent } from "../../helpers/agent";

const { Title } = Typography;
const deleteMessage = "Sure to delete?";

export default function Products() {
  const history = useHistory();
  const query = qs.parse(window.location.search);

  const [totalProductsInfo, setTotalProductsInfo] = useState("");
  const [productData, setProductData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleEditProduct, setVisibleEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(query.page) || 1);
  const [perPage, setPerPage] = useState(parseInt(query.pageSize) || 10);
  const sort = "name";

  const fetchProducts = () => {
    const queryString = qs.stringify({
      page: currentPage,
      perPage,
      sort,
    });

    agent
      .getProducts(queryString)
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data.productCount);
        setTotalProductsInfo(data);
        setProductData(data.products);
        if (selectedProduct)
          setSelectedProduct(
            data.products.find((product) => product.id === selectedProduct.id)
          );
      });
  };

  function onChange(page, pageSize) {
    setCurrentPage(page);
    setPerPage(pageSize);

    history.push({
      search: `?page=${page}`,
    });
  }

  const onCreate = (values) => {
    fetchProducts();
    setVisible(false);
  };

  const onEditProduct = () => {
    setVisibleEditProduct(false);
  };

  const onEdit = (record) => {
    setSelectedProduct(record);
    setVisibleEditProduct(true);
    console.log(record);
  };

  // delete button message
  function confirmDelete(productId) {
    console.log(productId);
    const token = localStorage.getItem("token");
    agent
      .deleteProduct(productId, token)
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          for (let error of res.errors) {
            message.error(error.msg);
          }
        } else {
          message.success("Successfully deleted");
        }
      })
      .then(() => fetchProducts());
  }


  useEffect(() => {
    const fetchProducts = () => {
      const queryString = qs.stringify({
        page: currentPage,
        perPage,
        sort,

      });

      agent
        .getProducts(queryString)
        .then((res) => res.json())
        .then(({ data }) => {
          console.log(data.productCount);
          setTotalProductsInfo(data);
          setProductData(data.products);
          if (selectedProduct)
            setSelectedProduct(
              data.products.find((product) => product.id === selectedProduct.id)
            );
        });
    };
    fetchProducts();
  }, [currentPage, perPage, sort]);

  const actionColumn = {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (id, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            onEdit(record);
          }}
        >
          Edit
        </Button>
        <Popconfirm
          placement="top"
          title={deleteMessage}
          onConfirm={() => confirmDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  };
  return (
    <div>
      <Space direction="vertical" size="middle">
        {/* add product button */}
        <Button
          type="primary"
          style={{ textTransform: "capitalize" }}
          icon={<PlusOutlined />}
          onClick={() => {
            setVisible(true);
          }}
        >
          add product
        </Button>

        <CreateProductModal
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />

        {/* edit product */}
        <EditProductModal
          visible={visibleEditProduct}
          onCreate={onEditProduct}
          existingRecord={selectedProduct}
          onCancel={() => {
            setVisibleEditProduct(false);
          }}
          refetch={fetchProducts}
        />

        {/* table */}
        <Table
          rowKey={(record) => record.id}
          size="middle"
          dataSource={productData}
          columns={[...columns, actionColumn]}
          bordered
          sticky
          scroll={{ y: 1330 }}
          // pagination={{ pageSize: 10 }}
          pagination={false}
          title={() => (
            <Row justify="space-between">
              <Col>
                <Title
                  level={4}
                  style={{ marginBottom: 0, textTransform: "capitalize" }}
                >
                  All products info
                </Title>
              </Col>
              <Col></Col>
            </Row>
          )}
          footer={() => (
            <div>
              <p>Total products: {totalProductsInfo.productCount}</p>
            </div>
          )}
        />
        <Pagination
          style={{ display: "flex", justifyContent: "center", margin: "50px" }}
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
      </Space>
    </div>
  );
}
