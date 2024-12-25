import React, { useState } from "react";
import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/localStorageService"; 
import Header from "./header/Header";  // Import Header component

const Recharge = () => {
  const navigate = useNavigate();

  // State để lưu thông tin nạp tiền và thông báo
  const [amount, setAmount] = useState("");  // Số tiền nạp
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSuccessOpen, setSnackBarSuccessOpen] = useState(false);

  // Hàm gửi yêu cầu nạp tiền
  const handleRecharge = async (event) => {
    event.preventDefault();

    const token = getToken(); // Lấy token từ localStorage
    if (!token) {
      setSnackBarMessage("Không tìm thấy token. Vui lòng đăng nhập lại.");
      setSnackBarOpen(true);
      navigate("/login");
      return;
    }

    // Gửi yêu cầu nạp tiền
    try {
      const response = await fetch("http://localhost:8080/DUTParking/services/recharge", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menhgia: Number(amount) }),  // Chuyển số tiền thành kiểu số
      });

      const data = await response.json();
      console.log(data);  // Kiểm tra dữ liệu phản hồi từ API

      // Kiểm tra phản hồi
      if (data.code === 1000 && data.result.success) {
        setSnackBarMessage(`Nạp tiền thành công ${amount} đồng`);
        setSnackBarSuccessOpen(true);
      } else {
        setSnackBarMessage(data.result.message || "Đã xảy ra lỗi.");
        setSnackBarOpen(true);
      }
    } catch (error) {
      setSnackBarMessage("Đã xảy ra lỗi khi nạp tiền.");
      setSnackBarOpen(true);
    }
  };

  // Đóng Snackbar
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
    setSnackBarSuccessOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f0f2f5">
      <Header /> {/* Thêm Header ở đây */}

      {/* Snackbar thông báo lỗi */}
      <Snackbar open={snackBarOpen} onClose={handleCloseSnackBar} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleCloseSnackBar} severity="error" variant="filled" sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar thông báo thành công */}
      <Snackbar open={snackBarSuccessOpen} onClose={handleCloseSnackBar} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleCloseSnackBar} severity="success" variant="filled" sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ maxWidth: 400, width: "100%", padding: 3, borderRadius: 4, boxShadow: 4, bgcolor: "white" }}>
        <h2>Nạp Tiền</h2>
        <form onSubmit={handleRecharge}>
          <TextField
            label="Số tiền"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ mt: 2 }}>
            Nạp tiền
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Recharge;
