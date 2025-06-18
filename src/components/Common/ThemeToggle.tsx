import React from "react";

import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "@/hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { changeTheme, isDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 text-sm font-medium">
        {isDarkMode ? (
          <>
            <FiMoon className="text-yellow-300 w-5 h-5" />
            <span className="text-gray-100">Dark</span>
          </>
        ) : (
          <>
            <FiSun className="text-yellow-500 w-5 h-5" />
            <span className="text-gray-800">Light</span>
          </>
        )}
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={changeTheme}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
