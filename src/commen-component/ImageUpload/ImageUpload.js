import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Delete } from "@mui/icons-material";


const ImageUpload = ({
  name,
  label = "Upload Image",
  multiple = false,
  altText = false,
  disabled = false,
}) => {
  const { control, getValues } = useFormContext();
  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    console.log(getValues(name),  "getvalue" , name) 
    const value = getValues(name);
    if (value && value.length > 0 && previews.length === 0) {
      const initial = value.map((img) =>
        img.url
          ? { url: img.url, altText: img.altText || "" }
          : {
              file: img.file,
              preview: URL.createObjectURL(img.file),
              altText: img.altText || "",
            }
      );
      setPreviews(initial);
    }
  }, []);


  const handleImageChange = (e, onChange) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      altText: "",
    }));

    const updated = multiple ? [...previews, ...newPreviews] : newPreviews;

    setPreviews(updated);
    onChange(updated);
  };

  const handleRemove = (index, onChange) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onChange(updated);
  };

  const handleAltChange = (index, value, onChange) => {
    const updated = previews.map((item, i) =>
      i === index ? { ...item, altText: value } : item
    );
    setPreviews(updated);
    onChange(updated);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onChange } }) => (
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            {label}
          </Typography>

          {!disabled && (
            <Button variant="outlined" component="label">
              {multiple ? "Upload Images" : "Upload Image"}
              <input
                type="file"
                hidden
                accept="image/*"
                multiple={multiple}
                onChange={(e) => handleImageChange(e, onChange)}
              />
            </Button>
          )}
{console.log(previews , 'previews')}
          <Grid container spacing={2} mt={1}>
            {previews.map((img, index) => (
              
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box
                  border="1px solid #ccc"
                  borderRadius="8px"
                  p={1}
                  position="relative"
                >
                  <img
                    src={img.preview || img.url}
                    alt={`preview-${index}`}
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                  {!disabled && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemove(index, onChange)}
                      sx={{ position: "absolute", top: 4, right: 4 }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}

                  {altText && (
                    <TextField
                      label="Alt Text"
                      size="small"
                      fullWidth
                      margin="dense"
                      value={img.altText}
                      onChange={(e) =>
                        handleAltChange(index, e.target.value, onChange)
                      }
                      disabled={disabled}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    />
  );
};

export default ImageUpload;
