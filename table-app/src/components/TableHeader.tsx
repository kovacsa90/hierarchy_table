import React from "react";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import useStyles from "../styles/styles";
import { PhoneRecordData, RelativeRecordData, MainItemData } from "./types";

type TableHeaderProps = {
  headers: (PhoneRecordData | RelativeRecordData | MainItemData)[];
  isCollapsible?: boolean;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  isCollapsible = false,
}: TableHeaderProps) => {
  const classes = useStyles();
  return (
    <TableHead className={classes.header}>
      <TableRow>
        {isCollapsible && <TableCell />}
        {headers.map((headerName) => (
          <TableCell key={headerName}>{headerName}</TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
