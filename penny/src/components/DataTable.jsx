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
import { useDispatch, useSelector } from "react-redux";
import { themeAlpine } from "ag-grid-community";
import "./../styles/data-table.module.css";
import ConfirmationDialog from "./ConfirmationDialog";
import { getFromLocalStorage, saveInLocalStorage } from "./../utils/helper";
import { toastSuccess } from "./../utils/notify";
import { setTransactions } from "./../state management/userSlice";
import { MdDeleteForever } from "react-icons/md";
import { Button, Modal } from "@mui/material";

const myTheme = themeQuartz.withPart(colorSchemeDark);

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: true,
};

const CustomButtonComponent = ({
  data,
  setPaidModalIsOpen,
  setSelectedTransactionToPay,
}) => {
  const handleClick = () => {
    console.log("Row Data:", data);
    setPaidModalIsOpen(true);
    setSelectedTransactionToPay(data.id);
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
const CustomDeleteComponent = ({
  data,
  setDeleteModalIsOpen,
  setSelectedTransactionToDelete,
}) => {
  const handleClick = () => {
    console.log("Row Data:", data);
    setDeleteModalIsOpen(true);
    setSelectedTransactionToDelete(data.id);
  };

  return (
    <div className={styles["paid-btn-container"]}>
      <button className={styles["delete-btn"]} onClick={handleClick}>
        <span>
          <MdDeleteForever />
        </span>
      </button>
    </div>
  );
};

function CustomReceipt({ data }) {
  return <div> {data.customerName}</div>;
}
function CustomDetails({
  data,
  setDetailsModalIsOpen,
  setSelectedTransactionToDetails,
}) {
  function handleClick() {
    setDetailsModalIsOpen(true);
    setSelectedTransactionToDetails(data.details);
  }
  return (
    <button onClick={handleClick} className={styles["detail-btn"]}>
      {data.details.length > 15
        ? data.details.slice(0, 15) + "..."
        : data.details}
    </button>
  );
}

export default function DataTable({ data }) {
  // const { isDarkMode } = useSelector((state) => state.darkMode);
  const { userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [paidModalIsOpen, setPaidModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);

  const [selectedTransactionToPay, setSelectedTransactionToPay] =
    useState(null);
  const [selectedTransactionToDelete, setSelectedTransactionToDelete] =
    useState(null);
  const [selectedTransactionToDetails, setSelectedTransactionToDetails] =
    useState(null);

  const [columnDefs, setColumnDefs] = useState([
    { field: "date" },
    { field: "customerName" },
    { field: "for" },
    {
      field: "details",
      cellRenderer: CustomDetails,
      cellRendererParams: {
        setDetailsModalIsOpen: setDetailsModalIsOpen,
        setSelectedTransactionToDetails: setSelectedTransactionToDetails,
      },
    },
    {
      field: "paid",
      cellRenderer: CustomButtonComponent,
      cellRendererParams: {
        setPaidModalIsOpen: setPaidModalIsOpen,
        setSelectedTransactionToPay: setSelectedTransactionToPay,
      },
    },
    {
      field: "Delete",
      cellRenderer: CustomDeleteComponent,
      cellRendererParams: {
        setDeleteModalIsOpen: setDeleteModalIsOpen,
        setSelectedTransactionToDelete: setSelectedTransactionToDelete,
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  function handleConfirmPayment() {
    setPaidModalIsOpen(false);
    const allUsers = getFromLocalStorage("allUsers");
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].userName === userName) {
        for (let j = 0; j < allUsers[i].transactions.length; j++) {
          if (allUsers[i].transactions[j].id === selectedTransactionToPay) {
            allUsers[i].transactions[j].paid =
              !allUsers[i].transactions[j].paid;
            dispatch(setTransactions(allUsers[i].transactions));
            saveInLocalStorage("allUsers", allUsers);
            toastSuccess("Status updated");
            break;
          }
        }
      }
    }
  }
  function handleCancelPayment() {
    setPaidModalIsOpen(false);
  }
  function handleCancelDelete() {
    setDeleteModalIsOpen(false);
  }
  function handleConfirmDelete() {
    setDeleteModalIsOpen(false);
    const allUsers = getFromLocalStorage("allUsers");
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].userName === userName) {
        for (let j = 0; j < allUsers[i].transactions.length; j++) {
          if (allUsers[i].transactions[j].id === selectedTransactionToDelete) {
            allUsers[i].transactions.splice(j, 1);
            dispatch(setTransactions(allUsers[i].transactions));
            saveInLocalStorage("allUsers", allUsers);
            toastSuccess("Transaction deleted");
            break;
          }
        }
      }
    }
  }
  return (
    <div className={styles["container"]}>
      <AgGridReact
        className={styles["grid-container"]}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
      <Modal
        open={detailsModalIsOpen}
        onClose={() => setDetailsModalIsOpen(false)}
      >
        <div className={styles["detail-modal-container"]}>
          <p>{selectedTransactionToDetails}</p>
          <Button
            onClick={() => setDetailsModalIsOpen(false)}
            variant="contained"
          >
            close
          </Button>
        </div>
      </Modal>

      <ConfirmationDialog
        open={paidModalIsOpen}
        setOpen={setPaidModalIsOpen}
        onConfirm={handleConfirmPayment}
        onCancel={handleCancelPayment}
        type={"payment"}
      />
      <ConfirmationDialog
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        type={"delete"}
      />
    </div>
  );
}
