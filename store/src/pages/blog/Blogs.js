import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import { agent } from "../../helpers/agent";


// import BlogList from "../../components/blogs/BlogList";
// import BreadCrumb from "../../components/blogs/BreadCrumb";
import HeaderSection from "../../components/styled-components/HeaderSection";
import MainContainer from "../../components/layout/MainContainer";

export default function Blogs() {
  const history = useHistory();
  const query = qs.parse(window.location.search);
  const [blogsData, setBlogsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(query.page) || 1);
  const [perPage, setPerPage] = useState(parseInt(query.pageSize) || 12);

  const fetchBlogs = ()=> {
    const queryString = qs.stringify({
      page: currentPage,
      perPage,
    });

    agent
      .getBlogs(queryString)
      .then(res => res.json())
      .then(({data}) => {
        setBlogsData(data);
      });
  }

  const onChange = (page, pageSize)=> {
    setCurrentPage(page);
    setPerPage(pageSize);

    history.push({
      search: `?page=${page}`,
    });
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <>
      <MainContainer>
        <div style={{ marginTop: "1rem" }}>
          <HeaderSection headerText="Latest news" />
          {/* <BlogList />
          <BreadCrumb /> */}
          
          <Pagination
          style={{ display: "flex", justifyContent: "center", margin: "50px" }}
          showQuickJumper
          defaultCurrent={1}
          showSizeChanger={false}
          current={currentPage}
          onChange={onChange}
          defaultPageSize={blogsData.perPage || 10}
          pageSize={perPage || 10}
          total={blogsData.blogCount}
          showTotal={(total, range) =>
            `${range[0]} to ${range[1]} of ${total} Products`
          }
        />
        </div>
      </MainContainer>
    </>
  );
}
