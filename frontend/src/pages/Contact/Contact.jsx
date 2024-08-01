import { Box, Card, Container, Grid } from "@mui/material";
import React, { Fragment } from "react";
import GridProduct from "../../components/GridProduct";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";
import { BsPersonX } from "react-icons/bs";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
export default function Contact() {
  return (
    <Container sx={{ mt: 16 }}>
      <Grid alignItems="flex-start" container gap={2} pt={5} pb={3}>
        <Grid md={5} sx={{ padding: "10px" }}>
          {/* <Box
            sx={{
              fontSize: 30,
              fontWeight: 500,
              textTransform: "uppercase",
              mb: 3
            }}
          >
            {" "}
            Iron Style
          </Box> */}
          <img
            class="img-fluid"
            src="//theme.hstatic.net/200000555893/1000909465/14/logo.png?v=437"
            alt="logo Aurora Home - Hơi ấm trong căn nhà"
            width="134"
            height="45"
          />
        </Grid>

        <Grid md={6} sx={{ padding: "10px" }}>
          <Box sx={{ fontSize: 26.5, fontWeight: 500 }}>
            Thông tin và cách thức liên hệ tới Aurora Home
          </Box>
          <Box sx={{ paddingTop: "30px" }}>
            <Box sx={{ paddingTop: "6px", display: "flex" }}>
              {" "}
              <WrongLocationIcon sx={{ paddingRight: "15px", fontSize: 40 }} />
              <Box sx={{ paddingTop: "7px", fontSize: 25 }}>
                Địa chỉ:
                <Box sx={{ paddingTop: "7px", fontSize: 17 }}>
                  Cửa hàng đồ trang trí nhà cửa Aurora Home: 180 Cao Lỗ, Phường
                  5, Quận 8, Thành phố HCM
                </Box>
              </Box>
            </Box>
            <Box sx={{ paddingTop: "30px" }}>
              {" "}
              <Box sx={{ display: "flex" }}>
                <AddIcCallIcon sx={{ paddingRight: "15px", fontSize: 40 }} />
                <Box sx={{ paddingLeft: "10px", fontSize: 23 }}>
                  Điện thoại/ Zalo:
                  <Box sx={{ paddingTop: "7px", fontSize: 17 }}>
                    0779468946
                  </Box>{" "}
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", paddingTop: "30px" }}>
                <AttachEmailIcon />
                <Box sx={{ paddingLeft: "10px", fontSize: 25 }}>
                  Email:
                  <Box sx={{ paddingTop: "7px", fontSize: 17 }}>
                    {" "}
                    vole3581@gmail.com
                  </Box>{" "}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9540679024767!2d106.67529067479114!3d10.738023589408396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad027e3727%3A0x2a77b414e887f86d!2zMTgwIMSQLiBDYW8gTOG7lywgUGjGsOG7nW5nIDQsIFF14bqtbiA4LCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1720424036148!5m2!1svi!2s"
          width={1150}
          height={500}
          sx={{
            marginTop: "100px",
            style: "border:0",
            allowfullscreen: "",
            loading: "lazy",
            referrerpolicy: "no-referrer-when-downgrade"
          }}
        ></iframe>
      </Grid>
    </Container>
  );
}
