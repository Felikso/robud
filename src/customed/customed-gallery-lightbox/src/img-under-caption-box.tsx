import styled from 'styled-components'

interface ImgUnderCaptionBox {
  fontSize?: string
  fontWeight?: string
  fontColor?: string
  textAlign?: string

}

const ImgUnderCaptionBox = styled.h6<ImgUnderCaptionBox>`
  font-size: ${(props) => props.fontSize};
  font-wegiht: ${(props) => props.fontWeight};
  color: ${(props) => props.fontColor};
  text-align: ${(props) => props.textAlign};
`

export default ImgUnderCaptionBox
