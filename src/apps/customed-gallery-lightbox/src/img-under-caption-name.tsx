import styled from 'styled-components'

interface ImgUnderCaptionNameStyle {
  fontSize?: string,
  fontWeight?: string,
  fontColorName?: string,

}

const ImgUnderCaptionName = styled.h6<ImgUnderCaptionNameStyle>`
  font-size: ${(props) => props.fontSize};
  font-wegiht: ${(props) => props.fontWeight};
  color: ${(props) => props.fontColorName};
`

export default ImgUnderCaptionName
