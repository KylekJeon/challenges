import React from 'react';
import Table from './Table'
import './App.css';
import {isEmpty} from 'lodash';

class App extends React.Component {
  state = {
    rows: null,
    columns: null,
  }

  fetchData = () => {
    return fetch('/api/people');
  }

  processColumnNames = columns => {
    return columns.map(column => {
      // remove the underscore 
      return column.split('_').join(' ');
    })
  }

  componentDidMount() {
    if (isEmpty(this.props)) {
      // fetch the data if no props
      this.fetchData()
      .then(resp => resp.json())
      .then(data => {
        const columns  = this.processColumnNames(Object.keys(data.results[0]));
        const rows = data.results;
        
        this.setState({
          columns,
          rows,
        })
      });
    }
  }

  render() {
    const { rows, columns } = this.state;
    return (
      <div className="App">
        <Table rows={rows} columns={columns} />
      </div>
    );
  }
}

export default App;
