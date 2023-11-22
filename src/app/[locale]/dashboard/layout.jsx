import AppLayout from "@/components/dashboard/layout/app-layout";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "App for Project",
  description: "Create new app with NextJs and Supabase",
};

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <AppLayout title={'App'}>{children}</AppLayout>
    </Providers>
  );
}
