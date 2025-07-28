// src/commen-component/QuillEditor/CommenQuillEditor.js

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Typography, Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CommenQuillEditor = ({
  name,
  label,
  required = false,
  minLength = 20,
  placeholder = "Write something...",
}) => {
  const { control } = useFormContext();

  return (
    <Box sx={{ my: 2 }}>
      {label && (
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
          validate: (value) => {
            const plainText = value.replace(/<[^>]+>/g, "").trim();
            if (plainText.length < minLength) {
              return `${label} must be at least ${minLength} characters`;
            }
            return true;
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <ReactQuill
              {...field}
              theme="snow"
              className="custom-quill"
              placeholder={placeholder}
              onChange={(content) => field.onChange(content)}
              style={{ backgroundColor: "#fff" }}
            />
            {error && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default CommenQuillEditor;
