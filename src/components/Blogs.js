import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../context/context";
import CircularProgress from "@mui/material/CircularProgress";

const pages = ["Apple", "Tesla", "Us", "Top Headlines"];
const settings = ["Logout"];

const Blogs = () => {
  const { news, getNews } = useAPI();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let row1news = [];
  let row2news = [];
  if (news.length > 0) {
    for (let i = 1; i < news.length; i++) {
      if (i < 4) {
        row1news.push(news[i]);
      } else {
        row2news.push(news[i]);
      }
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (name) => {
    console.log(name);
    setAnchorElNav(null);
    getNews(name);
    console.log(news);
  };
  const handleCloseUserMenu = (name) => {
    setAnchorElUser(null);
    if (name === "Logout") {
      navigate("/");
      localStorage.clear("token");
      window.location.reload();
    }
  };

  return (
    <div className="blog-container">
      <AppBar position="static" className="navbar-container">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Home
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center" className="nav-bar-text">
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  className="nav-bar-text"
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={localStorage.getItem("image")}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <section className="blogs">
        <div className="section-title">
          <h2>Featured Article</h2>
        </div>
        <div className="blog-center">
          <div className="blog-row-1">
            <div className="blog-row-1-column-1">
              {news.length > 0 ? (
                <article className="blog blog-row-1-column-1-container">
                  <img
                    src={news[0].urlToImage}
                    alt="coffee"
                    className="img blog-img blog-row-1-column-1-img"
                  />
                  <div className="blog-content blog-row-1-column-1-text-container">
                    <span className="span">{news[0].author}</span>
                    <h3>{news[0].title}</h3>
                    <p>{news[0].description}</p>
                    <a href={news[0].url}>Read More</a>
                  </div>
                </article>
              ) : (
                <div>
                  <CircularProgress disableShrink />
                </div>
              )}
            </div>
            <div className="blog-row-1-column-2">
              {news.length > 0 ? (
                row1news.map((each, i) => {
                  return (
                    <article className="blog row-1-column-2-container" key={i}>
                      <img
                        src={each.urlToImage}
                        alt="coffee"
                        className="img blog-img row-1-column-2-img"
                      />
                      <div className="blog-content row-1-column-2-content">
                        <span className="span">{each.author}</span>
                        <h3>{each.title}</h3>
                        <a href={each.url}>Read More</a>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div>
                  <CircularProgress disableShrink />
                </div>
              )}
            </div>
          </div>
          <div className="blog-row-2">
            <h2>Article</h2>
            <div className="blog-row-2-card-container">
              {news.length > 0 ? (
                row2news.map((each, i) => {
                  if (
                    each.urlToImage !== null &&
                    each.author !== null &&
                    each.title !== null &&
                    each.description !== null &&
                    each.url !== null
                  ) {
                    return (
                      <article className="blog" key={i}>
                        <img
                          src={each.urlToImage}
                          alt="coffee"
                          className="img blog-img"
                        />
                        <div className="blog-content">
                          <span className="span">{each.author}</span>
                          <h3>{`${each.title.substring(0, 50)}...`}</h3>
                          <p>{`${each.description.substring(0, 100)}...`}</p>
                          <a href={each.url}>Read More</a>
                        </div>
                      </article>
                    );
                  }
                })
              ) : (
                <div>
                  <CircularProgress disableShrink />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
