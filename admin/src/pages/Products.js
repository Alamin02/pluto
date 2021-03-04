import React from "react";
import {
  Table,
  Input,
  Tag,
  Space,
  Button,
  Popconfirm,
  message,
  Typography,
  Row,
  Col,
  Modal,
} from "antd";
import Highlighter from "react-highlight-words";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  ClearOutlined,
} from "@ant-design/icons";

import ProductForm from "../components/ProductForm";
import sampleProductData from "../assets/data/sampleProductData";

const { Title } = Typography;
const deleteMessage = "Sure to delete?";
const yellowColor = "#FFD747";

// delete button message
function confirmDelete() {
  message.info("Clicked on Yes.");
}

// class component
// functions - modal
// functions - search
// columns - search, sort, actions
// modal
// table

export default class Products extends React.Component {
  state = {
    filteredInfo: null,
    searchText: "",
    searchedColumn: "",
    tableLoading: false,
    loading: false,
    visible: false,
  };

  // functions related to modal
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  // search implementation via "filterDropdown"
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        // highlight searched term - "react-highlight-words"
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  // end of everything related to search

  render() {
    const { visible, loading } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        width: 100,
        // pass the productId as "id" to edit button
        render: (id) => <span>{id}</span>,
      },
      {
        title: "Product Name",
        dataIndex: "productName",
        key: "productName",
        width: 350,

        // search
        ...this.getColumnSearchProps("productName"),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: 150,
      },
      {
        title: "Offer",
        dataIndex: "offer",
        key: "offer",
        width: 150,
        // offer styling
        render: (offer) => {
          if (offer) {
            return <Tag color="green">{offer}</Tag>;
          }
        },
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        width: 150,
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 200,
        // filtering
        filters: [
          { text: "Clothing", value: "clothing" },
          { text: "Electronics", value: "electronics" },
        ],
        // related to filtering
        filteredValue: filteredInfo.category || null,
        onFilter: (value, record) => record.category.includes(value),
        sorter: (a, b) => a.category.length - b.category.length,
        sortOrder: sortedInfo.columnKey === "category" && sortedInfo.order,
        render: (category) => (
          <Tag color="geekblue">{category.toUpperCase()}</Tag>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        width: 200,
      },
      // update, delete action
      {
        title: "Action",
        key: "action",
        fixed: "right",
        width: 230,
        render: (id, record) => (
          <Space size="middle">
            <Button icon={<EditOutlined />} onClick={this.showModal}>
              Edit&nbsp;{record.id}
            </Button>
            {console.log(record.id)}
            {/* pop up when clicked on delete button*/}
            <Popconfirm
              placement="top"
              title={deleteMessage}
              onConfirm={confirmDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <div>
        <Space direction="vertical" size="middle">
          {/* add product button */}
          <Button
            type="primary"
            style={{ textTransform: "capitalize" }}
            icon={<PlusOutlined />}
            onClick={this.showModal}
          >
            add product
          </Button>

          {/* modal */}
          <Modal
            visible={visible}
            title="Add Product"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              // modal buttons
              <Button
                key="back"
                onClick={this.handleCancel}
                style={{ textTransform: "capitalize" }}
              >
                cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={this.handleOk}
                style={{ textTransform: "capitalize" }}
              >
                save product
              </Button>,
            ]}
          >
            <ProductForm />
          </Modal>

          {/* table */}
          <Table
            size="middle"
            // loading={isTableLoading}
            loading={this.state.tableLoading}
            dataSource={sampleProductData}
            columns={columns}
            bordered
            sticky
            scroll={{ y: 1330 }}
            pagination={{ pageSize: 10 }}
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
                <Col>
                  <Button
                    onClick={this.clearAll}
                    icon={<ClearOutlined />}
                    style={{ backgroundColor: yellowColor, color: "black" }}
                  >
                    Clear filters and sorters
                  </Button>
                </Col>
              </Row>
            )}
            footer={() => (
              <div>
                <p>Total products: XX</p>
              </div>
            )}
            onChange={this.handleChange}
          />
        </Space>
      </div>
    );
  }
}

// class component
// functions - modal
// functions - search
// columns - search, sort, actions
// modal
// table
