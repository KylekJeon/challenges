import React, { StatelessComponent, Props } from "react";
import { Column } from "../../types/table";
import { Icon } from "antd";
import "./style.css";

interface TableHeadProps extends Props<void> {
  column: Column;
  onHeaderClick: (column: Column) => any;
}

const TableHead: StatelessComponent<TableHeadProps> = function TableHead({
  column,
  onHeaderClick
}) {
  const thOnClick = e => {
    onHeaderClick(column);
  };

  return (
    <th className={column.selected ? "selected" : ""} onClick={thOnClick}>
      <div className="head">
        {column.name.split(/(?=[A-Z])/).join(" ")}
        {column.isAscending ? (
          <span>
            <Icon
              type="down"
              theme="outlined"
              style={{ fontSize: "12px", color: "#5e3ad7" }}
            />
          </span>
        ) : (
          <span>
            <Icon
              type="up"
              theme="outlined"
              style={{ fontSize: "12px", color: "#5e3ad7" }}
            />
          </span>
        )}
      </div>
    </th>
  );
};

export default TableHead;
