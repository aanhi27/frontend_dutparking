import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { getToken } from "../services/localStorageService";
import Header from "./header/Header";  // Import Header component

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [menhgia, setMenhgia] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSuccessOpen, setSnackBarSuccessOpen] = useState(false);

  const token = getToken();

  // Lấy danh sách vé
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:8080/DUTParking/services/ticket/tickets-list", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      setSnackBarMessage("Không thể tải danh sách vé.");
      setSnackBarOpen(true);
    }
  };

  // Xóa vé
  const handleDeleteTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:8080/DUTParking/services/ticket/tickets-list/${ticketId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        setSnackBarMessage(`Xóa vé ${ticketId} thành công.`);
        setSnackBarSuccessOpen(true);
        fetchTickets(); // Tải lại danh sách vé
      } else {
        const errorData = await response.json();
        setSnackBarMessage(errorData.message || "Đã xảy ra lỗi khi xóa vé.");
        setSnackBarOpen(true);
      }
    } catch (error) {
      setSnackBarMessage("Đã xảy ra lỗi khi xóa vé.");
      setSnackBarOpen(true);
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTicketId("");
    setTicketName("");
    setMenhgia("");
  };

  const handleCreateTicket = async () => {
    try {
      const response = await fetch("http://localhost:8080/DUTParking/services/ticket/create-ticket", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId, ticketName, menhgia: Number(menhgia) }),
      });

      const data = await response.json();

      if (data.result) {
        setSnackBarMessage(`Tạo vé thành công: ${ticketName}`);
        setSnackBarSuccessOpen(true);
        fetchTickets();
        handleCloseDialog();
      } else {
        setSnackBarMessage(data.message || "Đã xảy ra lỗi.");
        setSnackBarOpen(true);
      }
    } catch (error) {
      setSnackBarMessage("Đã xảy ra lỗi khi tạo vé.");
      setSnackBarOpen(true);
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
    setSnackBarSuccessOpen(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Box p={3}>
      {/* Snackbar */}
      <Snackbar open={snackBarOpen} onClose={handleCloseSnackBar} autoHideDuration={6000}>
        <Alert onClose={handleCloseSnackBar} severity="error">
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={snackBarSuccessOpen} onClose={handleCloseSnackBar} autoHideDuration={2000}>
        <Alert onClose={handleCloseSnackBar} severity="success">
          {snackBarMessage}
        </Alert>
      </Snackbar>

      {/* Header */}
      <Header /> {/* Thêm Header ở đây */}

      {/* Danh sách vé */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Danh sách vé</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Tạo vé mới
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã vé</TableCell>
              <TableCell>Tên vé</TableCell>
              <TableCell>Mệnh giá</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.ticketId}>
                <TableCell>{ticket.ticketId}</TableCell>
                <TableCell>{ticket.ticketName}</TableCell>
                <TableCell>{ticket.menhgia}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteTicket(ticket.ticketId)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Tạo vé mới</DialogTitle>
        <DialogContent>
          <TextField
            label="Mã vé"
            fullWidth
            margin="normal"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
          <TextField
            label="Tên vé"
            fullWidth
            margin="normal"
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
          />
          <TextField
            label="Mệnh giá"
            fullWidth
            margin="normal"
            type="number"
            value={menhgia}
            onChange={(e) => setMenhgia(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleCreateTicket} color="primary">
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketPage;
