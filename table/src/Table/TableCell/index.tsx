import React, { StatelessComponent, Props } from 'react';

interface TableCellProps extends Props<void> {
  data: string;
}

const TableCell: StatelessComponent<TableCellProps> = function TableCell({ data }) {
  return (
    <td>
      {data}
    </td>
  )
}

export default TableCell;