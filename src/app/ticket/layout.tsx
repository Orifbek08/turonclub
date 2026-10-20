import type { Metadata, Viewport } from "next";
import "../globals.css";

export const viewport: Viewport = { themeColor: "#000052" };

export const metadata: Metadata = {
  title: "MIHU × TURON",
  icons: { icon: "/brand/icon.svg", apple: "/brand/apple-icon.png" },
  // Faqat QR-kod orqali ochiladi: qidiruv tizimlariga ko'rsatilmaydi
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false },
};

export default function TicketLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
