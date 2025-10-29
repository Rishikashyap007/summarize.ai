"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { SummaryTable } from "@/components/dashboard/SummaryTable";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <SummaryTable />
    </DashboardLayout>
  );
}
