import React, { use, useState } from "react";
import { Button, CircularProgress } from "@mui/material";

const CommonButton = ({
  children,
  type = "button",
  fullWidth = true,
  variant = "contained",
  onClick,
  sx = {},
  lodaing = false,
  ...rest
}) => {
  
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{ mt: 2, ...sx }}
      disabled={lodaing || rest.disabled}
  
      {...rest}
    >
    {lodaing?(<><CircularProgress size={20}/>Loading...</>):(children)}
     
    </Button>
  );
};

export default CommonButton;
