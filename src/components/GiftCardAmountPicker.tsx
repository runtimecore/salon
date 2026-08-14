"use client";

import { useState } from "react";
import ActionLink from "@/components/ActionLink";

type Props = {
  giftCardUrl: string;
  amounts: readonly number[];
};

export default function GiftCardAmountPicker({ giftCardUrl, amounts }: Props) {
  const [selected, setSelected] = useState<string>(
    String(amounts[0] ?? "custom"),
  );

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {amounts.map((amount) => {
        const value = String(amount);
        const isSelected = selected === value;

        return (
          <ActionLink
            key={amount}
            href={giftCardUrl}
            pendingTitle="Gift card purchasing coming soon"
            className={`rounded-full border px-6 py-3 font-serif text-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
              isSelected
                ? "border-gold bg-gold text-white"
                : "border-sand bg-white/70 text-espresso hover:border-gold hover:bg-gold hover:text-white"
            }`}
            onClick={() => setSelected(value)}
          >
            ${amount}
          </ActionLink>
        );
      })}

      <ActionLink
        href={giftCardUrl}
        pendingTitle="Gift card purchasing coming soon"
        className={`rounded-full border px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
          selected === "custom"
            ? "border-gold bg-gold/10 text-gold-dark"
            : "border-sand bg-white/70 text-espresso hover:border-gold hover:text-gold-dark"
        }`}
        onClick={() => setSelected("custom")}
      >
        Custom
      </ActionLink>
    </div>
  );
}
