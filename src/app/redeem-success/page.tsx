"use client";

import { ResponsiveImage } from "../../components/responsive-image";
import { Box, Stack, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";
import Container from "../../components/container";

const RedeemSuccess = () => {
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

        <Stack alignItems="center">
          <Typography fontWeight="600" fontSize={{ md: "40px", xs: "28px" }} color="primary" mb="20px" textAlign="center">
            Presente resgatado! 🎉🥳
          </Typography>
          <Stack spacing="8px" mb="40px">
            <Typography fontWeight="400" fontSize={{ md: "20px", xs: "16px" }} color="info" textAlign="center">
              Seu pedido está em andamento!
            </Typography>
            <Typography fontWeight="400" fontSize={{ md: "20px", xs: "16px" }} color="info" textAlign="center">
              E não se preocupe, as alterações de status do envio chegam todas em seu e-mail!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>

  );
};

export default RedeemSuccess;
