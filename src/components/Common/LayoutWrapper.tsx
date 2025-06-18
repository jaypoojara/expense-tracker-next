import useTheme from "@/hooks/useTheme";
import { ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${!isDarkMode ? "bg-light" : "bg-dark"} p-[10px]`}>
      {children}
    </div>
  );
};

export default LayoutWrapper;
