import React, { StatelessComponent, Props } from "react";
import "./style.css";

const TableRow: StatelessComponent<Props<void>> = function TableRow(props) {
  return <tr className="row">{props.children}</tr>;
};

export default TableRow;
