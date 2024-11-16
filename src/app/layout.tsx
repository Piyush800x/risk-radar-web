import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "Risk Radar",
  description: "Sophisticated vulnerabilities detection and alerting software",
};

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:invert-colors scroll-smooth dark:selection:bg-neutral-700 selection:bg-neutral-200 dark:selection:text-white" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
