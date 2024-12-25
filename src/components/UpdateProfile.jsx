import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Snackbar, Alert, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/localStorageService"; // Import getToken from localStorageService

const UpdateProfile = () => {
  const navigate = useNavigate();

  // State to store user information
  const [userProfile, setUserProfile] = useState({
    MSSV: "",
    hovaten: "",
    gioitinh: "",
    dob: "",
    diachi: "",
    quequan: "",
    sdt: "",
  });

  // State to store error or success messages
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSuccessOpen, setSnackBarSuccessOpen] = useState(false);

  useEffect(() => {
    const token = getToken(); // Use getToken from localStorageService

    if (!token) {
      setSnackBarMessage("Không tìm thấy token. Vui lòng đăng nhập lại.");
      setSnackBarOpen(true);
      navigate("/login"); // Navigate to login if no token found
    } else {
      // Fetch user profile when token is available
      fetch("http://localhost:8080/DUTParking/profile/my_profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 1000) {
            setUserProfile(data.result);
          } else {
            setSnackBarMessage(data.message);
            setSnackBarOpen(true);
          }
        })
        .catch((error) => {
          setSnackBarMessage("Đã xảy ra lỗi khi tải thông tin người dùng.");
          setSnackBarOpen(true);
        });
    }
  }, [navigate]);

  // Handle user profile update
  const handleSubmit = (event) => {
    event.preventDefault();

    const token = getToken(); // Get token from localStorageService
    if (!token) {
      setSnackBarMessage("Không tìm thấy token. Vui lòng đăng nhập lại.");
      setSnackBarOpen(true);
      return;
    }

    // Send update request to API (excluding "sodu")
    fetch("http://localhost:8080/DUTParking/profile/my_profile/update", {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mssv: userProfile.MSSV,
        hovaten: userProfile.hovaten,
        gioitinh: userProfile.gioitinh,
        dob: userProfile.dob,
        diachi: userProfile.diachi,
        quequan: userProfile.quequan,
        sdt: userProfile.sdt,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 1000) {
          setSnackBarMessage("Cập nhật thông tin thành công!");
          setSnackBarSuccessOpen(true);
          // Redirect to profile page after success
          setTimeout(() => {
            navigate("/profile");
          }, 2000); // Navigate after 2 seconds to show the message
        } else {
          setSnackBarMessage(data.message);
          setSnackBarOpen(true);
        }
      })
      .catch((error) => {
        setSnackBarMessage("Đã xảy ra lỗi khi cập nhật thông tin.");
        setSnackBarOpen(true);
      });
  };

  // Close snackbar
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
    setSnackBarSuccessOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor={"#f0f2f5"}>
      {/* Error Snackbar */}
      <Snackbar open={snackBarOpen} onClose={handleCloseSnackBar} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleCloseSnackBar} severity="error" variant="filled" sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar open={snackBarSuccessOpen} onClose={handleCloseSnackBar} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleCloseSnackBar} severity="success" variant="filled" sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>

      <Card sx={{ minWidth: 350, maxWidth: 600, boxShadow: 4, borderRadius: 4, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom sx={{ fontSize: '20px' }}>
            Cập nhật thông tin cá nhân
          </Typography>

          {/* Update form */}
          <Box component="form" display="flex" flexDirection="column" alignItems="center" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ maxWidth: 500, width: '100%' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="MSSV"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userProfile.MSSV}
                  onChange={(e) => setUserProfile({ ...userProfile, MSSV: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Họ và tên"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userProfile.hovaten}
                  onChange={(e) => setUserProfile({ ...userProfile, hovaten: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Giới tính"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userProfile.gioitinh}
                  onChange={(e) => setUserProfile({ ...userProfile, gioitinh: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ngày sinh"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userProfile.dob}
                  onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Địa chỉ"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userProfile.diachi}
                  onChange={(e) => setUserProfile({ ...userProfile, diachi: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Quê quán"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userProfile.quequan}
                  onChange={(e) => setUserProfile({ ...userProfile, quequan: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Số điện thoại"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userProfile.sdt}
                  onChange={(e) => setUserProfile({ ...userProfile, sdt: e.target.value })}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ mt: "15px" }}>
              Cập nhật
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdateProfile;
