import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

const BlogTitleInput = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <TextField
      label="Blog Title"
      fullWidth
      {...register('title', { required: 'Blog title is required' })}
      error={!!errors.title}
      helperText={errors.title?.message}
    />
  );
};

export default BlogTitleInput;