import type { Locale } from "~/types/locale";

export const menus = [
  { href: "/", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
  { href: "/accounts", label: "Account" },
  { href: "/categories", label: "Categories" },
  { href: "/settings", label: "Settings" },
];

export const languages: Locale[] = [
  { label: "English", value: "en", flag: "/flags/united-states.svg" },
  { label: "French", value: "fr", flag: "/flags/france.svg" },
  { label: "German", value: "de", flag: "/flags/germany.svg" },
  { label: "Spanish", value: "es", flag: "/flags/spain.svg" },
  { label: "Japanese", value: "ja", flag: "/flags/japan.svg" },
];
