import React, { StatelessComponent, Props } from 'react';

interface TableCellProps extends Props<void> {
  data: string;
}

const TableCell: StatelessComponent<TableCellProps> = function TableCell({ data }) {
  return (
    <td className="row">
      {data}
    </td>
  )
}

export default TableCell;