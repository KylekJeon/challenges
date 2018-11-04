import React from 'react'
import PropTypes from 'prop-types';
import styles from './style.css';
import TableHeader from './TableHeader';
import TableBody from './TableBody';


export default class Table extends React.Component {
  propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
  }

  state = {
    next: null,
    sortType: null,
    rows: null
  }

  sort = () => {
    const { sortType } = this.state;
    if (sortType) {
      this.props.rows.sort((a, b) => {
        return a[sortType] - b[sortType];
      })
    }
  }

  onHeaderClick = (e, colName) => {
    // set the sort type then sort
  }

  componentDidMount() {
    console.log('componentDidMount - props: ', this.props);
  }

  render() {
    console.log('STYLE: ', styles);
    return (
      <table className={styles.Table} >
        <tr>hello</tr>
        {/* <TableHeader />
        <TableBody /> */}
      </table>
    );
  }
}
