import React from 'react';
// import PropTypes from 'prop-types'
import TableRow from '../TableRow';
import TableHead from '../TableHead';

const TableHeader = (props) => {
  const columns = props.columns;
  const onHeaderClick = props.onHeaderClick;
  return (
    <thead>
      <TableRow >
        {
          columns.map((col, i) => {
            return <TableHead key={i} name={col} onHeaderClick={onHeaderClick} />
          })
        }
      </TableRow>
        
    </thead>
  )
}

export default TableHeader;