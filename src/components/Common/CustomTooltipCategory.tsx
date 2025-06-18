interface CustomTooltipCategoryProps {
  category: string | number;
}

const CustomTooltipCategory = ({ category }: CustomTooltipCategoryProps) => (
  <p className="text-xs font-semibold text-purple-800 mb-1">{category}</p>
);

export default CustomTooltipCategory;
