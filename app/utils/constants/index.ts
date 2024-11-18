import type { Locale } from "~/types/locale";

export const sidebarLinks = [
  { href: "/", label: "Home", icon: "tabler:home" },
  { href: "/community", label: "Community", icon: "tabler:users" },
  { href: "/collections", label: "Collections", icon: "tabler:folder" },
  { href: "/find-jobs", label: "Find Jobs", icon: "tabler:briefcase" },
  { href: "/tags", label: "Tags", icon: "tabler:tag" },
  { href: "/profile", label: "Profile", icon: "tabler:user" },
  {
    href: "/ask-question",
    label: "Ask a question",
    icon: "tabler:question-mark",
  },
];

export const languages: Locale[] = [
  { label: "English", value: "en", flag: "/flags/united-states.svg" },
  { label: "French", value: "fr", flag: "/flags/france.svg" },
  { label: "German", value: "de", flag: "/flags/germany.svg" },
  { label: "Spanish", value: "es", flag: "/flags/spain.svg" },
  { label: "Japanese", value: "ja", flag: "/flags/japan.svg" },
];

export const themes = [
  { value: "light", label: "Light", icon: "ri:sun-fill" },
  { value: "dark", label: "Dark", icon: "akar-icons:moon-fill" },
  { value: "system", label: "System", icon: "eos-icons:network-file-system" },
];
