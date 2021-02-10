import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CloseIcon from "@material-ui/icons/Close";

import RelativeTable from "./RelativeTable";
import { useRows } from "../context/rows-context";
import { MainItem, MainItemData } from "./types";
import useStyles from "../styles/styles";

type MainRowProps = {
  row: MainItem;
};

const MainRow: React.FC<MainRowProps> = ({
  row,
}: MainRowProps): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const { rows, setRows } = useRows();
  const classes = useStyles();
  const cells: MainItemData[] = [
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

  useEffect(() => {
    if (!row?.kids?.has_relatives?.records.length && open) {
      setOpen(false);
    }
  }, [row]);

  const handleDeleteMain = (mainId: string): void => {
    const updatedRows = rows.filter(
      (item: MainItem) => item.data["Identification number"] !== mainId,
    );
    setRows(updatedRows);
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {row?.kids?.has_relatives &&
            !!row?.kids?.has_relatives?.records.length && (
              <IconButton
                size="small"
                onClick={() => setOpen(!open)}
                data-testid="mainOpenButton"
              >
                {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
              </IconButton>
            )}
        </TableCell>
        {cells.map((cellName: MainItemData) => (
          <TableCell key={cellName}>{row.data[cellName]}</TableCell>
        ))}
        <TableCell>
          <IconButton
            size="small"
            onClick={() => handleDeleteMain(row.data["Identification number"])}
            data-testid="mainDeleteButton"
          >
            <CloseIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <RelativeTable row={row} isOpen={open} />
    </React.Fragment>
  );
};

export default MainRow;
