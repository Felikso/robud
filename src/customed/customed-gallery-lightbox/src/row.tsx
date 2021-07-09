import styled, { css } from 'styled-components'

interface RowProps {
  margin: number
}

const Row = styled.div<RowProps>`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;

    @media (max-width: 576px){
      grid-template-columns: 1fr;
    }
  ${(props) => {
    return css`
      margin-right: ${props.margin}px;
      margin-left: ${props.margin}px;
    `
  }}
`
export default Row
