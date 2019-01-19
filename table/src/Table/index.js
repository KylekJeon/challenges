import React from 'react'
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const PageContainer = styled.div`
  width: 100%;
`

const LoaderContainer = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  border: 1px solid black;
  background: gray;
  padding: 16px;
`
const ColumnHeader = styled.div`
  font-weight: bold;
`

const ColumnHeaderContainer = styled.div`

`

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIdx: 0,
      dataReady: false,
      nextUrl: null,
      dataArray: [],
      columnNames: [],
      activeSort: null
    };
  }

  componentDidMount(){
    fetch("https://swapi.co/api/people/")
    .then(res => res.json())
    .then(parsedRes => {
      // If table should be truly generic (no pre-existing awareness of fields whatsoever), data should be left unfiltered
      const dataArray = this.filterData(parsedRes.results);
      // create keys array to serve as column names
      const columnNames = Object.keys(dataArray[0]);

      this.setState({
        dataArray,
        columnNames,
        nextUrl: parsedRes.next,
        activeSort: columnNames[0]
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  filterData = (dataArray) => {
    const returnArray = [];
    
    // Select the specific data/columns that you want to display on table using object destructuring and property shorthand
    dataArray.forEach(data => {
      const filteredData = (({ name, height, mass, hair_color, eye_color, created, edited }) => ({ name, height, mass, hair_color, eye_color, created, edited }))(data);

      returnArray.push(filteredData);
    })

    return returnArray;
  }

  generateColumnNamesRow = () => {
    const columnHeaders = this.columnNames.map(name => (
      <ColumnHeader
        onClick={(name) => this.sortByColumn(name)}
      >
        {name}
      </ColumnHeader>
    ))

    return (
      <ColumnHeaderContainer>
        {columnHeaders}
      </ColumnHeaderContainer>
    )
  }

  sortByColumn = (name) => {
    this.setState({
      
    })
  }

  render() {
    let mainContent = (
      <LoaderContainer>
        <Loader 
          type="Puff"
          color="#00BFFF"
          height="200"	
          width="200"
        />   
      </LoaderContainer>
    )

    if(this.state.dataReady){
      const columnNamesRow = this.generateColumnNamesRow();
      
      mainContent = (
        <Container>
          {columnNamesRow}
        </Container>
      )
    }

    return (
      <PageContainer>
        {mainContent}
      </PageContainer>
    );
  }
}

export default Table;
