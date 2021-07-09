import React from "react";
import PropTypes from "prop-types";

import { Col } from "react-bootstrap";

import "./Footer.scss"


const Footer = ({ frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const {
    copyright,
    copyrightHref,
    privacyHref,
    privacyText,
  } = frontmatter;

  return (
    <footer className="footer py-2">

      <Col className="text-center text-md-right d-flex flex-column flex-md-row justify-content-end">
        <a className="footer-link" href={privacyHref}>
          {privacyText}
        </a>
        <a className="bg-primary text-dark footer-link mx-md-3" href={copyrightHref}>{copyright}</a>
      </Col>

    </footer>
  );
};

Footer.propTypes = {
  frontmatter: PropTypes.object,
};

Footer.defaultProps = {
  frontmatter: null,
};

export default Footer;
