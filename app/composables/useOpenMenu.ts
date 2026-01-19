export const useOpenMenu = () => {
  const isMenuOpen = useState<boolean>("isMenuOpen", () => false);

  const setIsMenuOpen = (value: boolean) => {
    isMenuOpen.value = value;
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
  };
};
