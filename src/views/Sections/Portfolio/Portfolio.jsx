import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row, Button } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PortfolioItem from "components/PortfolioItem";
import PageSection from "components/PageSection";

import "./Portfolio.scss";

const Portfolio = ({ className, frontmatter }) => {
  const [showedItems, setShowedItems] = useState(3);
  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, portfolios } = frontmatter;




  /*   const chooseRandom = (arr, num = 1) => {
      const res = [];
      for (let i = 0; i < num;) {
        const random = Math.floor(Math.random() * arr.length);
        if (res.indexOf(arr[random]) === -1) {
          res.push(arr[random]);
          i += 1;
        };
  
      };
      return res;
    };
   */
  const portfolioL = portfolios.length

  const loadMore = () => {

    setShowedItems(portfolioL)

  }
  const randomPortoflios = portfolios.slice(0, showedItems)

  return (
    <PageSection className={clsx("portfolio-section", className)} id={anchor}>
      <Row className="px-md-5">
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row className="px-md-5">
        {randomPortoflios.map(
          ({ content, extraInfo, header, imageFileName, imageFileNameDetail, subheader }) => (
            <PortfolioItem
              key={imageFileName}
              imageFileName={imageFileName}
              header={header}
              subheader={subheader}
              content={content}
              imageFileNameDetail={imageFileNameDetail}
              extraInfo={
                <ul>
                  {extraInfo.map((ei) => (
                    <li key={ei}>{ei}</li>
                  ))}
                </ul>
              }
            />
          ),
        )}
      </Row>
      <Row>
        <Button onClick={loadMore} className={portfolioL === showedItems ? "d-none" : "m-auto my-5"}>Zobacz wszystkie</Button>
      </Row>

    </PageSection>
  );
};

Portfolio.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Portfolio.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Portfolio;
