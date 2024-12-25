import { useNavigate } from "react-router-dom";
import Header from "./header/Header";
import { Box, Card, Typography, Button, Grid } from "@mui/material";
import ProfileIcon from "../assets/profile-icon.png";  // Hình ảnh Profile
import TicketIcon from "../assets/ticket-icon.png";    // Hình ảnh Thông tin vé
import BuyTicketIcon from "../assets/buy-ticket-icon.png"; // Hình ảnh Mua vé
import WalletIcon from "../assets/wallet-icon.png";   // Hình ảnh Nạp tiền
import CartIcon from "../assets/cart-icon.png";       // Hình ảnh Giỏ hàng

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
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
            minWidth: 350,
            maxWidth: 600,
            boxShadow: 4,
            borderRadius: 4,
            padding: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 4 }}>
            Welcome back!
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {/* Profile Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate("/profile")}
                sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <img src={ProfileIcon} alt="Profile" style={{ width: "40px", marginBottom: "10px" }} />
                <Typography>Profile</Typography>
              </Button>
            </Grid>

            {/* Ticket Info Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => navigate("/ticket")}
                sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <img src={TicketIcon} alt="Ticket Info" style={{ width: "40px", marginBottom: "10px" }} />
                <Typography>Ticket Info</Typography>
              </Button>
            </Grid>

            {/* Buy Ticket Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => navigate("/buyticket")}
                sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <img src={BuyTicketIcon} alt="Buy Ticket" style={{ width: "40px", marginBottom: "10px" }} />
                <Typography>Buy Ticket</Typography>
              </Button>
            </Grid>

            {/* Wallet Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                onClick={() => navigate("/recharge")}
                sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <img src={WalletIcon} alt="Wallet" style={{ width: "40px", marginBottom: "10px" }} />
                <Typography>Recharge</Typography>
              </Button>
            </Grid>

            {/* Cart Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="info"
                fullWidth
                onClick={() => navigate("/cart")}
                sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <img src={CartIcon} alt="Cart" style={{ width: "40px", marginBottom: "10px" }} />
                <Typography>Cart</Typography>
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
