import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import { Row, Col, Pagination, Skeleton } from "antd";
import styles from "../../components/blogs/BlogList.module.css";
import BlogCard from "../../components/blogs/BlogCard";
import HeaderSection from "../../components/styled-components/HeaderSection";
import MainContainer from "../../components/layout/MainContainer";
import { getBlogs } from "../../client/blogs.client";

export default function Blogs() {
  const history = useHistory();
  const query = qs.parse(window.location.search);

  const [blogData, setBlogData] = useState([]);
  const [totalBlogInfo, setTotalBlogInfo] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(query.page) || 1);
  const [perPage, setPerPage] = useState(parseInt(query.pageSize) || 4);
  const [search, setSearch] = useState("");

  function onChange(page, pageSize) {
    setCurrentPage(page);
    setPerPage(pageSize);

    history.push({
      search: `?page=${page}`,
    });
  }

  const fetchBlogs = () => {
    const queryString = qs.stringify({
      page: currentPage,
      perPage,
      search,
    });

    getBlogs(queryString)
      .then((res) => res.json())
      .then(({ data }) => {
        setBlogData(data.blogs);
        setTotalBlogInfo(data);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, perPage]);
  return (
    <>
      <MainContainer>
        <div style={{ marginTop: "1rem" }}>
          <HeaderSection headerText="Latest news" />
          {blogData.length ? (
            <div className={styles.container}>
              <Row gutter={[32, 32]}>
                {blogData.map((blog) => (
                  <Col key={blog.id} sm={24} md={12} lg={12}>
                    <BlogCard
                      id={blog.id}
                      imageSrc={blog.path}
                      title={blog.title}
                      description={blog.description}
                      date={new Date().toDateString()}
                      author={blog.author}
                      category={""}
                    />
                  </Col>
                ))}
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
                defaultPageSize={totalBlogInfo.perPage || 4}
                pageSize={perPage || 4}
                total={totalBlogInfo.blogCount}
                showTotal={(total, range) =>
                  `${range[0]} to ${range[1]} of ${total} Blogs`
                }
              />
            </div>
          ) : (
            <div style={{ marginTop: "1em" }}>
              <Skeleton active />
            </div>
          )}
        </div>
      </MainContainer>
    </>
  );
}
