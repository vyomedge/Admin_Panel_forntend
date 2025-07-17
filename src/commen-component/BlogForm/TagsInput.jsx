import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Chip, Box } from '@mui/material';

const TagsInput = () => {
  const { control, setValue, getValues } = useFormContext();

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const currentTags = getValues('tags') || [];
      if (currentTags.length >= 10) return;
      const newTag = e.target.value.trim();
      if (newTag && !currentTags.includes(newTag)) {
        setValue('tags', [...currentTags, newTag]);
      }
      e.target.value = '';
    }
  };

  const handleDelete = (tagToDelete) => {
    const updated = getValues('tags').filter(tag => tag !== tagToDelete);
    setValue('tags', updated);
  };

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      render={() => (
        <Box>
          <TextField
            label="Tags (max 10)"
            fullWidth
            onKeyDown={handleAddTag}
          />
          <Box mt={1}>
            {getValues('tags')?.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDelete(tag)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </Box>
      )}
    />
  );
};

export default TagsInput;
