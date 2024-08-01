import { Box, Card, Container, Grid } from "@mui/material";
import React, { Fragment } from "react";
import GridProduct from "../../components/GridProduct";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";
import { BsPersonX } from "react-icons/bs";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
export default function Introduce() {
  return (
    <Container sx={{ mt: 16 }}>
      <Grid>
        <h1 class="title_page">
          Cửa hàng home decor, đồ trang trí nhà cửa đẹp tại Tp.HCM | IROM STYLE
        </h1>

        <Box class="content-page rte py-3">
          <Box
            paddingTop={3}
            sx={{
              fontWeight: "900",
              fontStyle: "normal",
              // fontStyle: "oblique",
              fontSize: "larger"
            }}
          >
            Aurora Home - Hơi ấm trong căn nhà!
          </Box>
          <Box paddingTop={2} pb={3}>
            <strong
              sx={{
                fontWeight: "900",
                fontStyle: "normal",
                // fontStyle: "oblique",
                fontSize: "larger"
              }}
            >
              Aurora Home là cửa hàng home decor
            </strong>{" "}
            cung cấp các sản phẩm trang trí nhà cửa bao gồm:&nbsp;Đồ trang trí
            nhà cửa, Đồ dùng, sản phẩm gia dụng cao cấp, đồ decor nhà bếp
            và&nbsp;Set up và thi công các tiểu cảnh cây và hoa giả trang trí
            cho các công trình, nhà ở, căn hộ, quán cafe, shop quần áo.
          </Box>

          <Box
            class="youtube-embed-wrapper"
            sx={{ position: "relative", paddingBottom: "56.25%" }}
          >
            <iframe
              src="https://www.youtube.com/embed/_-6m8QAYhx8"
              width={1110}
              height={460}
            ></iframe>
          </Box>

          <Box
            sx={{
              paddingTop: "20px",
              fontWeight: "900",
              // fontStyle: "normal",
              fontStyle: "oblique",
              fontSize: "larger"
            }}
          >
            An tâm mua sắm đồ trang trí nhà cửa và đồ dùng nhà bếp tại Aurora
            Home
          </Box>
          <Box
            sx={{
              paddingTop: "10px"
            }}
          >
            Khách hàng ghé thăm Aurora Home có thể hoàn toàn an tâm bởi các giá
            trị và chất lượng sản phẩm mà Aurora Home đem lại. Tại đây, chúng
            tôi không chỉ cung cấp những sản phẩm có mẫu mã, kiểu dáng đẹp, độc,
            lạ mà còn chú ý lựa chọn các sản phẩm có chất lượng tốt, tỉ mỉ trong
            từng đường nét.
          </Box>
          <Box
            sx={{
              paddingTop: "10px"
            }}
          >
            Đến với cửa hàng đồ decor trang trí nhà cửa Aurora Home, các bạn sẽ:
          </Box>
          <Box
            sx={{
              paddingTop: "10px",
              fontWeight: "900",
              fontStyle: "normal",
              // fontStyle: "oblique",
              fontSize: "medium"
            }}
          >
            <Box>
              Đảm bảo chất lượng hàng hoá với các chính sách bảo hành và chính
              sách đổi hàng.
            </Box>
            <Box
              sx={{
                paddingTop: "10px",
                fontWeight: "900",
                fontStyle: "normal",
                // fontStyle: "oblique",
                fontSize: "larger"
              }}
            >
              An tâm đống gói khi vận chuyển xa.
            </Box>
            <Box
              sx={{
                paddingTop: "10px",
                fontWeight: "900",
                fontStyle: "normal",
                // fontStyle: "oblique",
                fontSize: "larger"
              }}
            >
              Mẫu mã thiết kế độc đáo.
            </Box>
            <Box
              sx={{
                paddingTop: "10px",
                fontWeight: "900",
                fontStyle: "normal",
                // fontStyle: "oblique",
                fontSize: "larger"
              }}
            >
              Nhận tư vấn sản phẩm decor thích hợp với không gian.
            </Box>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
