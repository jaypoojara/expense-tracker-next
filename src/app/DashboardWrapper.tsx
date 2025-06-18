"use client";
import LayoutWrapper from "@/components/Common/LayoutWrapper";
import { CardSection } from "@/components/Dashboard/CardSection";
import { ChartGrid } from "@/components/Dashboard/ChartGrid";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import { ExpenseData } from "@/types/chart.types";

interface DashboardWrapperProps {
  data: ExpenseData;
}

const DashboardWrapper = ({ data }: DashboardWrapperProps) => {
  return (
    <Provider store={store}>
      <LayoutWrapper>
        <div className="my-5 mx-auto px-4">
          <DashboardHeader />
          <CardSection />
          <ChartGrid data={data} />
        </div>
      </LayoutWrapper>
    </Provider>
  );
};

export default DashboardWrapper;
