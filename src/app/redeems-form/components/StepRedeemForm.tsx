"use client";

import { useForm, Controller, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormValues, RedeemsListResponse } from "../../../services/redeems/type";
import { useQuery } from "@tanstack/react-query";
import { states } from "../../../services/States/type";
import { getStates } from "../../../services/States";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { PostRedeems } from "../../../services/redeems";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSnackbar } from "notistack"
import { CalendarToday } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

interface StepRedeemFormProps {
  selectedRedeem: RedeemsListResponse["redeem_pages"][number];
  onBack: () => void;
}

export default function StepRedeemForm({
  selectedRedeem,
  onBack,
}: StepRedeemFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar()

  const { data: states } = useQuery<states[]>({
    queryKey: ["states"],
    queryFn: getStates,
    refetchOnWindowFocus: false,
  });

  const schema = yup.object({
    redeemer_name: yup.string().required("Nome completo é obrigatório"),
    redeemer_document_number: yup
      .string()
      .required("CPF ou CNPJ é obrigatório"),
    redeemer_email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    redeemer_zipcode: yup.string().required("CEP é obrigatório"),
    redeemer_street: yup.string().required("Rua é obrigatória"),
    redeemer_number: yup.string().required("Número é obrigatório"),
    redeemer_complement: yup.string().required("Complemento é obrigatório"),
    redeemer_neighborhood: yup.string().required("Bairro é obrigatório"),
    redeemer_city: yup.string().required("Cidade é obrigatória"),
    redeemer_state: yup.string().required("Estado é obrigatório"),
    redeemer_country: yup.string().required("País é obrigatório"),
    items: yup
      .array()
      .of(
        yup.object({
          customer_product_id: yup.string().required(),
          size_name: yup.string().required(),
        })
      )
      .min(1, "Selecione pelo menos um tamanho")
      .required("Selecione pelo menos um tamanho"),
    extra_question_responses: yup
      .array()
      .of(
        yup.object({
          extra_question_id: yup.number().required(),
          answer: yup
            .mixed<string | Date>()
            .test("required", "Campo obrigatório", (value) => {
              return value !== undefined && value !== null && value !== "";
            }),
        })
      )
      .required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      redeemer_name: "",
      redeemer_document_number: "",
      redeemer_email: "",
      redeemer_zipcode: "",
      redeemer_street: "",
      redeemer_number: "",
      redeemer_complement: "",
      redeemer_neighborhood: "",
      redeemer_city: "",
      redeemer_state: "",
      redeemer_country: "",
      items: [],
      extra_question_responses: selectedRedeem.extra_questions.map((q) => ({
        extra_question_id: q.id,
        answer: "",
      })),
    },
  });
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const formatted = {
      ...data,
      redeemer_phone: "",
      extra_question_responses: data.extra_question_responses.map((item) => ({
        ...item,
        answer:
          item.answer instanceof Date
            ? `${String(item.answer.getDate()).padStart(2, "0")}/${String(
              item.answer.getMonth() + 1
            ).padStart(2, "0")}/${item.answer.getFullYear()}`
            : String(item.answer ?? ""),
      })),
    };

    try {
      const token = process.env.NEXT_PUBLIC_TOKEN!;
      await PostRedeems(token, formatted, selectedRedeem.id);
      enqueueSnackbar("Item resgatado com sucesso", {
        variant: "success",
        style: { fontFamily: "sans-serif" },
      })
      router.push("/redeem-success");

    } catch (error: any) {
      enqueueSnackbar(`${error.response.data.error.display_message}`, {
        variant: "error",
        style: { fontFamily: "sans-serif" },
      })
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (field: keyof FieldErrors<FormValues>) => {
    const error = (errors)[field];
    return error?.message;
  };

  const itemWithSizes = selectedRedeem.items.find(
    (item) => item.sizes && item.sizes.length > 0
  );

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} width="100%" maxWidth="930px">
      <Typography variant="h5" mt={3} textAlign="center">
        Finalize o seu resgate
      </Typography>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Dados do destinatário
        </Typography>

        <Stack spacing={3}>
          <Controller
            name="redeemer_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Nome completo*"
                error={!!errors.redeemer_name}
                helperText={getErrorMessage("redeemer_name")}
                fullWidth
              />
            )}
          />

          <Stack direction={{ md: "row", xs: "column" }} spacing={3}>
            <Controller
              name="redeemer_document_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  label="CPF ou CNPJ*"
                  error={!!errors.redeemer_document_number}
                  helperText={getErrorMessage("redeemer_document_number")}
                  sx={{ flex: "50%" }}
                />
              )}
            />

            <Controller
              name="redeemer_email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail*"
                  variant="standard"
                  error={!!errors.redeemer_email}
                  helperText={getErrorMessage("redeemer_email")}
                  sx={{ flex: "50%" }}
                />
              )}
            />
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Endereço de entrega
        </Typography>

        <Stack spacing={3}>
          <Stack spacing={3} direction={{ md: "row", xs: "column" }}>
            <Controller
              name="redeemer_zipcode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  label="CEP*"
                  error={!!errors.redeemer_zipcode}
                  helperText={getErrorMessage("redeemer_zipcode")}
                />
              )}
            />

            <Controller
              name="redeemer_street"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  label="Rua*"
                  error={!!errors.redeemer_street}
                  helperText={getErrorMessage("redeemer_street")}
                />
              )}
            />
          </Stack>

          <Stack direction={{ md: "row", xs: "column" }} spacing={3}>
            <Stack direction="row" spacing={3} flex="1 1 50%">
              <Controller
                name="redeemer_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número*"
                    variant="standard"
                    error={!!errors.redeemer_number}
                    helperText={getErrorMessage("redeemer_number")}
                    sx={{ flex: "1 1 50%" }}
                  />
                )}
              />

              <Controller
                name="redeemer_complement"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Complemento*"
                    variant="standard"
                    error={!!errors.redeemer_complement}
                    helperText={getErrorMessage("redeemer_complement")}
                    sx={{ flex: "1 1 50%" }}
                  />
                )}
              />
            </Stack>
            <Controller
              name="redeemer_neighborhood"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bairro*"
                  variant="standard"
                  error={!!errors.redeemer_neighborhood}
                  helperText={getErrorMessage("redeemer_neighborhood")}
                  sx={{ flex: "1 1 50%" }}
                />
              )}
            />
          </Stack>

          <Stack direction={{ md: "row", xs: "column" }} spacing={3}>
            <Controller
              name="redeemer_city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Cidade*"
                  variant="standard"
                  error={!!errors.redeemer_city}
                  helperText={getErrorMessage("redeemer_city")}
                  sx={{ flex: "1 1 50%" }}
                />
              )}
            />
            <Stack direction="row" spacing={3} flex="1 1 50%">
              <Controller
                name="redeemer_state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Estado*"
                    variant="standard"
                    error={!!errors.redeemer_state}
                    helperText={getErrorMessage("redeemer_state")}
                    sx={{ flex: "1 1 23%" }}
                  >
                    {states && states.length > 0 ? (
                      states.map((state) => (
                        <MenuItem key={state.id} value={state.sigla}>
                          {state.nome}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>
                        Carregando...
                      </MenuItem>
                    )}
                  </TextField>
                )}
              />

              <Controller
                name="redeemer_country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="País*"
                    variant="standard"
                    error={!!errors.redeemer_country}
                    helperText={getErrorMessage("redeemer_country")}
                    sx={{ flex: "1 1 23%" }}
                  >
                    <MenuItem value="Brasil">Brasil</MenuItem>
                  </TextField>
                )}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {itemWithSizes?.sizes && (
        <Stack maxWidth={{ md: "50%", xs: "100%" }}>
          <Controller
            name="items"
            control={control}
            render={({ field }) => (
              <TextField
                select
                variant="standard"
                fullWidth
                label={`Qual o seu tamanho (${itemWithSizes?.sizes_grid?.name})?`}
                value={field.value?.[0]?.size_name ?? ""}
                onChange={(e) => {
                  const selectedSize = itemWithSizes.sizes.find(
                    (size) => size.name === e.target.value
                  );
                  if (selectedSize) {
                    field.onChange([
                      {
                        customer_product_id: selectedSize.id,
                        size_name: selectedSize.name,
                      },
                    ]);
                  }
                }}
                error={!!errors.items}
                helperText={getErrorMessage("items")}
              >
                {itemWithSizes.sizes.map((size) => (
                  <MenuItem key={size.id} value={size.name}>
                    {size.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
      )}

      {selectedRedeem.extra_questions.length > 0 && (
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mt={2}>
            Perguntas Extras
          </Typography>

          <Stack spacing={3}>
            {selectedRedeem.extra_questions.map((question, index) => (
              <Controller
                key={question.id}
                name={`extra_question_responses.${index}.answer`}
                control={control}
                render={({ field }) => {
                  const commonProps = {
                    ...field,
                    fullWidth: true,
                    variant: "standard" as const,
                    label: question.question,
                    error: !!errors.extra_question_responses?.[index]?.answer,
                    helperText: errors.extra_question_responses?.[index]?.answer?.message,
                  };

                  switch (question.answer_type) {
                    case "text":
                      return <TextField {...commonProps} />;
                    case "text_area":
                      return <TextField {...commonProps} multiline rows={3} />;
                    case "select_one":
                      return (
                        <TextField {...commonProps} select>
                          {question.options.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </TextField>
                      );
                    case "date":
                      return (
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                          <DateField
                            label={question.question}
                            value={field.value ? new Date(field.value) : null}
                            onChange={(date) => {
                              field.onChange(date ?? null);
                            }}
                            format="dd/MM/yyyy"
                            error={!!errors.extra_question_responses?.[index]?.answer}
                            helperText={errors.extra_question_responses?.[index]?.answer?.message}
                            variant="standard"
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <CalendarToday sx={{ color: "action.active", cursor: "pointer" }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </LocalizationProvider>
                      );
                    default:
                      return <></>;
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      <Stack direction="row" justifyContent="space-between" mt="40px">
        <Button
          color="info"
          variant="outlined"
          onClick={onBack}
          sx={{ px: "20px", py: "14px", borderRadius: "61px" }}
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
          type="submit"
          color="secondary"
          variant="contained"
          disabled={isLoading}
          sx={{ px: "20px", py: "14px", borderRadius: "61px" }}
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
}
