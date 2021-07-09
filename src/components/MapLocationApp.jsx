import React, { useState } from "react";
import PropTypes from "prop-types";

import { StaticQuery, graphql } from "gatsby";

import SectionHeader from "components/SectionHeader"
import { Row, Col, Button } from "react-bootstrap";

import { ReactComponent as DeFlag } from "content/assets/images/svgs/flag-de.svg"
import { ReactComponent as PlFlag } from "content/assets/images/svgs/flag-pl.svg"
import { ReactComponent as CzFlag } from "content/assets/images/svgs/flag-cz.svg"

import "./MapLocationApp.scss"

const MapLocationApp = ({ className, appObject }) => {

    const [map, setMap] = useState(0)

    return (
        <StaticQuery
            query={graphql`
      query BaseMapQuery {
        svgs:  allFile {
            edges {
              node {
                relativePath
                name
                childSvg {
                  content {
                    data
                  }
                }
              }
            }
          }
      }
    `}
            render={({ svgs }) => {
                const svg = svgs.edges.find((n) => n.node.relativePath.includes(appObject[map].mapImage));

                if (!svg) {
                    return <p>Przepraszamy wystąpił problem z aplikacją</p>
                }


                const svgElement = svg.node.childSvg.content.data;
                return (
                    <>
                        <Row className="dark-section text-center d-flex justify-content-center align-items-center py-3">
                            <Col md={4}>
                                <Button type="button" aria-label="flag-pl" variant="outline-success" className="border-0" onClick={() => setMap(0)}><PlFlag /></Button>
                                <Button type="button" aria-label="flag-de" variant="outline-success" className="border-0" onClick={() => setMap(1)}><DeFlag /></Button>
                                <Button type="button" aria-label="flag-cz" variant="outline-success" className="border-0" onClick={() => setMap(2)}><CzFlag /></Button>
                            </Col>

                            <Col md={8}>
                                <h5 className="text-light">{appObject[map].mapLocationTitle}{appObject[map].country}</h5>
                            </Col>
                        </Row>
                        <Row className="card-section p-md-5">
                            <SectionHeader header={appObject[map].mapTitle} />
                        </Row>

                        <Row className="card-section p-md-5 map-interface">
                            <Col lg={6}>
                                {
                                    appObject[map].mapLocationApp.map((item) => {
                                        return (
                                            <Col key={item.area[0].region}>
                                                <h3>{item.area[0].region}</h3>
                                                <ul>
                                                    {item.area[0].cities.map((city) => (

                                                        <li key={city}>{city}</li>

                                                    ))}
                                                </ul>

                                            </Col>
                                        )
                                    })
                                }
                            </Col>
                            <Col lg={6} className="map-box">
                                <div className={className} dangerouslySetInnerHTML={{ __html: svgElement }} />
                            </Col>
                        </Row>

                        {/*                         <Row className="card-section p-md-5">

                            {
                                appObject[map].mapLocationApp.map((item) => {
                                    return (
                                        <Col md={6} lg={3} key={item.area[0].region}>
                                            <h3>{item.area[0].region}</h3>
                                            <ul>
                                                {item.area[0].cities.map((city) => (

                                                    <li key={city}>{city}</li>

                                                ))}
                                            </ul>

                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Row className="card-section p-md-5">
                            <Col lg={12} className="d-flex justify-content-center align-items-center">
                                <div className={className} dangerouslySetInnerHTML={{ __html: svgElement }} />
                            </Col>
                        </Row> */}

                    </>
                )
            }}
        />
    )
};

MapLocationApp.propTypes = {
    className: PropTypes.string,
    appObject: PropTypes.array,
};

MapLocationApp.defaultProps = {
    className: null,
    appObject: null,
};

export default MapLocationApp;