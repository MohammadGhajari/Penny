import { Box, Button, Typography, Modal } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export default function AddTransactionModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: `${useMediaQuery("(max-width:450px)") ? "330px" : "400px"}`,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Are you sure you want to delete the website?
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
