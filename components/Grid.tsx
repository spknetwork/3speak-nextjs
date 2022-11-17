import styled from "styled-components";

export const Grid = styled.div`
  display: grid
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 50px
  grid-gap: 5px
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Col = styled.div`
  flex: ${(props: { size: number }) => props.size}
`

export const VideoCol = styled(Col)`
  margin: 5px 5px;
  width: 340px;
  word-wrap: break-work;
`