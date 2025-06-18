import useTheme from "@/hooks/useTheme";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, bgColor }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex gap-6 ${
        isDarkMode ? "dark" : "light"
      } bg-white p-6 rounded-2xl border border-gray-300`}
    >
      <div
        className="w-14 h-14 flex items-center justify-center text-[26px] rounded-full drop-shadow-xl"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xl mb-1 font-semibold">{label}</h6>
        <span
          className={`text-[22px] ${
            isDarkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          ₹{value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
