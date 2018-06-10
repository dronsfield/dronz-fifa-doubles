import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  z-index: 0;
  width: 20em;
`

const Input = styled.input`
  font-size: 1em;
  color: inherit;
  padding: 0.5em;
  width: 100%;
  max-width: 100%;
`;

const List = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid ${p => p.theme.color.border};
`

const ListItem = styled.div`
  padding: 1em;

`



export {
  Container,
  Input,
  List,
  ListItem
}