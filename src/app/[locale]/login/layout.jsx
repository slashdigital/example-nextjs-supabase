import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../../providers";
import MinimalHeader from "@/components/login/layout/minimal-header";
import "@/app/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login to Estimati App",
  description: "Estimate your next software projects",
};

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MinimalHeader title={"Login to Estimati App"} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
