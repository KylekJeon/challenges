import React from 'react';

const TableRow = (row, column) => {
  console.log(this.props);
  return (
    <tr>
      {this.props.children}
    </tr>
  );
}

export default TableRow;