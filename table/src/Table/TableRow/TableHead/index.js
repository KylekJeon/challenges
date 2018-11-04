import React from 'react';

const TableHead = (name, onHeaderClick) => {
  const thOnClick = e => {
    onHeaderClick(e, name);
  }
  return (
    <th onClick={thOnClick}>
      {name}
    </th>
  )
}

export default TableHead;