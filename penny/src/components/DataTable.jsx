"use client";
import React, { StrictMode, useMemo, useState } from "react";
import styles from "./../styles/data-table.module.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  themeQuartz,
  colorSchemeDark,
  iconSetMaterial,
} from "ag-grid-community";
import { useSelector } from "react-redux";
import { themeAlpine } from "ag-grid-community";

const myTheme = themeQuartz.withPart(colorSchemeDark);

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: true,
};

const CustomButtonComponent = ({ data }) => {
  const handleClick = () => {
    console.log("Row Data:", data); // Log the row data
  };

  return <button onClick={handleClick}>Push Me!</button>;
};
function CustomReceipt({ data }) {
  return <div>Custom Receipt: {data.customerName}</div>;
}

export default function DataTable({ data }) {
  // const { isDarkMode } = useSelector((state) => state.darkMode);

  const [columnDefs, setColumnDefs] = useState([
    { field: "date" },
    { field: "customerName" },
    { field: "for" },
    { field: "details" },
    { field: "paid", cellRenderer: CustomButtonComponent },
    { field: "receipt", cellRenderer: CustomReceipt },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  return (
    <div className={styles["container"]}>
      <h2>Keyword data table</h2>
      <AgGridReact
        // theme={isDarkMode ? myTheme : themeAlpine}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
}
