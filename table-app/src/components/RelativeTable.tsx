import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import RelativeRow from "./RelativeRow";
import TableHeader from "./TableHeader";
import useStyles from "../styles/styles";
import { RelativeRecord, RelativeRecordData, MainItem } from "./types";

type RelativeTableProps = {
  row: MainItem;
  isOpen: boolean;
};

const RelativeTable: React.FC<RelativeTableProps> = ({
  row,
  isOpen,
}: RelativeTableProps): React.ReactElement => {
  const headers: RelativeRecordData[] = [
    "Relative ID",
    "Patient ID",
    "Is alive?",
    "Frequency of visits",
  ];
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell className={classes.collapseCell} colSpan={12}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Typography
            className={classes.title}
            variant="button"
            gutterBottom
            component="div"
          >
            Has Relatives
          </Typography>
          <Table size="small">
            <TableHeader headers={headers} isCollapsible />
            <TableBody>
              {row?.kids?.has_relatives?.records.map(
                (relativeRecord: RelativeRecord, index: number) => (
                  <RelativeRow
                    row={relativeRecord}
                    relativeIndex={index}
                    key={relativeRecord.data["Relative ID"]}
                  />
                ),
              )}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default RelativeTable;
