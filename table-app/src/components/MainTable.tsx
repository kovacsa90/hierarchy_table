import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import MainRow from "./MainRow";
import TableHeader from "./TableHeader";
import useStyles from "../styles/styles";
import { useRows } from "../context/rows-context";
import { MainItem, MainItemData } from "./types";

const MainTable: React.FC = (): React.ReactElement => {
  const { rows } = useRows();
  const classes = useStyles();
  const mainHeaders: MainItemData[] = [
    "Identification number",
    "Name",
    "Gender",
    "Risk",
    "Hair length",
    "IQ",
    "Admission date",
    "Last breakdown",
    "Yearly fee",
    "Knows the Joker?",
  ];

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Typography
        className={classes.title}
        variant="button"
        gutterBottom
        component="div"
      >
        Data-1 JSON
      </Typography>
      <Table>
        <TableHeader headers={mainHeaders} isCollapsible />
        <TableBody>
          {rows.map((row: MainItem) => (
            <MainRow key={row.data["Identification number"]} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
