import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

import Image from "components/Image";
import SvgIcon from "components/SvgIcon";

const SupplierCard = ({ href, btn, imageFileName, header, icon, subheader }) => {
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
        <Card className="h-100 w-100 bg-lightgray p-3 px-4 p-md-5 box-shadow">
            {iconPart}
            {imagePart}
            {svgPart}
            <h4 className="service-item-heading text-primary">{header}</h4>
            <h5 className="my-3"><small>{subheader}</small></h5>
            <a href={href} ><Button variant="primary">{btn}</Button></a>
        </Card>
    );
};

SupplierCard.propTypes = {
    icon: PropTypes.string,
    imageFileName: PropTypes.string,
    header: PropTypes.string,
    subheader: PropTypes.string,
    btn: PropTypes.string,
    href: PropTypes.string,
};

SupplierCard.defaultProps = {
    icon: null,
    imageFileName: null,
    header: "",
    subheader: "",
    btn: "",
    href: "",
};

export default SupplierCard;
