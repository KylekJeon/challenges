import React, { StatelessComponent, Props } from 'react';
import TableRow from '../TableRow';
import TableHead from '../TableHead';
import './style.css';

interface TableHeaderProps extends Props<void> {
  columns: string[];
  onHeaderClick: (colName: string) => any;
}

const TableHeader: StatelessComponent<TableHeaderProps> = function TableHeader({
  columns, onHeaderClick 
}){
  return (
    <thead className="header">
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