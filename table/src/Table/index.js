import React from 'react'
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import uuid from 'uuid';

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
const ContentContainer = styled.div`

`
const TableContainer = styled.div`
  padding: 20px;
  margin: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  -moz-box-shadow: 0 0 3px #ccc;
  -webkit-box-shadow: 0 0 3px #ccc;
  box-shadow: 0 0 20px #ccc;
`
const ColumnHeader = styled.div`
  font-weight: bold;
  cursor: pointer;
  text-align: left;
`
const DataColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Data = styled.div`
  text-align: left;
  color: grey;
  margin-top: 10px;
`
const NavContainer = styled.div`
  margin: 20px;
  margin-top: 30px;
  display: flex;
`
const Button = styled.div`
  width: 100px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #4CD8FE;
  font-weight: bold;
  cursor: pointer;
`

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIdx: 0,
      lastPageIdx: null,
      dataReady: false,
      nextUrl: null,
      dataArray: [],
      memoizedContent: {},
      columnNames: [],
      activeSort: null,
      ascendSort: true 
    };
  }

  componentDidMount(){
    fetch("https://swapi.co/api/people/")
    .then(res => res.json())
    .then(parsedRes => {
      // If table should be truly generic (no pre-existing awareness of fields whatsoever), data should be left unfiltered
      const dataArray = this.filterData(parsedRes.results);
      // Set page limit
      const lastPageIdx = Math.ceil(parsedRes.count / parsedRes.results.length) - 1;
      // create keys array to serve as column names
      const columnNames = Object.keys(dataArray[0]);


      this.setState({
        dataArray,
        columnNames,
        lastPageIdx,
        nextUrl: parsedRes.next,
        dataReady: true,
        memoizedContent: {
          0: dataArray
        }
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
      const filteredData = (({ name, height, mass, hair_color, eye_color, created, edited }) => ({ name, height, mass, hair_color, eye_color, created: this.parseDate(created), edited: this.parseDate(edited) }))(data);

      returnArray.push(filteredData);
    })

    return returnArray;
  }

  nextHandler = () => {
    const nextIdx = this.state.pageIdx + 1;

    if(this.state.memoizedContent[nextIdx]){
      this.setState({
        dataArray: this.state.memoizedContent[nextIdx],
        pageIdx: nextIdx,
        activeSort: null,
        ascendSort: true
      });
    } else {
      this.setState({
        dataReady: false
      }, () => {
        fetch(this.state.nextUrl)
        .then(res => res.json())
        .then(parsedRes => {
          const dataArray = this.filterData(parsedRes.results);
          const nextUrl = parsedRes.next ? parsedRes.next : null;     
          
          this.setState({
            dataArray,
            nextUrl,
            pageIdx: nextIdx,
            memoizedContent: {
              ...this.state.memoizedContent,
              [nextIdx]: dataArray
            },
            dataReady: true,
            activeSort: null,
            ascendSort: true
          })
        })
        .catch(err => {
          console.log(err);
        })
      })
    }
  }

  prevHandler = () => {
    const prevIdx = this.state.pageIdx - 1;

    this.setState({
      pageIdx: prevIdx,
      dataArray: this.state.memoizedContent[prevIdx],
      activeSort: null,
      ascendSort: true
    })
  }

  parseDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  }

  generateColumnHeaders = () => {
    const columnHeaders = this.state.columnNames.map((name, idx) => {
      let arrow = null;
      if(this.state.activeSort === name){
        arrow = this.state.ascendSort ? "▼" : "▲";
      }

      return (
        // use field value(name) as key, to filter by field name rather than relying on array index in generateContent function. 
        <ColumnHeader
          key={name}
          onClick={() => this.sortByColumn(name)}
        >
          {this.capitalCase(name)}
          <span style={{marginLeft: 10}}>{arrow}</span>
        </ColumnHeader>
      )
    });

    return columnHeaders;
  }

  capitalCase = (words) => {
    return words.split("_").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  }

  sortByColumn = (name) => {
    let ascendSort;
    if(name === this.state.activeSort){
      ascendSort = this.state.ascendSort ? false : true;
    } else {
      ascendSort = true;
    }

    this.setState({
      activeSort: name,
      ascendSort: ascendSort
    });
  }

  sortData = () => {
    const sortBy = this.state.activeSort;
    const dataArray = this.state.dataArray;
    const sampleVal = dataArray[0][sortBy];

    let sortedData;
    // Test for pure number value
    if(/^\d+$/.test(sampleVal)){
      sortedData = this.sortNum(dataArray, sortBy);
    } else if(sortBy === "created" || sortBy === "edited"){
      sortedData = this.sortDate(dataArray, sortBy);
    } else {
      sortedData = this.sortString(dataArray, sortBy)
    }
    
    return sortedData;
  }

  baseSort = (a, b) => {
    if(a < b) { return this.state.ascendSort ? -1 : 1; }
    if(a > b) { return this.state.ascendSort ? 1 : -1; }
    return 0;
  }

  sortNum = (dataArray, sortBy) => {
    const sortedData = dataArray.sort((a, b) => {
      return this.baseSort(Number(a[sortBy]), Number(b[sortBy]));
    });

    return sortedData;
  }

  sortDate = (dataArray, sortBy) => {
    const sortedData = dataArray.sort((a, b) => {
      return this.baseSort(new Date(a[sortBy]), new Date(b[sortBy]));
    })

    return sortedData;
  }

  sortString = (dataArray, sortBy) => {
    const sortedData = dataArray.sort((a, b) => {
      return this.baseSort(a[sortBy], b[sortBy]);
    })

    return sortedData;
  }

  generateContent = (columnHeaders, dataArray) => {
    const dataObject = {};

    columnHeaders.forEach(header => {
      dataObject[header.key] = [header];
    })

    dataArray.forEach(data => {
      for(let key in data){
        dataObject[key].push(
          <Data key={uuid.v4()}>
            {data[key]}
          </Data>
        )
      }
    })

    const returnArray = [];

    for(let key in dataObject){
      returnArray.push(
        <DataColumnContainer key={uuid.v4()}>
          {dataObject[key]}
        </DataColumnContainer>
      )
    }
    
    return returnArray;
  }

  generateNavContent = () => {
    let prevButton, nextButton;
    
    if(this.state.pageIdx > 0){
      prevButton = (
        <Button data-test="prev-button" onClick={this.prevHandler}>Prev</Button>
      )
    }
    if(this.state.pageIdx < this.state.lastPageIdx){
      nextButton = (
        <Button data-test="next-button" onClick={this.nextHandler}>Next</Button>
      )
    }

    // Logic for placement of prev/next buttons on page
    let navKlass = {justifyContent: 'space-between'};
    if(this.state.lastPageIdx === this.state.pageIdx){
      navKlass = {justifyContent: 'flex-start'};
    } else if(this.state.pageIdx === 0){
      navKlass = {justifyContent: 'flex-end'};
    }

    return (
      <NavContainer
        style={navKlass}
      >
        {prevButton}
        {nextButton}
      </NavContainer>
    )
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
      const columnHeaders = this.generateColumnHeaders();
      let dataArray = this.state.dataArray;
      
      if(this.state.activeSort){
        dataArray = this.sortData();
      }

      const tableContent = this.generateContent(columnHeaders, dataArray);
      const navContent = this.generateNavContent();

      mainContent = (
        <ContentContainer>
          {navContent}
          <TableContainer>
            {tableContent}
          </TableContainer>
        </ContentContainer>
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