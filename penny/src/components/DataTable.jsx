"use client";
import React, { StrictMode, useMemo, useState } from "react";
import styles from "./../styles/data-table.module.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import {
  themeQuartz,
  colorSchemeDark,
  iconSetMaterial,
} from "ag-grid-community";
import { useSelector } from "react-redux";
import { themeAlpine } from "ag-grid-community";
import "./../styles/data-table.module.css";

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

  const { paid } = data;

  return (
    <div className={styles["paid-btn-container"]}>
      <button
        className={styles["paid-btn"]}
        style={{ backgroundColor: `${!paid ? "red" : "var(--color-primary"}` }}
        onClick={handleClick}
      >
        <span> {!paid ? <IoMdCloseCircleOutline /> : <GiConfirmed />}</span>
        <span>{!paid ? "Not paid" : "Paid"}</span>
      </button>
    </div>
  );
};
function CustomReceipt({ data }) {
  return <div>Custom Receipt: {data.customerName}</div>;
}
function CustomDetails({ data }) {
  return <div>Custom Details: {data.details}</div>;
}

export default function DataTable({ data }) {
  // const { isDarkMode } = useSelector((state) => state.darkMode);

  const [columnDefs, setColumnDefs] = useState([
    { field: "date" },
    { field: "customerName" },
    { field: "for" },
    { field: "details", cellRenderer: CustomDetails },
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
      <AgGridReact
        className={styles["grid-container"]}
        // headerHeight={40}
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
