import React from "react";
import PropTypes from "prop-types";
import PageSection from "components/PageSection";

import SectionHeader from "components/SectionHeader"

import { Row, Col } from "bootstrap"



const PolicySection = ({ className, frontmatter, html }) => {
    if (!frontmatter) {
        return null;
    }

    const { header: rootHeader, subheader: rootSubHeader } = frontmatter;

    return (
        <p>XDDD</p>
        /*         <PageSection className={className}>
                    <Row className="box-shadow mx-2 mx-md-5 my-5">
                        <Col md={12} className="p-5" >
                            <Row >
                                <SectionHeader header={rootHeader} subheader={rootSubHeader} />
                            </Row>
                            <Row  >
                                <div dangerouslySetInnerHTML={{ __html: html }} />
                            </Row>
                        </Col>
                    </Row>
                </PageSection> */
    );
};

PolicySection.propTypes = {
    className: PropTypes.string,
    frontmatter: PropTypes.object,
    html: PropTypes.string,
};

PolicySection.defaultProps = {
    className: null,
    frontmatter: null,
    html: null,
};

export default PolicySection;
