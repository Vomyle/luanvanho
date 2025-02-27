import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import colorApi from "../../../../../../apis/color";
import TitleManager from "../../../../../../components/Admin/TitleManager";
import Input from "../../../../../../components/Input";
import { createBrandSchema } from "../../../../../../validation/brand";

export default function CreateBrand() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: ""
    },
    resolver: yupResolver(createBrandSchema)
  });

  const createBrandMutation = useMutation({
    mutationFn: (body) => colorApi.create(body),
    onSuccess: () => {
      navigate("/admin/color");
    }
  });

  const onSubmit = handleSubmit((data) => {
    createBrandMutation.mutate(data);
  });
  return (
    <Box>
      <TitleManager>Thêm màu</TitleManager>
      <Box
        onSubmit={onSubmit}
        component="form"
        sx={{ backgroundColor: "#fff", pb: 8, py: 4, px: { xs: 1, md: 4 } }}
      >
        <Grid container>
          <Grid item md={6} xs={12}>
            <Box>
              <Typography
                sx={{ fontSize: "15px", color: "#555555CC", mb: "5px" }}
                component="p"
              >
                Tên màu
              </Typography>
              <Input
                name="name"
                register={register}
                errors={errors}
                fullWidth
                size="small"
              />
            </Box>
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{ width: "200px", mt: 2 }}
          variant="contained"
        >
          Thêm màu
        </Button>
      </Box>
    </Box>
  );
}
