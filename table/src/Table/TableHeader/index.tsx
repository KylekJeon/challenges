import React, { StatelessComponent, Props } from "react";
import TableRow from "../TableRow";
import TableHead from "../TableHead";
import { Column } from "../../types/table";
import "./style.css";

interface TableHeaderProps extends Props<void> {
  columns: Column[];
  onHeaderClick: (column: Column) => any;
}

const TableHeader: StatelessComponent<TableHeaderProps> = function TableHeader({
  columns,
  onHeaderClick
}) {
  return (
    <thead className="header">
      <TableRow>
        {columns.map((col, i) => {
          return (
            <TableHead
              key={col.name}
              column={col}
              onHeaderClick={onHeaderClick}
            />
          );
        })}
      </TableRow>
    </thead>
  );
};

export default TableHeader;
