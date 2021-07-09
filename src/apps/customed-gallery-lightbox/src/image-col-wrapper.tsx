import React, { FC } from 'react'
import PropTypes from "prop-types";
import Col from './column.tsx'
import ImgWrapper from './img-wrapper.tsx'

interface ImageColWrapperProps {
  colWidth: number,
  mdColWidth: number,
  onClick: () => void,
  gutter: string,
  textAlign: string
}

const ImageColWrapper: FC<ImageColWrapperProps> = ({
  children,
  colWidth,
  mdColWidth,
  onClick,
  gutter,
}) => {
  return (
    <Col width={colWidth} md={mdColWidth} onClick={onClick}>
      <ImgWrapper margin={gutter}>{children}</ImgWrapper>
    </Col>
  );
};

ImageColWrapper.propTypes = {
  colWidth: PropTypes.any,
  mdColWidth: PropTypes.any,
  onClick: PropTypes.any,
  gutter: PropTypes.any,
  children: PropTypes.any,

};

ImageColWrapper.defaultProps = {
  colWidth: null,
  mdColWidth: null,
  onClick: null,
  gutter: null,
  children: null,
};


export default ImageColWrapper
