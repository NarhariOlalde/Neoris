import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="20px">
      <Typography variant="h4" fontWeight="bold">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
};

export default Header;
