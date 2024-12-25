import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Divider, Button, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/localStorageService";
import Header from "./header/Header";

const AllUserTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchMSSV, setSearchMSSV] = useState("");
  const navigate = useNavigate();

  // Fetch all tickets
  const fetchTickets = async () => {
    const token = getToken();

    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/DUTParking/services/ticket/all-user-tickets", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Log dữ liệu trả về để kiểm tra

      // Kiểm tra nếu dữ liệu trả về là một mảng các đối tượng vé
      if (Array.isArray(data)) {
        setTickets(data);
        setFilteredTickets(data);
      } else {
        setError("Dữ liệu không đúng định dạng.");
      }
    } catch (error) {
      setError(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSearch = () => {
    if (!searchMSSV) {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter((ticket) => ticket.mssv && ticket.mssv.includes(searchMSSV)); // Kiểm tra mssv
      setFilteredTickets(filtered);
    }
  };

  const handleDelete = async (id) => {
    const token = getToken();

    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/DUTParking/services/ticket/all-user-tickets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      alert("Vé đã được xóa");
      fetchTickets(); // Reload tickets after deletion
    } catch (error) {
      alert(`Lỗi khi xóa vé: ${error.message}`);
    }
  };

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
      <Header />

      <Card sx={{ minWidth: 400, maxWidth: 700, boxShadow: 4, borderRadius: 4, padding: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Quản lý vé của người dùng
          </Typography>

          <TextField
            label="Tìm kiếm MSSV"
            variant="outlined"
            fullWidth
            value={searchMSSV}
            onChange={(e) => setSearchMSSV(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginBottom: 2 }}>
            Tìm kiếm
          </Button>

          <Grid container spacing={2}>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <Grid item xs={12} sm={6} md={4} key={ticket.id}> {/* Thay ticketId bằng id */}
                  <Card sx={{ padding: 2 }}>
                    <Typography>
                      <strong>ID Vé:</strong> {ticket.id} {/* Sử dụng id */}
                    </Typography>
                    <Typography>
                      <strong>MSSV:</strong> {ticket.mssv} {/* Chỉnh lại tên thuộc tính mssv */}
                    </Typography>
                    <Typography>
                      <strong>Loại vé:</strong> {ticket.ticketName}
                    </Typography>
                    <Typography>
                      <strong>Ngày cấp:</strong> {new Date(ticket.issueDate).toLocaleDateString()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between">
                      <Button variant="contained" color="error" onClick={() => handleDelete(ticket.id)}>
                        Xóa
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1">Không có vé nào phù hợp với tìm kiếm.</Typography>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AllUserTicketsPage;
