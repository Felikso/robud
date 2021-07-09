import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";
import SvgIcon from "components/SvgIcon";
import ContactForm from "components/ContactForm";

import "./Contact.scss"

const Contact = ({ frontmatter, html, phone, phoneCode, mail }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, brand, logoSvgFileName, contactForm, header: rootHeader, subheader: rootSubHeader } = frontmatter;

  return (
    <>
      <PageSection className="dark-section p-5" id={anchor}>
        <Row >
          <SectionHeader header={rootHeader} subheader={rootSubHeader} />
        </Row>
        <Row className="my-3">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Row>
        <ContactForm frontmatter={frontmatter} contactForm={contactForm} />
        <Row className="dark-section d-flex flex-column flex-md-row ">
          <Col md={8} className="text-left d-flex flex-column">

            <a href={`tel:${phoneCode}${phone}`} className="link-primary my-5"><h5>{phoneCode} {phone}</h5></a>

            <a href={`mailto:${mail}`} className="link-primary"><h5>{mail}</h5></a>
          </Col>

          <Col md={4}>
            <SvgIcon className="brand-svg-contact-icon" fileName={logoSvgFileName} alt={brand} />
          </Col>

        </Row>

      </PageSection>

    </>
  );
};

Contact.propTypes = {
  frontmatter: PropTypes.object,
  html: PropTypes.string,
  phone: PropTypes.string,
  phoneCode: PropTypes.string,
  mail: PropTypes.string,
};

Contact.defaultProps = {
  frontmatter: null,
  html: null,
  phone: null,
  phoneCode: null,
  mail: null,
};

export default Contact;
