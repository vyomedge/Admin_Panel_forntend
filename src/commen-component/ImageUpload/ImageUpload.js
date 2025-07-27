// common-component/ImageUpload/ImageUpload.js
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

const ImageUpload = ({ name, label, multiple = false, altText = false }) => {
  const { control, setValue } = useFormContext();
  const [previews, setPreviews] = useState([]);

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
      render={({ field: { onChange, value } }) => {
        useEffect(() => {
          if (value && value.length > 0 && previews.length === 0) {
            // if coming from server as URL
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
        }, [value]);

        return (
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              {label || "Upload Image"}
            </Typography>

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
                    <IconButton
                      size="small"
                      onClick={() => handleRemove(index, onChange)}
                      sx={{ position: "absolute", top: 4, right: 4 }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>

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
                      />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      }}
    />
  );
};

export default ImageUpload;
