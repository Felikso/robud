import React from "react";
import PropTypes from "prop-types";

import { Link } from "gatsby"

import { Button } from "react-bootstrap";
import ImageCard from "components/ImageCard";

import "./SmallTop.scss"

const SmallTop = ({ linkBack, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { header, subheader, back, imageFileName } = frontmatter;



  const extraInfoPart = (
    <Link to={linkBack}>
      <Button size="xl" variant="primary" className="text-uppercase">
        {back}
      </Button>
    </Link>
  );


  return (
    <ImageCard
      imageFileName={imageFileName}
      header={header}
      subheader={subheader}
      extraInfo={extraInfoPart}
      className="small-top"
    />
  );
};

SmallTop.propTypes = {
  frontmatter: PropTypes.object,
  linkBack: PropTypes.string.isRequired,
};

SmallTop.defaultProps = {
  frontmatter: null,
};

export default SmallTop;
