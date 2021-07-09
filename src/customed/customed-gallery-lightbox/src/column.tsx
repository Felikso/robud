import styled, { css } from 'styled-components'

interface ColProps {
  md: number
  width: number
}

const Col = styled.div<ColProps>`
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;

`

export default Col
