import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Provider } from "./providers";
import { AppbarClient } from "../components/AppbarClient";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Provider>
          <div className="w-full min-h-screen bg-[#ebe6e6]">
            <AppbarClient />
            {children}
          </div>
        </Provider>
      </body>

    </html>
  );
}


