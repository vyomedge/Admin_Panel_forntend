import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';

const MAX_SIZE = 100 * 1024; // 100KB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

const FeaturedImageUpload = () => {
  const { setValue, watch } = useFormContext();
  const imageUrl = watch('featuredImage.url');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      return setError('Only JPG/PNG files are allowed');
    }

    if (file.size > MAX_SIZE) {
      return setError('File size must be under 100KB');
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue('featuredImage.url', reader.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box>
      <Typography variant="subtitle1">Featured Image (JPG/PNG, max 100KB)</Typography>
      <Button variant="outlined" component="label" sx={{ mt: 1 }}>
        Upload Image
        <input type="file" hidden accept="image/jpeg, image/png" onChange={handleFileChange} />
      </Button>
      {error && <Typography color="error" mt={1}>{error}</Typography>}
      {imageUrl && (
        <Box mt={2}>
          <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      )}
    </Box>
  );
};

export default FeaturedImageUpload;
