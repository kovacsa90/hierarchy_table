import React, { createContext, useContext } from "react";
import { MainData } from "../components/types";

export interface Rows {
  rows: MainData;
  setRows: (updatedRows: MainData) => void;
}

type RowsProps = {
  context: Rows;
  children: React.ReactNode;
};

const RowsContext = createContext({} as Rows);

const RowsProvider: React.FC<RowsProps> = ({
  context,
  children,
}: RowsProps) => {
  return (
    <RowsContext.Provider value={context}>{children}</RowsContext.Provider>
  );
};

const useRows = (): Rows => {
  const { rows, setRows } = useContext(RowsContext);
  if (rows === undefined || setRows === undefined) {
    throw new Error("useRows must be used within an RowsProvider");
  }
  return { rows, setRows };
};

export { RowsProvider, useRows };
