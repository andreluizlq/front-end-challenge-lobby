import type { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import MuiProvider from "./providers/mui-provider";
import ReactQueryProvider from "./providers/react-query-provider";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <ReactQueryProvider>
          <MuiProvider>{children}</MuiProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
