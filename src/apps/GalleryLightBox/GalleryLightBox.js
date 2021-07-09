import React from 'react'
import PropTypes from "prop-types";
import styled from 'styled-components'

import Gallery from '../customed-gallery-lightbox/src/index.tsx'


function GalleryLightBox({ images }) {

  const lightboxOptions = {
    imageLoadErrorMessage: 'Przepraszamy, wystąpił problem ze zdjęciem, proszę odświeżyć stronę',
    nextLabel: 'Następne zdjęcie',
    prevLabel: 'Poprzednie zdjęcie',
    zoomInLabel: 'Przybliż',
    zoomOutLabel: 'Oddal',
    closeLabel: 'Zamknij',
  }

  // Add callback to Lightbox onCloseRequest

  const onClose = () => {
    console.log('Galeria została zamknięta')
  }


  const CustomWrapper = ({ children, onClick }) => (
    <GalleryLightBoxContainer onClick={onClick} >
      {children}
    </GalleryLightBoxContainer>
  )

  CustomWrapper.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
  };

  CustomWrapper.defaultProps = {
    children: null,
    onClick: null,

  };

  return (
    <>
      <Gallery
        images={images}
        lightboxOptions={lightboxOptions}
        onClose={onClose}
        rowMargin={0}
        colWidth={100}
        mdColWidth={100}
        customWrapper={CustomWrapper}

      />

    </>
  )
}

GalleryLightBox.propTypes = {
  images: PropTypes.any,
};



GalleryLightBox.defaultProps = {
  images: null,

};

export default GalleryLightBox


const GalleryLightBoxContainer = styled.div`
      width: 100%;
      cursor: pointer;
      margin: 0;
      transition: 1s;
      &:hover {
        filter: brightness(1.25);
      }
      @media (min-width: 900px) {
        width: 100%;
        margin: 0;
      }
`