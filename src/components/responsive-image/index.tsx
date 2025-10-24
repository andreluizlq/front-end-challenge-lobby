"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

export function ResponsiveImage({
  imageProps,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  imageProps: ImageProps;
}) {
  if (!imageProps) return null;

  return (
    <Image
      {...imageProps}
      {...rest}
      loader={({ src, width }) => `${src}?w=${width}&fit=cover`}
      fetchPriority={imageProps.priority ? "high" : "low"}
      loading={imageProps.priority ? "eager" : "lazy"}
    />
  );
}
