import React from "react";
import { Box, Paper, Grid } from "@mui/material";
import { FormProvider } from "react-hook-form";
import CommenTextField from "../../commen-component/TextField/TextField";
import ImageUpload from "../../commen-component/ImageUpload/ImageUpload";
import CommonButton from "../../commen-component/CommenButton/CommenButton";

const CategoryFormBase = ({ methods, onSubmit, isEdit = false, defaultImage }) => {
  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CommenTextField name="name" label="Category Name" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImageUpload name="image" label="Image" defaultImage={defaultImage} />
            </Grid>
            <Grid item xs={12}>
              <CommenTextField name="description" label="Description" multiline rows={4} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommenTextField name="metaTitle" label="Meta Title" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommenTextField name="metaDescription" label="Meta Description" />
            </Grid>
            <Grid item xs={12}>
              <CommonButton type="submit">
                {isEdit ? "Update Category" : "Add Category"}
              </CommonButton>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </FormProvider>
  );
};

export default CategoryFormBase;
