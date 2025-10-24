"use client";

import { Box, Stack, CircularProgress } from "@mui/material";
import RedeemsFooter from "@/components/footer";

type ContainerProps = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const Container = ({ children, isLoading = false }: ContainerProps) => {
  return (
    <Box
      padding={{ md: "100px 140px", xs: "20px" }}
      sx={{
        backgroundColor: "#EFF6FF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding={{ md: "40px", xs: "20px" }}
        maxWidth="1200px"
        borderRadius="20px"
        sx={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {isLoading ? (
          <Stack flex={1} alignItems="center" justifyContent="center" width="100%">
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          children
        )}

        <Box mt={6}>
          <RedeemsFooter />
        </Box>
      </Stack>
    </Box>
  );
};

export default Container;
