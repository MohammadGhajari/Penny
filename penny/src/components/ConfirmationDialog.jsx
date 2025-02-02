import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./../styles/confirmation-dialog.module.css";

export default function ConfirmationDialog({
  open,
  setOpen,
  onConfirm,
  onCancel,
  type,
}) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" className={styles["container"]}>
        {type === "payment"
          ? "Are you sure want to change status?"
          : "Are you sure want to delete this record?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>Disagree</Button>
        <Button onClick={onConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
