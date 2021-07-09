import React from "react";
import PropTypes from "prop-types";

import Image from "components/Image";
import SvgIcon from "components/SvgIcon";
import "./ServiceItem.scss";

import { Card } from "react-bootstrap";

const ServiceItem = ({ imageFileName, header, icon }) => {
  let iconPart;


  let imagePart;
  if (imageFileName) {
    imagePart = <Image className="service-item-image" fileName={imageFileName} />;
  }
  let svgPart;
  if (icon) {
    svgPart = <SvgIcon className="service-item-icon-box" fileName={icon} alt={header} />;
  }

  return (
    <Card className="h-100 w-100 bg-lightgray p-2 p-md-5 box-shadow">
      {iconPart}
      {imagePart}
      {svgPart}
      <h4 className="service-item-heading span-dark text-primary">{header}</h4>
    </Card>
  );
};

ServiceItem.propTypes = {
  icon: PropTypes.string,
  imageFileName: PropTypes.string,
  header: PropTypes.string,
};

ServiceItem.defaultProps = {
  icon: null,
  imageFileName: null,
  header: "",
};

export default ServiceItem;
