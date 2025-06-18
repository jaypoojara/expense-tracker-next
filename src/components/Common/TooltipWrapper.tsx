import { ReactNode } from "react";

type TooltipWrapperProps = {
  children: ReactNode;
};

const TooltipWrapper = ({ children }: TooltipWrapperProps) => (
  <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
    {children}
  </div>
);

export default TooltipWrapper;
