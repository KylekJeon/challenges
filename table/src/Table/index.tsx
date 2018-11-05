import React from 'react'
import camelize from 'camelize';
import './style.css';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { pick, isNull } from 'lodash';

export default class Table extends React.Component {
  state = {
    rows: null,
    columns: null,
    validHeaders: ['name', 'height', 'hairColor', 'eyeColor', 'created', 'edited'],
    isAscending: true,
  }

  fetchData = () => {
    return fetch('/api/people');
  }

  processFetchData = (data) => {
    const results = data.results;
    return results.map(result => {
      result.created = new Date(result.created).toLocaleDateString();
      result.edited = new Date(result.edited).toLocaleDateString();
      return pick(result, this.state.validHeaders);
    });
  }

  componentDidMount() {
    // fetch data if rows and cols are not there
    if (!this.state.rows && !this.state.columns) {
      this.fetchData()
      .then(resp => resp.json())
      .then(data => camelize(data))
      .then(data => {
        const processedData = this.processFetchData(data);
        const columns  = Object.keys(processedData[0]);
        const rows = processedData;
        
        this.setState({
          columns,
          rows,
        })
      });
    }
  }

  onHeaderClick = (colName: string) => {
    // sort by the colName
    this.setState((prev: any) => {
      return {
        isAscending: !prev.isAscending, 
        rows: prev.rows.sort((a, b) => {
            // ignore the case when compairing
            const stringA = a[colName].toString().toUpperCase();
            const stringB = b[colName].toString().toUpperCase();
            const toggle = prev.isAscending ? 1 : -1;
            
            if (stringA < stringB) {
              return -1 * toggle;
            }
            if (stringA > stringB) {
              return 1 * toggle;
            }
            return 0;
        }),
      }
    });
  }

  render() {
    const {
      columns,
      rows,
    } = this.state;
    const hasData = !isNull(rows) && !isNull(columns);
    return hasData ? (
      <table className="table" >
        <TableHeader columns={columns} onHeaderClick={this.onHeaderClick} />
        <TableBody rows={rows} />
      </table>
    ) : (
      <div className="loading">Loading...</div>
    );
  }
}
