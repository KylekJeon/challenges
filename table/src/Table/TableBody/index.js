import React from 'react';
import TableRow from '../TableRow';
import TableCell from '../TableCell';

// rows is an array of objects that is paired with the column
const TableBody = props => {
  const rows = props.rows;
  return (
    <tbody>
      {
        rows.map((row, i) => {
          return (
            <TableRow key={i}>
              {
                Object.keys(row).map((colTitle, i) => {
                  const data = row[colTitle];
                  return (
                    <TableCell key={i} data={data} />
                  )
                })
              }
            </TableRow>
          )
        })
      }
    </tbody>
  )
}

export default TableBody;