import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Divider } from "@mui/material";
import { getToken } from "../services/localStorageService"; // Lấy token từ localStorageService

const AllProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchMSSV, setSearchMSSV] = useState("");
  const [filteredProfile, setFilteredProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    const token = getToken();

    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/DUTParking/profile/all_profiles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
        setProfiles(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Lỗi: ${error.message}`);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    const token = getToken();

    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
      return;
    }

    fetch(`http://localhost:8080/DUTParking/profile/all_profiles/${searchMSSV}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
        setFilteredProfile(data.length > 0 ? data[0] : null);
      })
      .catch((error) => {
        setError(`Lỗi: ${error.message}`);
      });
  };

  if (loading) {
    return <Typography variant="h6">Đang tải danh sách hồ sơ...</Typography>;
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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#f0f2f5" minHeight="100vh">
      <Card sx={{ minWidth: 400, maxWidth: 800, boxShadow: 4, borderRadius: 4, padding: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Danh sách hồ sơ người dùng
        </Typography>

        {/* Tìm kiếm theo MSSV */}
        <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
          <TextField
            label="Tìm kiếm MSSV"
            variant="outlined"
            fullWidth
            value={searchMSSV}
            onChange={(e) => setSearchMSSV(e.target.value)}
          />
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Box>

        {/* Hiển thị kết quả tìm kiếm */}
        {filteredProfile && (
          <Card sx={{ mb: 4, padding: 2 }}>
            <Typography>
              <strong>MSSV:</strong> {filteredProfile.mssv}
            </Typography>
            <Typography>
              <strong>Họ và tên:</strong> {filteredProfile.hovaten}
            </Typography>
            <Typography>
              <strong>Email:</strong> {filteredProfile.email}
            </Typography>
          </Card>
        )}

        {/* Hiển thị danh sách tất cả hồ sơ */}
        <Grid container spacing={2}>
          {profiles.map((profile, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ padding: 2 }}>
                <Typography>
                  <strong>MSSV:</strong> {profile.mssv}
                </Typography>
                <Typography>
                  <strong>Họ và tên:</strong> {profile.hovaten}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {profile.email}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default AllProfilesPage;
