import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "react-bootstrap";

import ServiceItem from "components/ServiceItem";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";

import Image from "components/Image";
import SectionTitle from "components/SectionTitle";

const Services = ({ className, frontmatter, html }) => {
  if (!frontmatter) {
    return null;
  }

  const { imageMain, anchor, header: rootHeader, subheader: rootSubHeader, secondHeader: rootTitle, secondSubhader: rootSubtitle, services } = frontmatter;

  return (
    <PageSection className={className} id={anchor}>
      <Row className="box-shadow mx-2 mx-md-5 my-5">
        <Col md={8} className="p-5 order-md-2" >
          <Row  >
            <SectionHeader header={rootHeader} subheader={rootSubHeader} />
          </Row>
          <Row  >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Row>
        </Col>
        <Col md={4} className="p-0">
          <Image fluid className="image-fluid" fileName={imageMain} alt={anchor} />
        </Col>
      </Row>

      <Row className="text-center mx-2 mx-md-5 my-5">

        <SectionTitle header={rootTitle} subheader={rootSubtitle} />


        {services.map((service) => (
          <Col lg={4} className="d-flex text-center mt-5 mb-5" key={service.header}>
            <ServiceItem {...service} />
          </Col>
        ))}


      </Row>

    </PageSection>
  );
};

Services.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
  html: PropTypes.string,
};

Services.defaultProps = {
  className: null,
  frontmatter: null,
  html: null,
};

export default Services;
