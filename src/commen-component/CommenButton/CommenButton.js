import React, { use, useState } from "react";
import { Button, CircularProgress } from "@mui/material";

const CommonButton = ({
  children,
  type = "button",
  fullWidth = true,
  variant = "contained",
  onClick,
  sx = {},
  loading = false,
  ...rest
}) => {
  
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{ mt: 2, ...sx }}
      disabled={loading || rest.disabled}
  
      {...rest}
    >
    {loading ? (<><CircularProgress size={20} sx={{mr:1}}/>Loading...</>) : (children)}
     
    </Button>
  );
};

export default CommonButton;
