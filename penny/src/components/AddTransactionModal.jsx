import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  TextareaAutosize,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import styles from "./../styles/add-transaction0modal.module.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import {
  getFromLocalStorage,
  saveInLocalStorage,
  isPersian,
} from "../utils/helper";
import { toastSuccess } from "./../utils/notify";
import { toastError } from "../utils/notify";
import { useSelector } from "react-redux";
import { setTransactions } from "../state management/userSlice";
import { useDispatch } from "react-redux";

export default function AddTransactionModal({ open, onClose }) {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    customerName: "",
    for: "",
    details: "",
    paid: false,
  });

  const [selectedDate, setSelectedDate] = useState({
    format: "MM/DD/YYYY",
    persian: "select date",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const convert = (date, format = state.format) => {
    let object = { date, format };

    setSelectedDate({
      persian: new DateObject(object).format(),
      ...object,
    });
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim())
      newErrors.customerName = "Customer name is required.";
    if (!formData.for.trim()) newErrors.for = "This field is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDate.persian === "select date")
      return toastError("select a date");

    if (validateForm()) {
      const newTransaction = {
        id: new Date().getTime(),
        date: selectedDate.persian,
        customerName: formData.customerName,
        for: formData.for,
        details: formData.details,
        paid: formData.paid,
      };

      const allUsers = getFromLocalStorage("allUsers");
      console.log(allUsers);
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].userName === userName) {
          allUsers[i].transactions.push(newTransaction);
          dispatch(setTransactions(allUsers[i].transactions));
          saveInLocalStorage("allUsers", allUsers);

          toastSuccess("Transaction added successfully.");
          break;
        }
      }
      console.log(allUsers);

      setFormData({
        customerName: "",
        for: "",
        details: "",
        paid: false,
      });
      setErrors({});
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles["modal-container"]}>
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
          Add Transaction
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className={styles["date-picker-container"]}>
            <Typography>Date: </Typography>
            <DatePicker
              render={
                <Button
                  style={{ width: "40rem" }}
                  variant="outlined"
                  size="large"
                  fullWidth
                >
                  {selectedDate.persian}
                </Button>
              }
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-left"
              className="rmdp-mobile"
              onChange={convert}
            />
          </div>
          {/* Customer Name */}
          <TextField
            label="Customer Name"
            value={formData.customerName}
            onChange={(e) => handleChange("customerName", e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.customerName}
            helperText={errors.customerName}
            style={{
              direction: isPersian(formData.customerName) ? "rtl" : "ltr",
            }}
          />

          {/* For */}
          <TextField
            label="For"
            value={formData.for}
            onChange={(e) => handleChange("for", e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.for}
            helperText={errors.for}
            style={{
              direction: isPersian(formData.for) ? "rtl" : "ltr",
            }}
          />

          {/* Details */}
          <TextareaAutosize
            placeholder="Details (optional)"
            value={formData.details}
            onChange={(e) => handleChange("details", e.target.value)}
            minRows={4}
            className={styles["details-container"]}
            style={{
              direction: isPersian(formData.details) ? "rtl" : "ltr",
            }}
          />

          {/* Paid */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.paid}
                onChange={(e) => handleChange("paid", e.target.checked)}
              />
            }
            label="Paid"
            sx={{ marginTop: 2 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2, padding: 1 }}
          >
            Add Transaction
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
