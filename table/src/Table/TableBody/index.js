import React from 'react';
import TableRow from '../TableRow';

// rows is an array of objects
const TableBody = rows => {
  return (
    <tbody>
      {
        rows.map(row => {
          return <TableRow row={row} />
        })
      }
    </tbody>
  )
}

export default TableBody;