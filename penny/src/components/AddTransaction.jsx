import { Box, Button, Typography, Modal } from "@mui/material";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { IoAdd } from "react-icons/io5";
import styles from "./../styles/add-transaction.module.css";
import AddTransactionModal from "./AddTransactionModal";

export default function AddTransaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClose() {
    console.log("closed");
    setIsModalOpen(false);
  }
  function handleOpen() {
    console.log("opened");
    setIsModalOpen(true);
  }
  function onConfirm() {
    console.log("confimrd");
    setIsModalOpen("false");
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.8rem",
          textTransform: "none",
        }}
      >
        <span
          style={{
            display: "flex",
            fontSize: "2rem",
          }}
        >
          <IoAdd />
        </span>
        <span>New Transaction</span>
      </Button>
      <AddTransactionModal
        open={isModalOpen}
        onClose={handleClose}
        onConfirm={onConfirm}
      />
    </div>
  );
}
