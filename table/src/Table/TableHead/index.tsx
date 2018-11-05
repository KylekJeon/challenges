import React, { StatelessComponent, Props } from 'react';

interface TableHeadProps extends Props<void> {
  name: string;
  onHeaderClick: (name: string) => any;
}

const TableHead: StatelessComponent<TableHeadProps> = function TableHead({ name, onHeaderClick }) {
  const thOnClick = e => {
    onHeaderClick(name);
  }
  return (
    <th onClick={thOnClick}>
      {name.split(/(?=[A-Z])/).join(' ')}
    </th>
  )
}

export default TableHead;