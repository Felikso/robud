import React from "react";
import PropTypes from "prop-types";
import PageSection from "components/PageSection";

import GalleryLightBox from "apps/GalleryLightBox/GalleryLightBox";

const GallerySection = ({ images }) => {


    return (
        <PageSection>
            <GalleryLightBox images={images} />
        </PageSection>

    );
};

GallerySection.propTypes = {
    images: PropTypes.object.isRequired
};

GallerySection.defaultProps = {

};

export default GallerySection;
