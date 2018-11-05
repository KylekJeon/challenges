import React, { StatelessComponent, Props } from 'react';
import { Row } from '../../types/table'; 
import TableRow from '../TableRow';
import TableCell from '../TableCell';

interface TableBodyProps extends Props<void> {
  rows: Row[];
}

const TableBody: StatelessComponent<TableBodyProps> = function TableBody({
  rows,
}) {
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