"use client";

import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RedeemsListResponse } from "@/services/redeems/type";
import ProductCard from "@/components/card";
import { enqueueSnackbar } from "notistack";

type StepRedeemFormProps = {
  selectedRedeem: RedeemsListResponse["redeem_pages"][number];
  onBack: () => void;
  onNext: () => void;
};

const StepRedeemItem = ({ selectedRedeem, onBack, onNext }: StepRedeemFormProps) => {
  const [selectedGift, setSelectedGift] = useState<string>("");

  const handleSubmit = () => {
    if (!selectedGift) {
      enqueueSnackbar("Selecione um presente antes de continuar!", {
        variant: "error",
        style: { fontFamily: "sans-serif" },
      })
      return;
    }
    onNext();
  };

  const handleSelectGift = (giftId: string) => {
    setSelectedGift(giftId);
  };

  return (
    <Stack spacing={4} width="100%" maxWidth="930px">
      <Typography variant="h6" textAlign="center">
        Escolha o seu presente! 🎁
      </Typography>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
      >
        {selectedRedeem.items.map((item) => (
          <Box key={item.customer_product_id}>
            <ProductCard
              name={item.name}
              imageUrl={item.image_url}
              selected={selectedGift === item.customer_product_id}
              onClick={() => {
                handleSelectGift(item.customer_product_id)
              }}
            />
          </Box>
        ))}
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt="40px">
        <Button
          color="info"
          variant="outlined"
          onClick={onBack}
          sx={{
            px: "20px",
            py: "14px",
            borderRadius: "61px",
          }}
        >
          <Typography
            fontWeight="600"
            fontSize="14px"
            color="info"
            textTransform="capitalize"
          >
            Voltar
          </Typography>
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            px: "20px",
            py: "14px",
            borderRadius: "61px",
          }}
        >
          <Typography
            fontWeight="600"
            fontSize="14px"
            color="#fff"
            textTransform="capitalize"
          >
            Continuar
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default StepRedeemItem;
