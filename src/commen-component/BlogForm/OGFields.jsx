import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

const OGFields = () => {
  const { register } = useFormContext();

  return (
    <Box>
      <TextField
        label="OG Title (optional)"
        fullWidth
        {...register('ogTags.title')}
        sx={{ mb: 2 }}
      />

      <TextField
        label="OG Description (optional)"
        fullWidth
        multiline
        rows={2}
        {...register('ogTags.description')}
        sx={{ mb: 2 }}
      />

      <TextField
        label="OG Image URL (optional)"
        fullWidth
        {...register('ogTags.image')}
      />
    </Box>
  );
};

export default OGFields;
