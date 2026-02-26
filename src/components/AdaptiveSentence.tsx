import React from "react";
import { InlineSelector } from "./InlineSelector";
import { businessTypes, focusAreas } from "../lib/copyMatrix";
import { useLanguage } from "../lib/i18n";

interface AdaptiveSentenceProps {
  businessType: string | null;
  focusArea: string | null;
  onBusinessTypeChange: (val: string) => void;
  onFocusAreaChange: (val: string) => void;
}

export function AdaptiveSentence({
  businessType,
  focusArea,
  onBusinessTypeChange,
  onFocusAreaChange,
}: AdaptiveSentenceProps) {
  const { t } = useLanguage();
  const currentFocusOptions =
    businessType && focusAreas[businessType]
      ? focusAreas[businessType]
      : focusAreas["Something else"];

  const translatedBusinessTypes = businessTypes.map(bt => ({
    value: bt.value,
    label: t(bt.labelKey as any)
  }));

  const translatedFocusAreas = currentFocusOptions.map(fa => ({
    value: fa.value,
    label: t(fa.labelKey as any)
  }));

  return (
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-text-main">
      {t('imBuildingA')}{" "}
      <InlineSelector
        options={translatedBusinessTypes}
        value={businessType}
        onChange={(val) => {
          onBusinessTypeChange(val);
          onFocusAreaChange("");
        }}
        placeholder="__________"
      />{" "}
      {t('andMyFocusIs')}{" "}
      <InlineSelector
        options={translatedFocusAreas}
        value={focusArea}
        onChange={onFocusAreaChange}
        placeholder="__________"
      />
      .
    </div>
  );
}
