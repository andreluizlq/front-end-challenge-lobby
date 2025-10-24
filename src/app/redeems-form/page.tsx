"use client";

import { useState } from "react";
import { GetRedeems } from "@/services/redeems";
import { RedeemsListResponse, RedeemItem } from "@/services/redeems/type";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import StepSelectPage from "./components/StepSelectPage";
import StepRedeemItem from "./components/StepRedeemItem";
import StepRedeemForm from "./components/StepRedeemForm";
import Container from "@/components/container";

const RedeemsForm = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedRedeem, setSelectedRedeem] = useState<
    RedeemsListResponse["redeem_pages"][number] | null
  >(null);

  const { data: redeemsList, isLoading } = useQuery<RedeemsListResponse>({
    queryKey: ["redeems-list"],
    refetchOnWindowFocus: false,
    queryFn: () => GetRedeems(process.env.NEXT_PUBLIC_TOKEN!),
  });

  return (
    <Container isLoading={isLoading}>
      {step === 1 && redeemsList && (
        <StepSelectPage
          redeemPages={redeemsList.redeem_pages}
          onSelect={(item) => {
            setSelectedRedeem(item);
            setStep(2);
          }}
        />
      )}

      {step === 2 && selectedRedeem && (
        <StepRedeemItem
          selectedRedeem={selectedRedeem}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && selectedRedeem && (
        <StepRedeemForm
          selectedRedeem={selectedRedeem}
          onBack={() => setStep(2)}
        />
      )}
    </Container >
  );
};

export default RedeemsForm;
