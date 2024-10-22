"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  XMarkIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ComponentType, ReactElement } from "react";

import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import { Logo } from "../../icons";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IMenu {
  icon?: ComponentType<{ className?: string }> | ReactElement | string;
  name: string;
  href: string;
  children?: IMenu[];
}

function isValidReactComponent(
  component: any
): component is ComponentType<{ className?: string }> {
  return typeof component === "function" || typeof component === "object";
}

const SidebarMenu = ({
  navigation,
  sidebarOpen,
  setSidebarOpen,
}: {
  navigation: IMenu[];
  sidebarOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setSidebarOpen: (open: boolean) => void;
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const pathname = usePathname();
  const { user } = useUser();

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const renderNavItem = (item: IMenu, depth = 0) => {
    const isOpen = openDropdowns.includes(item.name);
    const isActive =
      pathname === item.href ||
      (item.children && item.children.some((child) => pathname === child.href));

    const renderIcon = () => {
      if (!item.icon) return null;

      if (isValidReactComponent(item.icon)) {
        const IconComponent = item.icon as ComponentType<{
          className?: any;
        }>;
        return (
          <IconComponent className="h-6 w-6 shrink-0 mr-2" aria-hidden="true" />
        );
      } else if (React.isValidElement(item.icon)) {
        return React.cloneElement(item.icon as any, {
          className: "h-6 w-6 shrink-0 mr-2",
          "aria-hidden": true,
        });
      }

      return null;
    };

    if (item.children) {
      return (
        <li key={item.name}>
          <Link
            href={item.href}
            onClick={() => {
              toggleDropdown(item.name);
              setSidebarOpen(false);
            }}
            className={classNames(
              isActive
                ? "bg-gray-800 text-white"
                : "text-black dark:text-white hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-white",
              "group flex w-full items-center rounded-md p-2 text-sm font-semibold leading-6"
            )}
          >
            {renderIcon()}
            {item.name}
            <ChevronDownIcon
              className={classNames(
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200",
                isOpen ? "rotate-180" : ""
              )}
              aria-hidden="true"
            />
          </Link>
          <ul
            className={classNames(
              "mt-1 space-y-1 pl-4",
              "transition-all duration-300 ease-in-out",
              isOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            )}
          >
            {item.children.map((child: IMenu) =>
              renderNavItem(child, depth + 1)
            )}
          </ul>
        </li>
      );
    }

    return (
      <li key={item.name}>
        <Link
          href={item.href}
          onClick={() => setSidebarOpen(false)}
          className={classNames(
            isActive
              ? "bg-gray-800 text-white"
              : "text-black dark:text-white hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-white",
            "group flex items-center rounded-md p-2 text-sm font-semibold leading-6"
          )}
        >
          {renderIcon()}
          {item.name}
        </Link>
      </li>
    );
  };

  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto dark:bg-gray-900 bg-white px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <Link href="/">
                  <Logo />
                </Link>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation?.map((item: IMenu) => renderNavItem(item))}
                    </ul>
                  </li>

                  <li className="mt-auto">
                    <Link
                      href={
                        user?.role === "admin"
                          ? "/admin/profile"
                          : "/user/profile"
                      }
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                      <UserCircleIcon
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0"
                      />
                      Profile
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto dark:bg-gray-900 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item: IMenu) => renderNavItem(item))}
                </ul>
              </li>

              <li className="mt-auto">
                <Link
                  href={
                    user?.role === "admin" ? "/admin/profile" : "/user/profile"
                  }
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <UserCircleIcon
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0"
                  />
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
