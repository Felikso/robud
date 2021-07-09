import styled from 'styled-components'

interface ImgUnderCaptionSize {
  fontSize?: string
  fontWeight?: string
  fontColorSize?: string

}

const ImgUnderCaptionSize = styled.span<ImgUnderCaptionSize>`
  font-size: ${(props) => props.fontSize};
  font-wegiht: ${(props) => props.fontWeight};
  color: ${(props) => props.fontColorSize};
`

export default ImgUnderCaptionSize
