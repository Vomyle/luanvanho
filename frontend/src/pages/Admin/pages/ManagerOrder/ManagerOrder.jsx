import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, TextField, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";

import {
  convertStatusOrder,
  convertUpdateStatuspayment,
  formatCurrency
} from "../../../../common";
import orderApi from "../../../../apis/order";
import DialogStatus from "../ManagerOrder/DialogStatus";
import DialogPayment from "../ManagerOrder/DialogPayment";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Mã đơn"
  },
  {
    id: "statusPayment",
    numeric: true,
    disablePadding: false,
    label: "Trạng thái thanh toán"
  },
  {
    id: "user",
    numeric: true,
    disablePadding: false,
    label: "Người đặt"
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email"
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Tổng đơn"
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Trạng thái"
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Địa chỉ"
  }
];

function EnhancedTableHead() {
  return (
    <TableHead sx={{ backgroundColor: "#F4F6F8" }}>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({ search, setSearch }) {
  return (
    <Toolbar
      sx={{
        py: 2,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <TextField
          placeholder="Tìm kiếm đơn hàng"
          size="medium"
          sx={{ width: "450px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function ManagerOrder() {
  const idRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [openPayment, setOpenPayment] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const { data: ordersData, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: () => orderApi.getAllOrder(),
    keepPreviousData: true
  });
  const orders = ordersData?.data.orders || [];

  const filteredOrders = orders.filter((order) => {
    const name = order.users?.email?.toLowerCase() || "";
    return name.includes(search.toLowerCase());
  });

  const handleClickOpen = (id) => {
    setOpen(true);
    idRef.current = id;
  };

  const handleClickOpenPayment = (id, currentStatus) => {
    setOpenPayment(true);
    idRef.current = id;
    setSelectedValue(currentStatus);
  };

  const updateOrderStatusMutation = useMutation({
    mutationFn: async (updateData) => {
      switch (updateData.status) {
        case "cancelled":
          await orderApi.setCancelledOrder(updateData.id);
          break;
        case "shipped":
          await orderApi.setShipperOrder(updateData.id);
          break;
        case "delivered":
          await Promise.all([
            orderApi.setDeliveredOrder(updateData.id),
            orderApi.setPaymentOrder(updateData.id, { statusPayment: "paid" })
          ]);
          break;
        case "payment":
          await orderApi.setPaymentOrder(updateData.id, {
            statusPayment: updateData.statusPayment
          });
          break;
        default:
          throw new Error("Invalid status");
      }
    },
    onSuccess: () => {
      setSuccessMessage("Order updated successfully");
      refetch();
    },
    onError: (error) => {
      console.error("Failed to update order:", error);
    }
  });

  const handleClose = (value) => {
    const id = idRef.current;
    const order = orders.find((order) => order.id === id);
    const currentStatus = order ? order.status : null;
    console.log("currentStatus", currentStatus);
    console.log("value", value);

    if (
      (currentStatus === "cancelled" &&
        (value === "shipped" || value === "delivered")) ||
      (currentStatus === "delivered" && value === "shipped") ||
      (currentStatus === "shipped" && value === "cancelled") ||
      (currentStatus === "delivered" && value === "cancelled")
    ) {
      alert("Invalid status transition");
      idRef.current = null;
      return;
    }

    setOpen(false);
    setSelectedValue(value);

    updateOrderStatusMutation.mutate({ id, status: value });
    idRef.current = null;
  };

  const handleClosePayment = (value) => {
    setOpenPayment(false);
    console.log("Selected value:", value);
    if (value !== null) {
      const id = idRef.current;
      updateOrderStatusMutation.mutate({
        id,
        status: "payment",
        statusPayment: value
      });
      idRef.current = null;
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessage("");
  };

  return (
    <React.Fragment>
      <DialogStatus
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <DialogPayment
        currentStatus={selectedValue}
        open={openPayment}
        onClose={handleClosePayment}
      />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            mb: 2,
            px: 4,
            py: 2,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography fontSize="24px" component="p">
            Quản lý đơn hàng
          </Typography>
        </Box>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar search={search} setSearch={setSearch} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead />
              <TableBody>
                {filteredOrders.map((order, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={order.id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {order.id}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() =>
                            handleClickOpenPayment(
                              order.id,
                              order.statusPayment
                            )
                          }
                        >
                          {convertUpdateStatuspayment(order?.statusPayment)}
                        </Button>
                      </TableCell>
                      <TableCell align="left">{order?.users?.name}</TableCell>
                      <TableCell align="left">{order?.users?.email}</TableCell>
                      <TableCell align="left">
                        {formatCurrency(order?.total)}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          color={
                            order.status === "Đã đặt hàng"
                              ? "warning"
                              : order.status === "Đang giao"
                              ? "primary"
                              : order.status === "Đã giao hàng"
                              ? "success"
                              : order.status === "Đã hủy"
                              ? "error"
                              : "secondary"
                          }
                          onClick={() => handleClickOpen(order.id)}
                          variant="outlined"
                        >
                          {convertStatusOrder(order?.status)}
                        </Button>
                      </TableCell>
                      <TableCell align="left">{order?.address}</TableCell>
                      <TableCell align="left">
                        {order.status === "Đã đặt hàng" && (
                          <Button
                            color="success"
                            variant="outlined"
                            onClick={() => handleClickOpen(order.id)}
                          >
                            Cập nhật
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={successMessage}
        />
      </Box>
    </React.Fragment>
  );
}
