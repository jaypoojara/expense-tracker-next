// "use client";
import { fetchExpenseData } from "@/services/api";
import DashboardWrapper from "./DashboardWrapper";

export default async function Home() {
  const data = await fetchExpenseData();

  return <DashboardWrapper data={data} />;
}
