import React from "react";
import PropTypes from "prop-types";

import { Row, Col, Button } from "react-bootstrap";
import TimelineItem from "components/TimelineItem";
import SectionHeader from "components/SectionHeader";
import SectionTitle from "components/SectionTitle";
import SupplierCard from "components/SupplierCard";
import PageSection from "components/PageSection";
import nl2br from "utils/nl2br";

import Image from "components/Image"
import MapLocationApp from "components/MapLocationApp";

import { ReactComponent as PhoneIcon } from "content/assets/images/svgs/phone-square.svg"

import "./About.scss";

const About = ({ className, frontmatter, html, phone, phoneCode, mail }) => {
  if (!frontmatter) {
    return null;
  }

  const { btn, contactUsHeader, imageMain, anchor, header: rootHeader, subheader: rootSubHeader, secondHeader: rootTitle, secondSubhader: rootSubtitle, timeline, suppliers, icon, mapLocation } = frontmatter;

  return (
    <PageSection className={className} id={anchor}>
      <Row className="box-shadow mx-2 mx-md-5 my-5">
        <Col md={8} className="p-5" >
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


        {suppliers.map((supplier) => (
          <Col lg={4} className="d-flex text-center mt-5 mb-5" key={supplier.header}>
            <SupplierCard {...supplier} />
          </Col>
        ))}


      </Row>

      <MapLocationApp className="map-item-icon-box" fileName={icon} appObject={mapLocation} alt="map" />

      <Row className="dark-section text-center p-3 p-md-5 d-flex flex-column flex-md-row ">
        <Col md={8} className="text-left d-flex justify-content-start flex-column">
          <h5 className="text-light mb-5">{contactUsHeader}</h5>

          <a href={`tel:${phoneCode}${phone}`} className="link-primary my-3"><h4>{phoneCode} {phone}</h4></a>

          <a href={`mailto:${mail}`} className="link-primary my-3"><h4>{mail}</h4></a>
        </Col>


        <Col md={4} className="text-center d-flex align-items-end justify-content-end">
          <Button type="button" className="btn-lg"><strong>{btn}<PhoneIcon className="ml-2" /></strong></Button>
        </Col>

      </Row>



      <Row className="box-shadow mx-2 mx-md-5 my-5">
        <Col lg={12} className="py-5">
          <ul className="timeline">
            {timeline.map(({ content, header, imageContent, imageFileName, subheader, number }, ind) => (
              <TimelineItem
                invert={ind % 2 === 1}
                key={header}
                imageFileName={imageFileName}
                header={header}
                number={number}
                subheader={subheader}
                content={content}
                imageContent={
                  imageContent ? (
                    <div dangerouslySetInnerHTML={{ __html: `<h4>${nl2br(imageContent)}</h4>` }} />
                  ) : null
                }
              />
            ))}
          </ul>
        </Col>
      </Row>
    </PageSection>
  );
};

About.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
  html: PropTypes.string,
  phone: PropTypes.string,
  phoneCode: PropTypes.string,
  mail: PropTypes.string,
};

About.defaultProps = {
  className: null,
  frontmatter: null,
  html: null,
  phone: null,
  phoneCode: null,
  mail: null,
};

export default About;
