import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cardano2VN — Hydra Course",
  description: "Môi trường phát triển smart contract cho Hydra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}
