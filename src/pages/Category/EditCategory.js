import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CategoryFormBase from "./CategoryFormBase";
import { apiClient } from "../../lib/api-client";

const EditCategory = ({ categoryId }) => {
  const methods = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get(`/api/category/${categoryId}`);
      methods.reset(res.data);
    };
    fetchData();
  }, [categoryId]);

  const onSubmit = async (data) => {
    await apiClient.put(`/api/category/${categoryId}`, data);
  };

  return <CategoryFormBase methods={methods} onSubmit={onSubmit} isEdit defaultImage={methods.watch("image")} />;
};

export default EditCategory;
