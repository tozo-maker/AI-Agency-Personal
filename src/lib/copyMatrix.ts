export const businessTypes = [
  { value: "SaaS product", labelKey: "bt_saas" },
  { value: "Service business", labelKey: "bt_service" },
  { value: "E-commerce", labelKey: "bt_ecommerce" },
  { value: "Internal operations", labelKey: "bt_internal" },
  { value: "Something else", labelKey: "bt_other" },
];

export const focusAreas: Record<string, { value: string; labelKey: string }[]> = {
  "SaaS product": [
    { value: "AI-driven user onboarding", labelKey: "fa_saas_1" },
    { value: "automating internal ops", labelKey: "fa_saas_2" },
    { value: "predictive churn analysis", labelKey: "fa_saas_3" },
    { value: "enhancing product with AI", labelKey: "fa_saas_4" },
    { value: "streamlining support", labelKey: "fa_saas_5" },
  ],
  "Service business": [
    { value: "automating client onboarding", labelKey: "fa_service_1" },
    { value: "scaling delivery with AI", labelKey: "fa_service_2" },
    { value: "reducing manual data entry", labelKey: "fa_service_3" },
    { value: "improving team efficiency", labelKey: "fa_service_4" },
    { value: "systematizing knowledge", labelKey: "fa_service_5" },
  ],
  "E-commerce": [
    { value: "automating customer support", labelKey: "fa_ecom_1" },
    { value: "inventory & supply chain AI", labelKey: "fa_ecom_2" },
    { value: "personalized marketing", labelKey: "fa_ecom_3" },
    { value: "order fulfillment workflows", labelKey: "fa_ecom_4" },
    { value: "understanding our data", labelKey: "fa_ecom_5" },
  ],
  "Internal operations": [
    { value: "connecting siloed systems", labelKey: "fa_int_1" },
    { value: "automating repetitive tasks", labelKey: "fa_int_2" },
    { value: "building internal AI agents", labelKey: "fa_int_3" },
    { value: "replacing manual spreadsheets", labelKey: "fa_int_4" },
    { value: "optimizing resource allocation", labelKey: "fa_int_5" },
  ],
  "Something else": [
    { value: "exploring AI opportunities", labelKey: "fa_other_1" },
    { value: "validating an automation idea", labelKey: "fa_other_2" },
    { value: "getting unstuck with tech", labelKey: "fa_other_3" },
    { value: "finding operational bottlenecks", labelKey: "fa_other_4" },
  ],
};

export const copyMatrix: Record<string, Record<string, string>> = {
  "SaaS product": {
    "AI-driven user onboarding": "dc_saas_1",
    "automating internal ops": "dc_saas_2",
    "predictive churn analysis": "dc_saas_3",
    "enhancing product with AI": "dc_saas_4",
    "streamlining support": "dc_saas_5",
  },
  "Service business": {
    "automating client onboarding": "dc_service_1",
    "scaling delivery with AI": "dc_service_2",
    "reducing manual data entry": "dc_service_3",
    "improving team efficiency": "dc_service_4",
    "systematizing knowledge": "dc_service_5",
  },
  "E-commerce": {
    "automating customer support": "dc_ecom_1",
    "inventory & supply chain AI": "dc_ecom_2",
    "personalized marketing": "dc_ecom_3",
    "order fulfillment workflows": "dc_ecom_4",
    "understanding our data": "dc_ecom_5",
  },
  "Internal operations": {
    "connecting siloed systems": "dc_int_1",
    "automating repetitive tasks": "dc_int_2",
    "building internal AI agents": "dc_int_3",
    "replacing manual spreadsheets": "dc_int_4",
    "optimizing resource allocation": "dc_int_5",
  },
  "Something else": {
    "exploring AI opportunities": "dc_other_1",
    "validating an automation idea": "dc_other_2",
    "getting unstuck with tech": "dc_other_3",
    "finding operational bottlenecks": "dc_other_4",
  },
};

export function getDynamicCopyKey(
  businessType: string | null,
  focusArea: string | null,
): string {
  if (!businessType || !focusArea) return "";

  const typeMatrix = copyMatrix[businessType];
  if (typeMatrix && typeMatrix[focusArea]) {
    return typeMatrix[focusArea];
  }

  // Fallback
  return "dc_fallback";
}
