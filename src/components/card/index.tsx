import { Box, Stack, Typography } from "@mui/material";
import { ResponsiveImage } from "../responsive-image";

interface ProductCardProps {
  name: string;
  imageUrl?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ProductCard({ name, imageUrl, selected, onClick }: ProductCardProps) {
  return (
    <Box
      onClick={onClick}
      padding="16px"
      width="293.33px"
      height="335.33px"
      borderRadius={2}
      sx={{
        border: selected ? "2px solid #22007F" : "2px solid #D8DCE2",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": { boxShadow: "0 4px 10px rgba(0,0,0,0.15)" },
      }}
    >
      <Box
        width="100%"
        position="relative"
        sx={{
          aspectRatio: "1 / 1",
        }}
      >
        <ResponsiveImage
          imageProps={{
            src: imageUrl ? imageUrl : "",
            fill: true,
            alt: "product-image",
            draggable: false,
            priority: true,
            style: {
              objectFit: "contain",
            },
          }}
        />
        <Stack
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          right={8}
          top={8}
          width={32}
          height={32}
          sx={{
            position: "absolute",
            border: selected ? "none" : "2px solid #C5C5C5",
            backgroundColor: selected ? "#00E0B8" : "#fff",
            color: selected ? "#fff" : "transparent",
            transition: "all 0.2s ease",
          }}
        >
          ✓
        </Stack>
      </Box>
      <Typography
        textAlign="center"
        mb={1}
        fontWeight={500}
        color="primary"
      >
        {name}
      </Typography>
    </Box>
  );
}
