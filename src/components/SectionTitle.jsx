import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Col } from "react-bootstrap";
import "./SectionTitle.scss";

const SectionTitle = ({ header, subheader, className, ...restProps }) => {
  const subheaderPart = subheader ? (
    <h3 className="section-subheading">{subheader}</h3>
  ) : null;

  return (
    <Col lg={12} className={clsx("section-title", "text-center", "m-3", className)} {...restProps}>
      <h2 className="section-heading text-uppercase">{header}</h2>
      {subheaderPart}
    </Col>
  );
};

SectionTitle.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  className: PropTypes.string,
};

SectionTitle.defaultProps = {
  header: "",
  subheader: "",
  className: null,
};

export default SectionTitle;
