import React from "react";
import PropTypes from "prop-types";

import { StaticQuery, graphql } from "gatsby";

const SvgIcon = ({ className, fileName }) => (
  <StaticQuery
    query={graphql`
      query BaseSvgIconQuery {
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
      const svg = svgs.edges.find((n) => n.node.relativePath.includes(fileName));

      if (!svg) {
        return null;
      }

      const svgElement = svg.node.childSvg.content.data;

      return <div className={className} dangerouslySetInnerHTML={{ __html: svgElement }} />;
    }}
  />
);

SvgIcon.propTypes = {
  fileName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SvgIcon.defaultProps = {
  className: null,
};

export default SvgIcon;
