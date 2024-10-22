export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SRS RecipeX",
  description: "SRS RecipeX where you can find recipes and share your own",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Intro",
      href: "/#introSection",
    },
    {
      label: "About Me",
      href: "/#aboutMeSection",
    },
    {
      label: "Skills",
      href: "/#skillsSection",
    },

    {
      label: "Projects",
      href: "/#projectsSection",
    },
    {
      label: "Blogs",
      href: "/#blogsSection",
    },
    {
      label: "Education",
      href: "/#educationSection",
    },
    {
      label: "Blogs",
      href: "/blogs",
    },
    {
      label: "Contact",
      href: "/#contactSection",
    },
  ],

  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Membership",
      href: "/membership",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "/about",
    },

    {
      label: "Login",
      href: "/auth/login",
    },
    {
      label: "Register",
      href: "/auth/register",
    },
    {
      label: "Dashboard",
      href: `/user/dashboard`,
    },
    {
      label: "Dashboard",
      href: `/admin/dashboard`,
    },
  ],
};
