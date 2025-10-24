"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { RedeemsListResponse } from "../../../services/redeems/type";

type StepSelectPageProps = {
  redeemPages: RedeemsListResponse["redeem_pages"];
  onSelect: (item: RedeemsListResponse["redeem_pages"][number]) => void;
};

const StepSelectPage = ({ redeemPages, onSelect }: StepSelectPageProps) => {
  const router = useRouter();

  const handleSelect = (item: RedeemsListResponse["redeem_pages"][number]) => {
    if (item.status === "INACTIVE") {
      router.push("/redeem-error");
      return;
    }

    onSelect(item);
  };

  return (
    <Stack spacing={2} width="100%">
      <Typography variant="h6" textAlign="center">Escolha uma página de resgate</Typography>
      <Stack spacing={2} alignItems="center" width="100%">
        {redeemPages.map((item) => (
          <Button
            key={item.id}
            onClick={() => handleSelect(item)}
            color="secondary"
            variant="contained"
            sx={{
              borderRadius: "61px",
              padding: "16px",
              maxWidth: "500px",
              width: "100%"
            }}
          >
            <Typography
              fontWeight="600"
              fontSize="14px"
              color="#fff"
              textTransform="capitalize"
            >
              {item.title}
            </Typography>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default StepSelectPage;
