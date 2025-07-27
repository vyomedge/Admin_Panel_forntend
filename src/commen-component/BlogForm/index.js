// components/BlogForm/BlogForm.jsx

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
// import BlogFormUI from "./BlogFormUI"; // your big form UI moved into a subcomponent

const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const BlogForm = ({ initialData, onSubmit, isEditMode }) => {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: initialData || {
      title: "",
      authorName: "",
      description: "",
      category: "",
      tags: [],
      uid: "",
      featuredImage: { url: "", altText: "" },
      meta: { title: "", description: "", keywords: "", canonicalUrl: "" },
      ogTags: { title: "", description: "", image: "" },
      status: "Draft",
    },
  });

  const { handleSubmit, reset } = methods;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      if (!isEditMode) {
        formData.append("uid", uuidv4());
      }

      formData.append("title", data.title);
      formData.append("authorName", data.authorName);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("status", data.status);

      data.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });

      if (data.featuredImage?.url) {
        const imageFile = base64ToFile(data.featuredImage.url, "featured.png");
        formData.append("featuredImage", imageFile);
      }
      formData.append("featuredImageAlt", data.featuredImage?.altText || "");

      formData.append("meta[title]", data.meta.title);
      formData.append("meta[description]", data.meta.description);
      formData.append("meta[keywords]", data.meta.keywords);
      formData.append("meta[canonicalUrl]", data.meta.canonicalUrl);

      formData.append("ogTags[title]", data.ogTags.title);
      formData.append("ogTags[description]", data.ogTags.description);
      formData.append("ogTags[image]", data.ogTags.image);

      await onSubmit(formData);
      toast.success(isEditMode ? "Blog updated!" : "Blog created!");
      if (!isEditMode) reset(); // clear only on add
    } catch (err) {
      toast.error("Error saving blog");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* <BlogFormUI isEditMode={isEditMode} isSubmitting={isSubmitting} /> */}
      </form>
    </FormProvider>
  );
};

export default BlogForm;



