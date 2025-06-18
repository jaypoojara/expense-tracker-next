import ThemeToggle from "../Common/ThemeToggle";
import useTheme from "@/hooks/useTheme";

const DashboardHeader = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex flex-col md:flex-row rounded-xl items-start md:items-center justify-between gap-4 px-4 py-4 border border-gray-200 my-4`}
    >
      <h2 className="text-xl font-bold mt-1 text-center">
        Expense Tracking Dashboard
      </h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full md:w-auto">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;
