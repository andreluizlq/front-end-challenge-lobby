"use client";

import { Box, Stack, Typography } from "@mui/material";
import { ResponsiveImage } from "../responsive-image";
import vector1 from "../../assets/vector1.svg";

export default function RedeemsFooter() {
  return (
    <Stack
      alignItems="center"
      spacing={1}
      direction="row"
      mt="auto"
      mb={1}
    >
      <Box sx={{ position: "relative" }}>
        <ResponsiveImage
          imageProps={{
            width: 16,
            height: 16,
            src: vector1,
            alt: "banner",
            draggable: false,
            priority: true,
          }}
        />
      </Box>
      <Typography fontSize={{ sm: "16px", xs: "12px" }}>2025</Typography>
      <Typography fontSize={{ sm: "16px", xs: "12px" }}>•</Typography>
      <Typography fontSize={{ sm: "16px", xs: "12px" }}>
        Empresa X em parceria com a Lobby
      </Typography>
    </Stack>
  );
}

