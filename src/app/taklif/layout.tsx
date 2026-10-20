import type { Metadata, Viewport } from "next";
import "../globals.css";
import { MetaPixel } from "@/components/invite/MetaPixel";

export const viewport: Viewport = { themeColor: "#000052" };

export const metadata: Metadata = {
  title: "TURON бизнес форуми — таклиф",
  icons: { icon: "/brand/icon.svg", apple: "/brand/apple-icon.png" },
  // Maxfiy havola: qidiruv tizimlariga ko'rsatilmaydi
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false },
};

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz-Cyrl">
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
