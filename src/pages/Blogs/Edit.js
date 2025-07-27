// components/BlogForm/EditBlogForm.tsx
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import BlogFormBase from "../../commen-component/";
import { apiClient } from "../../lib/api-client";

const EditBlogForm = ({ blogId }) => {
  const methods = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      category: "",
      tags: "",
      featuredImage: "",
      imageAlt: "",
      metaTitle: "",
      metaDescription: "",
      ogTitle: "",
      ogDescription: "",
      status: "draft",
    },
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await apiClient.get(`/api/blogs/${blogId}`);
        methods.reset(data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.put(`/api/blogs/${blogId}`, data);
      console.log("Blog updated successfully", response.data);
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  return (
    <FormProvider {...methods}>
      {/* <BlogFormBase onSubmit={onSubmit} /> */}
    </FormProvider>
  );
};

export default EditBlogForm;
