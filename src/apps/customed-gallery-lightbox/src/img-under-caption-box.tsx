import styled from 'styled-components'

interface ImgUnderCaptionBoxStyle {
  fontSize?: string,
  fontWeight?: string,
  fontColor?: string,
  textAlign?: string,

}

const ImgUnderCaptionBox = styled.h6<ImgUnderCaptionBoxStyle>`
  font-size: ${(props) => props.fontSize};
  font-wegiht: ${(props) => props.fontWeight};
  color: ${(props) => props.fontColor};
  text-align: ${(props) => props.textAlign};
`

export default ImgUnderCaptionBox
