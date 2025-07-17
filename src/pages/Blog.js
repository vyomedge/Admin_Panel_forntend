import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Box } from '@mui/material';
import BlogTitleInput from '../commen-component/BlogForm/BlogTitleInput';
import CategorySelect from '../commen-component/BlogForm/CategorySelect';
import TagsInput from '../commen-component/BlogForm/TagsInput';
import UIDInput from '../commen-component/BlogForm/UIDInput';
import FeaturedImageUpload from '../commen-component/BlogForm/FeaturedImageUpload';
import FeaturedImageAltInput from '../commen-component/BlogForm/FeaturedImageAltInput';
import MetaFields from '../commen-component/BlogForm/MetaFields';
import OGFields from '../commen-component/BlogForm/OGFields';
import AuthorNameInput from '../commen-component/BlogForm/AuthorNameInput';
import { apiClient } from '../lib/api-client';


const BlogForm = () => {
  const methods = useForm({ mode: 'onBlur' });
  const { handleSubmit } = methods;

const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    // Basic fields
    formData.append("title", data.title);
    formData.append("authorName", data.authorName);
    formData.append("uid", data.uid);
    formData.append("category", data.category);

    // Tags
    data.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    // Featured Image (Base64 → File)
    if (data.featuredImage?.url) {
      const imageFile = base64ToFile(data.featuredImage.url, 'featured-image.png');
      formData.append("featuredImage", imageFile);
    }

    // Alt Text
    formData.append("featuredImageAlt", data.featuredImage?.altText || "");

    // Meta
    formData.append("meta[title]", data.meta.title);
    formData.append("meta[description]", data.meta.description);
    formData.append("meta[keywords]", data.meta.keywords);
    formData.append("meta[canonicalUrl]", data.meta.canonicalUrl);

    // OG Tags
    formData.append("ogTags[title]", data.ogTags.title);
    formData.append("ogTags[description]", data.ogTags.description);
    // formData.append("ogTags[image]", data.ogTags.image);  

    const res = await apiClient.post('/api/blogs', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log('✅ Blog created:', res.data);

  } catch (error) {
    console.error('❌ Error creating blog:', error.response?.data || error.message);
  }
};



  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="grid" gap={3}>
          <BlogTitleInput />
          <AuthorNameInput />
          <CategorySelect />
          <TagsInput />
          <UIDInput />
          <FeaturedImageUpload />
          <FeaturedImageAltInput />
          <MetaFields />
          <OGFields />
        </Box>
        <Box mt={3}>
          <Button variant="contained" type="submit">Submit Blog</Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default BlogForm;
