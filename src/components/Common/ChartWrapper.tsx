import { ReactNode } from "react";
import CustomHeader from "./CustomHeader";
import useTheme from "@/hooks/useTheme";
import ErrorBoundary from "./ErrorBoundary";

interface ChartWrapperProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  error?: Error | null;
}

const ChartWrapper = ({
  title,
  children,
  isLoading,
  error,
}: ChartWrapperProps) => {
  const { isDarkMode } = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[380px]">
          <div className="animate-pulse">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[380px] p-4">
          <div className="text-center">
            <p className="text-red-500 mb-2">Failed to load chart</p>
            <p className="text-sm text-gray-500">{error.message}</p>
          </div>
        </div>
      );
    }
    // return children;
    return <ErrorBoundary>{children}</ErrorBoundary>;
  };

  return (
    <div className={`card col-span-1 ${isDarkMode ? "dark" : "light"}`}>
      <CustomHeader>{title}</CustomHeader>
      {renderContent()}
    </div>
  );
};

export default ChartWrapper;
