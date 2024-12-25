import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Snackbar, Alert, Button } from "@mui/material";
import { getToken } from "../services/localStorageService";
import Header from "./header/Header"; // Make sure the path is correct

const UserTicketList = () => {
  const [ticketList, setTicketList] = useState([]); // Danh sách vé của user
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("info"); // Mức độ thông báo (success, error, info)

  const token = getToken(); // Lấy token từ localStorage

  // Hàm lấy danh sách vé từ API
  const fetchUserTickets = async () => {
    try {
      const response = await fetch("http://localhost:8080/DUTParking/services/ticket/my-tickets-list", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch ticket list.");
      const data = await response.json();
      setTicketList(data);
    } catch (error) {
      setSnackBarMessage("Không thể tải danh sách vé.");
      setSnackBarSeverity("error");
      setSnackBarOpen(true);
    }
  };

  // Hàm kích hoạt vé
  const enableTicket = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/DUTParking/services/ticket/my-tickets-list/enable-ticket/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.result) {
        setSnackBarMessage("Vé đã được kích hoạt thành công.");
        setSnackBarSeverity("success");
        fetchUserTickets(); // Cập nhật lại danh sách vé
      } else {
        setSnackBarMessage("Không thể kích hoạt vé. Vui lòng thử lại.");
        setSnackBarSeverity("error");
      }
      setSnackBarOpen(true);
    } catch (error) {
      setSnackBarMessage("Đã xảy ra lỗi khi kích hoạt vé.");
      setSnackBarSeverity("error");
      setSnackBarOpen(true);
    }
  };

  // Hàm xóa vé
  const deleteTicket = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/DUTParking/services/ticket/my-tickets-list/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSnackBarMessage("Vé đã được xóa thành công.");
        setSnackBarSeverity("success");
        fetchUserTickets(); // Cập nhật lại danh sách vé
      } else {
        setSnackBarMessage("Không thể xóa vé. Vui lòng thử lại.");
        setSnackBarSeverity("error");
      }
      setSnackBarOpen(true);
    } catch (error) {
      setSnackBarMessage("Đã xảy ra lỗi khi xóa vé.");
      setSnackBarSeverity("error");
      setSnackBarOpen(true);
    }
  };

  // Đóng Snackbar
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };

  // Lấy danh sách vé khi component được render
  useEffect(() => {
    fetchUserTickets();
  }, []);

  const convertQrCodeToUrl = (qrCode) => {
    return `data:image/png;base64,${qrCode}`;
  };

  return (
    <Box p={3}>
      {/* Header component */}
      <Header />

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackBar} severity={snackBarSeverity} variant="filled" sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>

      {/* Tiêu đề */}
      <Typography variant="h4" gutterBottom>
        Danh sách vé của bạn
      </Typography>

      {/* Hiển thị danh sách vé dưới dạng Card */}
      <Grid container spacing={3}>
        {ticketList.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} key={ticket.ticketId}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {ticket.ticketName}
                </Typography>
                <Typography color="text.secondary">Mã vé: {ticket.ticketId}</Typography>
                <Typography color="text.secondary">Mệnh giá: {ticket.menhgia} VNĐ</Typography>
                <Typography color="text.secondary">Ngày phát hành: {new Date(ticket.issueDate).toLocaleDateString()}</Typography>
                <Typography color="text.secondary">Ngày hết hạn: {new Date(ticket.expiryDate).toLocaleDateString()}</Typography>
                <Typography color="text.secondary">Trạng thái: {ticket.status}</Typography>
                {ticket.qr_code && (
                  <Box mt={2}>
                    <img src={convertQrCodeToUrl(ticket.qr_code)} alt="QR Code" style={{ width: "150px", height: "auto" }} />
                  </Box>
                )}
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => enableTicket(ticket.ticketId)}
                    disabled={ticket.status === "Enabled"} // Vô hiệu hóa nút nếu vé đã kích hoạt
                  >
                    {ticket.status === "Enabled" ? "Đã kích hoạt" : "Kích hoạt"}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteTicket(ticket.ticketId)}
                  >
                    Xóa vé
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserTicketList;
