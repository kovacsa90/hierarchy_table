import React, { useState } from "react";
import tableData from "./dataSource/example-data.json";
import MainTable from "./components/MainTable";
import { RowsProvider } from "./context/rows-context";
import { MainData } from "./components/types";

function App(): React.ReactElement {
  const [rows, setRows] = useState<MainData>(tableData as MainData);
  return (
    <React.Fragment>
      <RowsProvider context={{ rows, setRows }}>
        <MainTable />
      </RowsProvider>
    </React.Fragment>
  );
}

export default App;
