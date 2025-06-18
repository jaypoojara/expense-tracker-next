import { ReactNode } from "react";
import CustomHeader from "./CustomHeader";
import useTheme from "@/hooks/useTheme";

type ChartWrapperProps = {
  title: string;
  children: ReactNode;
};

const ChartWrapper = ({ title, children }: ChartWrapperProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`card col-span-1 ${isDarkMode ? "dark" : "light"}`}>
      <CustomHeader>{title}</CustomHeader>

      {children}
    </div>
  );
};

export default ChartWrapper;
