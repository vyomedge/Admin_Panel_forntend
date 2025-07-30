import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CategoryFormBase from "./CategoryFormBase";
import { apiClient } from "../../lib/api-client";
import { useParams ,useNavigate } from "react-router-dom";
const EditCategory = () => {
  const methods = useForm();
  const Navigation =  useNavigate()
const param =  useParams()
const categoryId =  param.id
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get(`/api/category/${categoryId}`);
      methods.reset(res.data);

    };
    fetchData();
  }, [categoryId]);

  const onSubmit = async (data) => {
    await apiClient.put(`/api/category/${categoryId}`, data);
    Navigation('/category')
  };

  return <CategoryFormBase methods={methods} onSubmit={onSubmit} isEdit defaultImage={methods.watch("image")} />;
};

export default EditCategory;
