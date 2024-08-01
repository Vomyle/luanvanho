import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../../../../../../apis/product";
import Editor from "../../../../../../components/Admin/Editor/Editor";
import TitleManager from "../../../../../../components/Admin/TitleManager";
import Input from "../../../../../../components/Input";
import categoryApi from "../../../../../../apis/category";
import colorApi from "../../../../../../apis/color";
import { BASE_URL_IMAGE } from "../../../../../../constants/index";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const previewImage = useMemo(() => {
    if (image instanceof Blob) {
      return URL.createObjectURL(image);
    } else if (typeof image === "string" && image) {
      return image;
    } else {
      return "";
    }
  }, [image]);
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      unitlnStock: {},
      productCouponId: "",
      colorId: [],
      categoryId: "",
      description: ""
    }
  });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1
  });

  // Get categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getAllCategory()
  });
  const categories = categoriesData?.data || [];

  // Get colors
  const { data: colorData } = useQuery({
    queryKey: ["colors"],
    queryFn: () => colorApi.getAllColor()
  });
  const colors = colorData?.data || [];

  const { id } = useParams();

  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getDetailProduct(id),
    enabled: true
  });
  const product = productData?.data?.product;

  const handleChangePhoto = (e) => {
    const fileFromLocal = e.target.files?.[0];
    setImage(fileFromLocal);
  };

  useEffect(() => {
    if (product) {
      const colorIds = product.productItems?.map((item) => item.colorId) || [];
      const unitlnStockMap = {};
      product.productItems?.forEach((item) => {
        unitlnStockMap[item.colorId] = item.unitlnStock;
      });
      reset({
        name: product.name,
        price: product.price,
        unitlnStock: unitlnStockMap,
        productCouponId: product.productCouponId,
        categoryId: product.categoryId,
        colorId: colorIds,
        description: product.description
      });
      setDescription(product.description);
      setImage(product.image ? `${BASE_URL_IMAGE}/${product.image}` : null);
    }
  }, [product, reset]);

  const updateProductMutation = useMutation({
    mutationFn: (mutationPayload) =>
      productApi.updateProduct(mutationPayload.id, mutationPayload.body),
    onSuccess: () => {
      navigate("/admin/product");
    }
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("productCouponId", data.productCouponId);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    const colorsArray = data.colorId.map((colorId) => ({
      colorId,
      unitlnStock: data.unitlnStock[colorId] || 0
    }));

    formData.append("colors", JSON.stringify(colorsArray));

    if (image && image instanceof Blob) {
      formData.append("image", image);
    }

    updateProductMutation.mutate({ id, body: formData });
  });

  // Watch colorId field to dynamically enable/disable unitlnStock inputs
  const selectedColors = watch("colorId");

  return (
    <Box>
      <TitleManager>Cập nhật sản phẩm</TitleManager>
      <Box
        onSubmit={onSubmit}
        component="form"
        sx={{ backgroundColor: "#fff", pb: 8, px: { xs: 1, md: 4 } }}
      >
        <Grid container spacing={5}>
          <Grid item md={6} xs={12}>
            <Box>
              <Typography
                sx={{ fontSize: "15px", color: "#555555CC", mb: "5px" }}
                component="p"
              >
                Tên sản phẩm
              </Typography>
              <Input
                name="name"
                register={register}
                errors={errors}
                fullWidth
                size="small"
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{ fontSize: "15px", color: "#555555CC", mb: "5px" }}
                component="p"
              >
                Giá tiền
              </Typography>
              <Input
                type="number"
                name="price"
                register={register}
                errors={errors}
                fullWidth
                size="small"
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{ fontSize: "15px", color: "#555555CC", mb: "5px" }}
                component="p"
              >
                Mã khuyến mãi
              </Typography>
              <Input
                type="number"
                name="productCouponId"
                register={register}
                errors={errors}
                fullWidth
                size="small"
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{ fontSize: "15px", color: "#555555CC", mb: "5px" }}
                component="p"
              >
                Mô tả sản phẩm
              </Typography>
              <Editor
                onContentChange={(value) => setDescription(value)}
                initialContent={description}
              />
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Typography
                sx={{ fontSize: "15px", color: "#555555CC", mb: "5px" }}
                component="p"
              >
                Loại sản phẩm
              </Typography>

              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="small"
                    error={Boolean(errors.categoryId?.message)}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    {categories.map((category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.categoryId?.message}>
                {errors.categoryId?.message}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <Box sx={{ mt: 2, display: "flex" }}>
                <Typography
                  sx={{ fontSize: "15px", color: "#555555CC", mb: "5px" }}
                  component="p"
                >
                  Số lượng tồn
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "#555555CC",
                    mb: "5px",
                    marginLeft: "150px"
                  }}
                  component="p"
                >
                  Màu
                </Typography>
              </Box>

              <Controller
                name="colorId"
                control={control}
                render={({ field }) => (
                  <Fragment>
                    {colors.map((color) => (
                      <Box
                        key={color.id}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Input
                          name={`unitlnStock[${color.id}]`}
                          defaultValue={
                            product?.productItems?.find(
                              (item) => item.colorId === color.id
                            )?.unitlnStock || ""
                          }
                          sx={{ width: "200px", marginRight: "40px", py: 1 }}
                          register={register}
                          errors={errors}
                          fullWidth
                          size="small"
                          disabled={!selectedColors.includes(color.id)}
                        />
                        <input
                          id={color.id}
                          type="checkbox"
                          value={color.id}
                          sx={{ marginLeft: "100px", py: 1 }}
                          checked={field.value.includes(color.id)}
                          onChange={(e) => {
                            const selectedColors = e.target.checked
                              ? [...field.value, color.id]
                              : field.value.filter((id) => id !== color.id);
                            field.onChange(selectedColors);
                          }}
                        />
                        {color.name}
                      </Box>
                    ))}
                  </Fragment>
                )}
              />
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{ fontSize: "15px", color: "#555555CC", mb: "5px" }}
                component="p"
              >
                Hình ảnh
              </Typography>
              <Button
                sx={{ width: "200px", py: 1 }}
                component="label"
                variant="outlined"
                color="success"
                startIcon={<CloudUploadIcon />}
              >
                Chọn file
                <VisuallyHiddenInput
                  onChange={handleChangePhoto}
                  accept="image/*"
                  type="file"
                />
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              {previewImage && (
                <img
                  style={{ borderRadius: "5px" }}
                  width="200"
                  src={previewImage}
                  alt="product-image"
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{ width: "200px", mt: 2 }}
          variant="contained"
        >
          Cập nhật sản phẩm
        </Button>
      </Box>
    </Box>
  );
}
