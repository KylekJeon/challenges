import React from 'react';
// import PropTypes from 'prop-types'
import TableRow from '../TableRow';

const TableHeader = (columns) => {
  return (
    <thead>
        {
          columns.map(col => {
            return <TableRow column={col} />
          })
        }
    </thead>
  )
}

export default TableHeader;