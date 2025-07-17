import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

const MetaFields = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Box>
      <TextField
        label="Meta Title"
        fullWidth
        {...register('meta.title', {
          required: 'Meta title is required',
          maxLength: {
            value: 60,
            message: 'Max 60 characters allowed'
          }
        })}
        error={!!errors.meta?.title}
        helperText={errors.meta?.title?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Meta Description"
        fullWidth
        multiline
        rows={3}
        {...register('meta.description', {
          required: 'Meta description is required',
          maxLength: {
            value: 160,
            message: 'Max 160 characters allowed'
          }
        })}
        error={!!errors.meta?.description}
        helperText={errors.meta?.description?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Meta Keywords (comma separated)"
        fullWidth
        {...register('meta.keywords')}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Canonical URL"
        fullWidth
        {...register('meta.canonicalUrl', {
          pattern: {
            value: /^https?:\/\/.+$/,
            message: 'Must be a valid URL'
          }
        })}
        error={!!errors.meta?.canonicalUrl}
        helperText={errors.meta?.canonicalUrl?.message}
      />
    </Box>
  );
};

export default MetaFields;
