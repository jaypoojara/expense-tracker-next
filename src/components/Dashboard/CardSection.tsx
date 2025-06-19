"use client";
import { cards } from "@/data/CardData";
import InfoCard from "../Cards/InfoCard";

export const CardSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {cards.map(({ icon: Icon, label, value }) => (
      <InfoCard
        key={label}
        icon={<Icon />}
        label={label}
        value={value}
        bgColor="#582cff"
      />
    ))}
  </div>
);
