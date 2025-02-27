import React from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../../../apis/product";
import GridProduct from "../../../../components/GridProduct";
import ProductItem from "../../../../components/ProductItem/ProductItem";
import Pagination from "./modules/Panigation";
import SortProduct from "./modules/SortProduct";
import colorApi from "../../../../apis/color";
import categoryApi from "../../../../apis/category";
import useQuertConfig from "../../../../hooks/useQuertConfig";
import Aside from "./modules/Aside";
import "./styles.scss";

export default function ProductList() {
  const queryConfig = useQuertConfig();

  // Get products
  const { data: producstData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return productApi.getAllProduct(queryConfig);
    },
    keepPreviousData: true
  });

  const pageSize = producstData?.data.pagination.page_size;

  // Get categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return categoryApi.getAllCategory();
    }
  });
  const categories = categoriesData?.data || [];

  // Get brands
  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    /**
     * Fetches all brands from the API.
     *
     * @return {Promise<Object>} The response object containing the brand data.
     */
    queryFn: () => {
      // Fetch all brands from the API
      return brandApi.getAllBrand();
    }
  });
  const brands = brandsData?.data || [];

  // Tách ra trước khi render
  const productItems =
    producstData && producstData.data.products
      ? producstData.data.products.map((product) => {
          return {
            id: product.id,
            name: product.name,
            img: product.image,
            price: product.price,
            productCouponId: product.productCouponId,
            description: product.description,
            sold: product.sold,
            weight: product.weight
          };
        })
      : [];

  return (
    <Grid alignItems="flex-start" container spacing={2}>
      <Grid
        sx={{ backgroundColor: "#F5F5F5", mt: 2, pb: 3, borderRadius: "8px" }}
        item
        md={12}
        lg={2.2}
      >
        <Typography
          mb={4}
          fontSize="18px"
          textTransform="uppercase"
          fontWeight="600"
          component="p"
        >
          Bộ lọc tìm kiếm
        </Typography>
        <div className="filter">
          <Aside queryConfig={queryConfig} categories={categories} />
        </div>
      </Grid>
      <Grid item md={12} lg={9.8}>
        <Box>
          <SortProduct queryConfig={queryConfig} />
          <GridProduct>
            {productItems.map((item) => (
              <ProductItem key={item.id} {...item} />
            ))}
          </GridProduct>

          <Pagination pageSize={pageSize} queryConfig={queryConfig} />
        </Box>
      </Grid>
    </Grid>
  );
}
