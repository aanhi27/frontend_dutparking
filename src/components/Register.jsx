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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // State quản lý các thông tin nhập từ người dùng
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State quản lý thông báo lỗi
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSuccessOpen, setSnackBarSuccessOpen] = useState(false); // Thêm state cho thông báo thành công
  const [snackBarSuccessMessage, setSnackBarSuccessMessage] = useState(""); // Thêm state cho thông báo thành công

  // Xử lý khi đóng thông báo snackbar
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
    setSnackBarSuccessOpen(false); // Đóng cả snack bar thành công
  };

  // Xử lý khi gửi form đăng ký
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn form gửi theo cách mặc định

    // Gửi yêu cầu đăng ký đến API backend
    fetch("http://localhost:8080/DUTParking/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json()) // Chuyển dữ liệu trả về từ API thành JSON
      .then((data) => {
        // Kiểm tra kết quả phản hồi
        if (data.code !== 1000) {
          throw new Error(data.message); // Nếu mã lỗi không phải là 1000, ném lỗi
        }

        // Nếu đăng ký thành công, hiển thị thông báo thành công
        setSnackBarSuccessMessage("Đăng ký thành công! Bạn có thể cập nhật hồ sơ ngay.");
        setSnackBarSuccessOpen(true);

        // Sau khi đăng ký thành công, điều hướng đến trang update-profile sau một khoảng thời gian
        setTimeout(() => {
          navigate("/update"); // Chuyển hướng đến trang cập nhật hồ sơ
        }, 2000); // Điều hướng sau 2 giây để người dùng có thể thấy thông báo
      })
      .catch((error) => {
        setSnackBarMessage(error.message); // Hiển thị thông báo lỗi
        setSnackBarOpen(true);
      });
  };

  return (
    <>
      {/* Snackbar thông báo lỗi */}
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

      {/* Snackbar thông báo thành công */}
      <Snackbar
        open={snackBarSuccessOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarSuccessMessage}
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
              Tạo tài khoản mới
            </Typography>

            {/* Form đăng ký */}
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
                Đăng ký
              </Button>
              <Divider />
            </Box>

            {/* Chuyển đến trang đăng nhập */}
            <Box display="flex" flexDirection="column" width="100%" gap="25px">
              <Button
                type="button"
                variant="contained"
                color="success"
                size="large"
                onClick={() => navigate("/login")}
                fullWidth
              >
                Đã có tài khoản? Đăng nhập ngay
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
