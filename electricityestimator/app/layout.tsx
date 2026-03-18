import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FusionX Bill - Electricity Calculator",
  description: "Pakistan's most accurate electricity bill estimator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}  suppressHydrationWarning={true} >
        
           
          <LanguageProvider>
            <Header />
            <main className="pt-24 pb-10">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
               
   
      </body>
    </html>
  );
}