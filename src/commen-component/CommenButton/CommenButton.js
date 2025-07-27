import React from "react";
import { Button } from "@mui/material";

const CommonButton = ({
  children,
  type = "button",
  fullWidth = true,
  variant = "contained",
  onClick,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{ mt: 2, ...sx }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
