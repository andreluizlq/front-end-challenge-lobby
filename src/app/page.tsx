"use client";

import { ResponsiveImage } from "../components/responsive-image";
import { Box, Button, Stack, Typography } from "@mui/material";
import logo from "../assets/logo.svg";
import Link from "next/link";
import Container from "../components/container";

const PageHome = () => {
  return (
    <Container>
      <Stack
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          position="relative"
          maxWidth="189px"
          width="100%"
          sx={{
            aspectRatio: "1 / 1",
            mb: 3,
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

        <Typography fontWeight="600" fontSize={{ md: "40px", xs: "28px" }} color="primary" mb="20px" textAlign="center">
          Bem-vindo!
        </Typography>

        <Stack spacing="8px" mb="40px">
          <Typography fontWeight="400" fontSize={{ md: "20px", xs: "16px" }} color="info" textAlign="center">
            Estamos muito felizes em ter você em nossa equipe!
          </Typography>
          <Typography fontWeight="400" fontSize={{ md: "20px", xs: "16px" }} color="info" textAlign="center">
            Preencha as perguntinhas a seguir para escolher o seu presente! 🎁
          </Typography>
        </Stack>

        <Link href={"/redeems-form"}>
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
            >
              Começar!
            </Typography>
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default PageHome;
