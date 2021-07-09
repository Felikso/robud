/* global object */

import React, { FC, useState } from 'react'
import PropTypes from "prop-types";
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import Lightbox from 'react-image-lightbox'
import styled from 'styled-components'
import * as LightboxCSS from 'react-image-lightbox/style.css'
import Row from './row.tsx'
import ImageColWrapper from './image-col-wrapper.tsx'
import ImageUnderCaptionName from './img-under-caption-name.tsx'
import ImageUnderCaptionSize from './img-under-caption-size.tsx'
import ImageUnderCaptionBox from './img-under-caption-box.tsx'



interface ImageProp {
  full: IGatsbyImageData,
  thumb: IGatsbyImageData,
  thumbAlt?: string,
  title?: string,
  caption?: string,
  underCaptionName?: string,
  underCaptionSize?: string,
}

interface GalleryProps {

  images: ImageProp[],
  colWidth?: number,
  mdColWidth?: number,
  rowMargin?: number,
  gutter?: string,
  textAlign?: string,
  imgClass?: string,
  lightboxOptions?: object,
  fontColorName?: string,
  onClose?: () => void,
  customWrapper?: React.FC,
}

const StyledLightbox = styled(Lightbox)`
  ${LightboxCSS}
`

const Gallery: FC<GalleryProps> = ({
  images = [],
  colWidth = 100,
  mdColWidth = 100,
  gutter = '0',
  textAlign = 'center',
  rowMargin = 0,
  imgClass = '',
  lightboxOptions = {},
  fontColorName = 'black',
  fontColorSize = 'black',
  onClose = () => { },
  customWrapper = ImageColWrapper,
}) => {
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const prevIndex = (index + images.length - 1) % images.length
  const nextIndex = (index + images.length + 1) % images.length
  const ImgColWrapper = customWrapper

  // URLs for full width images
  const mainSrc = images[index]?.full?.images?.fallback?.src
  const nextSrc = images[nextIndex]?.full?.images?.fallback?.src
  const prevSrc = images[prevIndex]?.full?.images?.fallback?.src

  const onCloseLightbox = () => {
    onClose()
    setIsOpen(false)
  }

  return (
    <>
      <Row margin={rowMargin}>
        {images.map((img, imgIndex) => {
          const thumbImage = getImage(img.thumb)
          if (!thumbImage) {
            return null
          }
          return (
            <ImgColWrapper
              colWidth={colWidth}
              mdColWidth={mdColWidth}
              key={colWidth}
              onClick={() => {
                setIsOpen(true)
                setIndex(imgIndex)
              }}
              gutter={gutter}
              style={{ width: '100%' }}
            >
              <StyledGatsbyImage
                image={thumbImage}
                className={imgClass}
                alt={img.thumbAlt || ''}
              />
              <ImageUnderCaptionBox textAlign={textAlign}>
                <ImageUnderCaptionName fontColorName={fontColorName}>{img.underCaptionName}</ImageUnderCaptionName>
                <ImageUnderCaptionSize fontColorSize={fontColorSize}>{img.underCaptionSize}</ImageUnderCaptionSize>
              </ImageUnderCaptionBox>
            </ImgColWrapper>
          )
        })}

      </Row>
      {isOpen && (
        <StyledLightbox
          mainSrc={mainSrc || ''}
          nextSrc={nextSrc || ''}
          prevSrc={prevSrc || ''}
          onCloseRequest={onCloseLightbox}
          onMovePrevRequest={() => setIndex(prevIndex)}
          onMoveNextRequest={() => setIndex(nextIndex)}
          imageTitle={images[index].title}
          imageCaption={images[index].caption}
          {...lightboxOptions}
        />
      )}
    </>
  );
};

Gallery.propTypes = {
  images: PropTypes.array,
  colWidth: PropTypes.number,
  mdColWidth: PropTypes.number,
  gutter: PropTypes.string,
  textAlign: PropTypes.string,
  rowMargin: PropTypes.number,
  imgClass: PropTypes.string,
  lightboxOptions: PropTypes.object,
  fontColorName: PropTypes.string,
  fontColorSize: PropTypes.string,
  onClose: PropTypes.func,
  customWrapper: PropTypes.any,

};

Gallery.defaultProps = {
  images: null,
  colWidth: null,
  mdColWidth: null,
  gutter: '',
  textAlign: '',
  rowMargin: null,
  imgClass: '',
  lightboxOptions: null,
  fontColorName: '',
  fontColorSize: '',
  onClose: null,
  customWrapper: null,
};


export default Gallery


const StyledGatsbyImage = styled(GatsbyImage)`
  width: 100% !important;
`
