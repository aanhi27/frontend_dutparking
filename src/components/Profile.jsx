import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./header/Header";  // Import Header
import { getToken } from "../services/localStorageService"; // Import getToken từ service

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken(); // Sử dụng getToken từ localStorageService

    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }

    console.log("Token:", token); // In token ra console để kiểm tra

    fetch("http://localhost:8080/DUTParking/profile/my_profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.code === 1000) {
          setUserProfile(data.result);
        } else {
          setError(data.message || "Đã xảy ra lỗi không xác định.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(`Lỗi: ${error.message}`);
        setLoading(false);
      });
  }, []); // Chạy khi component mount

  if (loading) {
    return <Typography variant="h6">Đang tải thông tin...</Typography>;
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f0f2f5">
      {/* Thêm Header vào đây */}
      <Header />  {/* Hiển thị Header */}

      <Card sx={{ minWidth: 400, maxWidth: 500, boxShadow: 4, borderRadius: 4, padding: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Hồ sơ người dùng
          </Typography>

          {/* Hiển thị thông tin người dùng */}
          {userProfile && (
            <>
              <Typography variant="body1">
                <strong>MSSV:</strong> {userProfile.mssv}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {userProfile.email}
              </Typography>
              <Typography variant="body1">
                <strong>Họ và tên:</strong> {userProfile.hovaten}
              </Typography>
              <Typography variant="body1">
                <strong>Giới tính:</strong> {userProfile.gioitinh}
              </Typography>
              <Typography variant="body1">
                <strong>Ngày sinh:</strong> {userProfile.dob}
              </Typography>
              <Typography variant="body1">
                <strong>Địa chỉ:</strong> {userProfile.diachi}
              </Typography>
              <Typography variant="body1">
                <strong>Quê quán:</strong> {userProfile.quequan}
              </Typography>
              <Typography variant="body1">
                <strong>Số điện thoại:</strong> {userProfile.sdt}
              </Typography>
              <Typography variant="body1">
                <strong>Số dư:</strong> {userProfile.sodu} VND
              </Typography>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Nút điều hướng đến trang cập nhật hồ sơ */}
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={() => navigate("/update")}>
              Cập nhật hồ sơ
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
