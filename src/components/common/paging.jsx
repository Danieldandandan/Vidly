import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Paging = ({ itemCount, pageSize, onClick, currentPage }) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount == 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li className={page == currentPage ? "page-item active" : "page-item "} key={page}>
            <a className="page-link" onClick={() => onClick(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paging.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Paging;
