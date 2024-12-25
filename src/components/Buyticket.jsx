import React, { useState } from "react";
import { Box, Button, Snackbar, Alert, Typography } from "@mui/material";
import Header from "./header/Header"; // Make sure the path is correct
import { getToken } from "../services/localStorageService";

const BuyTicket = () => {
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  // Hàm gửi yêu cầu mua vé
  const handleBuyTicket = async (ticketType) => {
    const token = getToken(); // Lấy token từ localStorage
    if (!token) {
      setSnackBarMessage("Không tìm thấy token. Vui lòng đăng nhập lại.");
      setSnackBarOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/DUTParking/services/ticket/buy-ticket", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: ticketType }), // Gửi loại vé (ngày/tuần/tháng)
      });

      const data = await response.json();

      // Kiểm tra phản hồi từ API
      if (data.code === 1000) {
        setSnackBarMessage(`Bạn đã mua vé ${ticketType} thành công!`);
      } else {
        setSnackBarMessage(data.message || "Đã xảy ra lỗi khi mua vé.");
      }
    } catch (error) {
      setSnackBarMessage("Lỗi kết nối tới máy chủ.");
    }

    setSnackBarOpen(true);
  };

  // Đóng Snackbar
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f0f2f5"
      p={2}
    >
      {/* Header component */}
      <Header />

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 3,
          borderRadius: 4,
          boxShadow: 4,
          bgcolor: "white",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Chọn loại vé
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          {/* Thông tin vé ngày */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">Vé ngày - 2,000 đồng</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBuyTicket("VE NGAY")}
            >
              Mua vé
            </Button>
          </Box>

          {/* Thông tin vé tuần */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">Vé tuần - 10,000 đồng</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBuyTicket("VE TUAN")}
            >
              Mua vé
            </Button>
          </Box>

          {/* Thông tin vé tháng */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">Vé tháng - 50,000 đồng</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBuyTicket("VE THANG")}
            >
              Mua vé
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyTicket;
