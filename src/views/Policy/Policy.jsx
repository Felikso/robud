import React from "react";
import PropTypes from "prop-types";

import { Row } from "react-bootstrap";

import SectionHeader from "components/SectionHeader"

import PageSection from "components/PageSection";


const Policy = ({ frontmatter, html }) => {
  if (!frontmatter) {
    return null;
  }

  const { header: rootHeader, subheader: rootSubHeader } = frontmatter;

  return (
    <PageSection className="p-3 p-md-5">

      <Row className="my-3 px-md-5">
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>

      <Row className="my-3 px-md-5">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Row>

    </PageSection>



  );
};

Policy.propTypes = {
  frontmatter: PropTypes.object,
  html: PropTypes.string,
};

Policy.defaultProps = {
  frontmatter: null,
  html: null,
};

export default Policy;
