import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../services/localStorageService"; 

export default function Login() {
  const navigate = useNavigate();

  // Cảnh báo và xử lý snack bar
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  // Kiểm tra token khi component mount
  useEffect(() => {
    const accessToken = getToken();

    if (accessToken) {
      navigate("/Home"); // Nếu đã có token, điều hướng đến trang chính
    }
  }, [navigate]);

  const [email, setEmail] = useState(""); // Lưu email
  const [password, setPassword] = useState(""); // Lưu mật khẩu
  const [snackBarOpen, setSnackBarOpen] = useState(false); // Quản lý snackbar
  const [snackBarMessage, setSnackBarMessage] = useState(""); // Thông báo lỗi từ API

  // Hàm gửi yêu cầu đăng nhập
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn form gửi theo cách mặc định

    // Gửi yêu cầu đăng nhập đến API Spring Boot
    fetch("http://localhost:8080/DUTParking/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Kiểm tra phản hồi từ API
        if (data.code !== 1000) {
          throw new Error(data.message); // Nếu mã lỗi không phải là 1000, ném lỗi
        }

        setToken(data.result?.token); // Lưu token vào localStorage
        navigate("/Home"); // Điều hướng về trang chính
      })
      .catch((error) => {
        setSnackBarMessage(error.message); // Hiển thị thông báo lỗi
        setSnackBarOpen(true);
      });
  };

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor={"#f0f2f5"}
      >
        <Card
          sx={{
            minWidth: 400,
            maxWidth: 500,
            boxShadow: 4,
            borderRadius: 4,
            padding: 4,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              Đăng nhập vào DUTParking
            </Typography>

            {/* Form đăng nhập */}
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              onSubmit={handleSubmit}
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  mt: "15px",
                  mb: "25px",
                }}
              >
                Đăng nhập
              </Button>
              <Divider />
            </Box>

            {/* Nút tạo tài khoản mới */}
            <Box display="flex" flexDirection="column" width="100%" gap="25px">
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                onClick={() => navigate("/register")} // Chuyển đến trang đăng ký
              >
                Tạo tài khoản mới
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
} 