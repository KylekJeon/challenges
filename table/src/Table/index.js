import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid black;
  background: gray;
  padding: 16px;
`

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        I'm not a table yet, pls fix me
      </Container>
    );
  }
}

export default Table;
