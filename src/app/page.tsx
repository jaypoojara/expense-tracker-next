"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";

import LayoutWrapper from "@/components/Common/LayoutWrapper";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

import { ChartGrid } from "@/components/Dashboard/ChartGrid";
import { CardSection } from "@/components/Dashboard/CardSection";

export default function Home() {
  return (
    <Provider store={store}>
      <LayoutWrapper>
        <div className="my-5 mx-auto px-4">
          <DashboardHeader />
          <CardSection />
          <ChartGrid />
        </div>
      </LayoutWrapper>
    </Provider>
  );
}
