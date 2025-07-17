import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

const FeaturedImageAltInput = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <TextField
      label="Featured Image Alt Text"
      fullWidth
      {...register('featuredImage.altText', {
        required: 'Alt text is required'
      })}
      error={!!errors.featuredImage?.altText}
      helperText={errors.featuredImage?.altText?.message}
    />
  );
};

export default FeaturedImageAltInput;
