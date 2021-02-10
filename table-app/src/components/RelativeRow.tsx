import React, { useEffect } from "react";
import { cloneDeep } from "lodash";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CloseIcon from "@material-ui/icons/Close";

import PhoneTable from "./PhoneTable";
import { useRows } from "../context/rows-context";
import useStyles from "../styles/styles";
import { RelativeRecord, RelativeRecordData, MainItem } from "./types";

type RelativeRowProps = {
  row: RelativeRecord;
  relativeIndex: number;
};

const RelativeRow: React.FC<RelativeRowProps> = ({
  row,
  relativeIndex,
}: RelativeRowProps): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const { rows, setRows } = useRows();
  const classes = useStyles();
  const cells: RelativeRecordData[] = [
    "Relative ID",
    "Patient ID",
    "Is alive?",
    "Frequency of visits",
  ];

  useEffect(() => {
    if (!row?.kids?.has_phone?.records.length && open) {
      setOpen(false);
    }
  }, [row]);

  const handleDeleteRelative = (relativeId: string) => {
    const clonedRows = cloneDeep(rows);
    clonedRows.forEach((item: MainItem) => {
      if (
        item.kids?.has_relatives?.records[relativeIndex]?.data[
          "Relative ID"
        ] === relativeId
      ) {
        item.kids?.has_relatives?.records.splice(relativeIndex, 1);
      }
    });
    setRows(clonedRows);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {row?.kids?.has_phone && !!row?.kids?.has_phone?.records.length && (
            <IconButton
              size="small"
              onClick={() => setOpen(!open)}
              data-testid="relativeOpenButton"
            >
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
          )}
        </TableCell>
        {cells.map((cellName: RelativeRecordData) => (
          <TableCell key={cellName}>{row.data[cellName]}</TableCell>
        ))}
        <TableCell>
          <IconButton
            size="small"
            onClick={() => handleDeleteRelative(row.data["Relative ID"])}
          >
            <CloseIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <PhoneTable row={row} isOpen={open} relativeIndex={relativeIndex} />
    </React.Fragment>
  );
};

export default RelativeRow;
