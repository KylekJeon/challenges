import React from "react";
import camelize from "camelize";
import "./style.css";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { pick, isNull, find, uniqBy } from "lodash";
import { Column } from "../types/table";

export default class Table extends React.Component {
  state = {
    rows: null,
    columns: null,
    validHeaders: [
      "name",
      "height",
      "hairColor",
      "eyeColor",
      "created",
      "edited"
    ]
  };

  private fetchData = () => {
    return fetch("/api/people");
  };

  private processFetchData = data => {
    const results = data.results;
    return results.map(result => {
      result.height = parseInt(result.height, 10);
      result.created = new Date(result.created).toLocaleDateString();
      result.edited = new Date(result.edited).toLocaleDateString();
      return pick(result, this.state.validHeaders);
    });
  };

  private onHeaderClick = (column: Column) => {
    // update the selected the column and reset the rest
    const updatedColumns = this.state.columns.map(col => {
      const isSelectedColumn = col.name === column.name;
      col.selected = isSelectedColumn ? true : false;
      col.isAscending = isSelectedColumn ? !col.isAscending : false;
      return col;
    });

    this.setState({
      columns: updatedColumns,
      rows: this.state.rows.sort((a, b) => {
        // check if 'created' and 'edited' columns
        const isDate = ["created", "edited"].includes(column.name);
        const valA = isDate ? Number(new Date(a[column.name])) : a[column.name];
        const valB = isDate ? Number(new Date(b[column.name])) : b[column.name];
        const toggle = column.isAscending ? 1 : -1;

        if (valA < valB) {
          return -1 * toggle;
        }
        if (valA > valB) {
          return 1 * toggle;
        }
        return 0;
      })
    });
  };

  public componentDidMount() {
    // fetch data if rows and cols are not there
    if (!this.state.rows && !this.state.columns) {
      this.fetchData()
        .then(resp => resp.json())
        .then(data => camelize(data))
        .then(data => {
          const processedData = this.processFetchData(data);
          const columns = Object.keys(processedData[0]).map(key => {
            return { name: key, selected: false, isAscending: false };
          });
          const rows = processedData;

          this.setState({
            columns,
            rows
          });
        });
    }
  }

  public render() {
    const { columns, rows } = this.state;
    const hasData = !isNull(rows) && !isNull(columns);
    return hasData ? (
      <table className="table">
        <TableHeader columns={columns} onHeaderClick={this.onHeaderClick} />
        <TableBody rows={rows} />
      </table>
    ) : (
      <div className="loading">Loading...</div>
    );
  }
}
