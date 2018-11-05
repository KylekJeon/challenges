import React, { StatelessComponent, Props } from 'react';

const TableRow: StatelessComponent<Props<void>> = function TableRow(props) {
  return (
    <tr>
      {props.children}
    </tr>
  );
}

export default TableRow;