import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

const AuthorNameInput = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <TextField
      label="Author Name"
      fullWidth
      {...register('authorName', {
        required: 'Author name is required',
        maxLength: {
          value: 100,
          message: 'Author name should not exceed 100 characters'
        }
      })}
      error={!!errors.authorName}
      helperText={errors.authorName?.message}
    />
  );
};

export default AuthorNameInput;
