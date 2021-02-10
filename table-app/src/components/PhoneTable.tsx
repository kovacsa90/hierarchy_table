import React from "react";
import { cloneDeep } from "lodash";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import TableHeader from "./TableHeader";
import { useRows } from "../context/rows-context";
import useStyles from "../styles/styles";
import {
  PhoneRecord,
  PhoneRecordData,
  RelativeRecord,
  MainItem,
} from "./types";

type PhoneTableProps = {
  row: RelativeRecord;
  isOpen: boolean;
  relativeIndex: number;
};

const PhoneTable: React.FC<PhoneTableProps> = ({
  row,
  isOpen,
  relativeIndex,
}: PhoneTableProps): React.ReactElement => {
  const { rows, setRows } = useRows();
  const classes = useStyles();
  const phoneHeaders: PhoneRecordData[] = [
    "Phone ID",
    "ID of the relative",
    "Phone",
  ];

  const handleDeletePhone = (phoneId: string, phoneIndex: number) => {
    const clonedRows = cloneDeep(rows);
    clonedRows.forEach((item: MainItem) => {
      if (
        item.kids?.has_relatives?.records[relativeIndex]?.kids?.has_phone
          ?.records[phoneIndex]?.data["Phone ID"] === phoneId
      ) {
        item.kids?.has_relatives?.records[
          relativeIndex
        ]?.kids?.has_phone?.records.splice(phoneIndex, 1);
      }
    });
    setRows(clonedRows);
  };

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
            Has Phone
          </Typography>
          <Table size="small">
            <TableHeader headers={phoneHeaders} />
            <TableBody>
              {row?.kids?.has_phone?.records.map(
                (phoneRecord: PhoneRecord, index: number) => (
                  <TableRow key={phoneRecord.data["Phone ID"]}>
                    <TableCell component="th" scope="row">
                      {phoneRecord.data["Phone ID"]}
                    </TableCell>
                    <TableCell>
                      {phoneRecord.data["ID of the relative"]}
                    </TableCell>
                    <TableCell>{phoneRecord.data.Phone}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleDeletePhone(phoneRecord.data["Phone ID"], index)
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default PhoneTable;
