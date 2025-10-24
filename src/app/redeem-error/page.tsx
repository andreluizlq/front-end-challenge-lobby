"use client";

import { ResponsiveImage } from "@/components/responsive-image";
import { Box, Button, Stack, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";
import error from "../../assets/error.svg";
import Link from "next/link";
import Container from "@/components/container";

const RedeemError = () => {
  return (
    <Container>
      <Stack flexGrow={1} alignItems="center" justifyContent="center">
        <Box
          position="relative"
          maxWidth="189px"
          width="100%"
          sx={{
            aspectRatio: "1 / 1",
          }}
        >
          <ResponsiveImage
            imageProps={{
              src: logo,
              width: 189,
              height: 189,
              alt: "logo",
              draggable: false,
              priority: true,
            }}
          />
        </Box>
        <Box
          position="relative"
          width="100%"
          sx={{
            aspectRatio: "5 / 2",
          }}
        >
          <ResponsiveImage
            imageProps={{
              src: error,
              fill: true,
              alt: "error-image",
              draggable: false,
              priority: true,
            }}
          />
        </Box>

        <Stack alignItems="center">
          <Typography fontWeight="600" fontSize={{ md: "40px", xs: "28px" }} color="secondary" mb="20px" textAlign="center">
            Oops! Página não encontrada.
          </Typography>
          <Stack spacing="8px" mb="40px">
            <Typography fontWeight="400" fontSize={{ md: "20px", xs: "16px" }} color="info" textAlign="center">
              Parece que você explorou demais, e acabou se perdendo.
            </Typography>
          </Stack>
        </Stack>
        <Link href={"/"}>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              px: "20px",
              py: "16px",
              borderRadius: "61px",
            }}
          >
            <Typography
              fontWeight="600"
              fontSize="14px"
              color="#fff"
              textTransform="capitalize"
              textAlign="center"
            >
              Voltar para página inicial
            </Typography>
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default RedeemError;
