import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../services/provider";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/Navbar";
/* import Footer from "@/components/Footer"; */

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Equity Ai",
  description: "Equity Ai",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en" className="h-full">
        <body className={inter.className}>
          <NavBar />
          {children}
          <Toaster />
        {/*   <Footer /> */}
        </body>
      </html>
    </Providers>
  );
}
