type CustomTooltipAmountProps = {
  amount: string | number;
};

const CustomTooltipAmount = ({ amount }: CustomTooltipAmountProps) => (
  <p className="text-sm text-gray-600">
    Amount:{" "}
    <span className="text-sm font-medium text-gray-900 capitalize">
      ₹{amount}
    </span>
  </p>
);

export default CustomTooltipAmount;
