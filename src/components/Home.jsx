import { useNavigate } from "react-router-dom";
import Header from "./header/Header";
import { Box, Card, Typography, Button, Grid } from "@mui/material";

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
            {/* Group 1: All Profiles, All User Tickets, Ticket Info */}
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                {/* Ticket Info Button */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate("/ticket")}
                    sx={{ padding: "20px" }}
                  >
                    <Typography>Ticket </Typography>
                  </Button>
                </Grid>

                {/* Get All Profiles Button */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => navigate("/allprofile")}
                    sx={{ padding: "20px" }}
                  >
                    <Typography>Manage Users Profiles</Typography>
                  </Button>
                </Grid>

                {/* Get All User Tickets Button */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => navigate("/alluserticket")}
                    sx={{ padding: "20px" }}
                  >
                    <Typography>Manage Users Tickets</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* Group 2: Other Buttons */}
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                {/* Profile Button */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate("/profile")}
                    sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <Typography>Profile</Typography>
                  </Button>
                </Grid>

                {/* Buy Ticket Button */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => navigate("/buyticket")}
                    sx={{ padding: "20px" }}
                  >
                    <Typography>Buy Ticket</Typography>
                  </Button>
                </Grid>

                {/* Wallet Button */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={() => navigate("/recharge")}
                    sx={{ padding: "20px" }}
                  >
                    <Typography>Recharge</Typography>
                  </Button>
                </Grid>

                {/* Cart Button */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="info"
                    fullWidth
                    onClick={() => navigate("/cart")}
                    sx={{ padding: "20px" }}
                  >
                    <Typography>Cart</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
