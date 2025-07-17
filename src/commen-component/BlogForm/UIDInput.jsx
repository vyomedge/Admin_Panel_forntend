import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';

const UIDInput = () => {
  const { register, setValue } = useFormContext();
  const title = useWatch({ name: 'title' });

  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      setValue('uid', slug);
    }
  }, [title, setValue]);

  return (
    <TextField
      label="UID (Slug)"
      fullWidth
      {...register('uid', {
        required: 'UID is required'
      })}
    />
  );
};

export default UIDInput;
