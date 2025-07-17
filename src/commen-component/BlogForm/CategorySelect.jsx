import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const categories = ['Tech', 'Health', 'Lifestyle', 'Travel', 'Food']; // Replace with dynamic list if needed

const CategorySelect = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const category = watch('category');

  const handleChange = (e) => {
    setValue('category', e.target.value);
  };

  return (
    <FormControl fullWidth error={!!errors.category}>
      <InputLabel>Category</InputLabel>
      <Select
        value={category || ''}
        onChange={handleChange}
        label="Category"
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors.category?.message}</FormHelperText>
    </FormControl>
  );
};

export default CategorySelect;
