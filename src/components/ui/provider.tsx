"use client";
//
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import "@fontsource-variable/roboto-mono/index.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Roboto, sans-serif" },
        body: { value: "Roboto, sans-serif" },
        mono: { value: "Roboto Mono Variable, monospace" },
      },
      fontWeights: {
        normal: { value: 400 },
        bold: { value: 700 },
      },
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
