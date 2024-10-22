"use client";

import SidebarMenu from "@/src/components/modules/dashboard/SidebarMenu";
import { ReactNode, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  adminNavigation,
  userNavigation,
} from "@/src/components/modules/dashboard/menuConstant";
import Link from "next/link";
import { ThemeSwitch } from "../../theme-switch";
import { logOutUser } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOutUser();
      router.push("/auth/login");
    } catch (error) {
      // Optionally, you can show an error message to the user here
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100" />
        </div>
      )}

      <SidebarMenu
        navigation={user?.role === "admin" ? adminNavigation : userNavigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/*3. Main Content with Header */}
      <div className="lg:pl-72">
        {/* Header */}
        <div className="dark:bg-[#111827] bg-white sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200  px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div
            aria-hidden="true"
            className="h-6 w-px bg-gray-900/10 lg:hidden"
          />

          <div className="flex flex-1 gap-x-4 justify-end lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Separator */}
              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              />

              {/* Profile dropdown */}
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <ThemeSwitch />
                <Menu as="div" className="relative ">
                  <MenuButton className="-m-1.5 flex gap-5 items-center p-1.5">
                    <span className="sr-only">Open user menu</span>

                    <span className="flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                      >
                        {user?.name?.firstName}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute bg-white dark:bg-gray-900 dark:text-white right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem key="/">
                      {user?.role === "admin" ? (
                        <Link
                          href="/admin/profile"
                          className="dark:text-white dark:hover:bg-gray-700 cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 "
                        >
                          Profile
                        </Link>
                      ) : (
                        <Link
                          href="/user/profile"
                          className="dark:text-white dark:hover:bg-gray-700 cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 "
                        >
                          Profile
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem key="logout">
                      <a
                        onClick={handleLogout}
                        className="dark:text-white dark:hover:bg-gray-700 cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 "
                      >
                        Logout
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
