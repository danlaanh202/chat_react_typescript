export const showThingsMobile = ({
  sidebar,
  main,
  profile,
}: {
  sidebar: boolean;
  main: boolean;
  profile: boolean;
}) => {
  if (sidebar) {
    return "show-sidebar";
  } else if (main) {
    return "show-main";
  } else if (profile) {
    return "show-profile";
  }
};
