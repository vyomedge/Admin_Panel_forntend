import React from "react";
import { useForm } from "react-hook-form";
import CategoryFormBase from "./CategoryFormBase";
import { apiClient } from "../../lib/api-client";

const AddCategory = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      image: "",
    },
  });

  const onSubmit = async (data) => {
    await apiClient.post("/api/category", data);
    methods.reset();
  };

  return <CategoryFormBase methods={methods} onSubmit={onSubmit} />;
};

export default AddCategory;
