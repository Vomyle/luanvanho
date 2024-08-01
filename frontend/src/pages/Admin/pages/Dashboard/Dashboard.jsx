import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import orderApi from "../../../../apis/order"; // Điều chỉnh đường dẫn import nếu cần

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [revenueData, setRevenueData] = useState([]);
  const [displayType, setDisplayType] = useState("daily");

  useEffect(() => {
    fetchData(displayType);
  }, [displayType]);

  const fetchData = async (type) => {
    let fetchFunction;
    switch (type) {
      case "daily":
        fetchFunction = orderApi.getSale;
        break;
      case "monthly":
        fetchFunction = orderApi.getMonthlyRevenue;
        break;
      case "annual":
        fetchFunction = orderApi.getAnnualRevenue;
        break;
      default:
        fetchFunction = orderApi.getSale;
        break;
    }

    try {
      const response = await fetchFunction();

      // Chúng ta sẽ kiểm tra chỉ cần có response.data
      if (response.data) {
        if (response.data.length > 0) {
          const data = response.data.map((item) => ({
            ...item,
            totalRevenue: parseFloat(item.totalRevenue)
          }));

          setRevenueData(data); // Đặt dữ liệu vào state
        } else {
          setRevenueData([]);
        }
      } else {
        console.error("Failed to fetch revenue data:", "No message provided");
        console.log("Full response data:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error fetching revenue data:",
          error.response.data || error.response.status
        );
        console.error("Error details:", error.response.data);
      } else {
        console.error("Error fetching revenue data:", error.message);
      }
    }
  };

  const handleDisplayTypeChange = (event) => {
    setDisplayType(event.target.value);
  };

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: revenueData.map((item) => {
      const label = item.date || item.month || item.year;
      console.log("Item for label:", label); // Log từng item cho labels
      return label;
    }),
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((item) => {
          const revenue = item.totalRevenue;
          return revenue;
        }),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true
      }
    ]
  };

  console.log("Chart data:", chartData); // Log dữ liệu biểu đồ để xác minh

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 5
      }}
    >
      <Button
        sx={{ fontSize: "30px", textTransform: "uppercase" }}
        color="secondary"
      >
        Tổng Quan
      </Button>
      <FormControl sx={{ mt: 5, minWidth: 200 }}>
        <InputLabel>Hiển Thị Theo</InputLabel>
        <Select value={displayType} onChange={handleDisplayTypeChange}>
          <MenuItem value="daily">Ngày</MenuItem>
          <MenuItem value="monthly">Tháng</MenuItem>
          <MenuItem value="annual">Năm</MenuItem>
        </Select>
      </FormControl>

      {chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No data available for the selected period.</p>
      )}
    </Box>
  );
}
