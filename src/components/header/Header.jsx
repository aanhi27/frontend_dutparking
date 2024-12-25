import * as React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home"; // Import HomeIcon
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import ExitToAppIcon
import { logOut } from "../../services/authenticationService";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleLogout = () => {
    logOut(); // Gọi hàm logOut từ service
    navigate("/login"); // Điều hướng về trang login
  };

  const handleHome = () => {
    navigate("/Home"); // Điều hướng về trang chủ (home)
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleHome} // Thêm sự kiện quay về home
          >
            <Box
              component={"img"}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: 6,
              }}
              src="/logo/devteria-logo.png"
            ></Box>
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="log out"
              color="inherit"
              onClick={handleLogout} // Gọi hàm handleLogout khi nhấn
            >
              <ExitToAppIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="home"
              color="inherit"
              onClick={handleHome} // Gọi hàm handleHome khi nhấn
            >
              <HomeIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
