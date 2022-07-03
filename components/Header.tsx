import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { BellIcon, LoginIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useUser } from "@auth0/nextjs-auth0";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { classNames } from "../utils/string";

const Header = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const currentRoute = router.asPath;

  const noUser = !user && !isLoading;

  const navigation = noUser
    ? [{ name: "Home", href: "/" }]
    : [
        { name: "Home", href: "/" },
        { name: "My Ratings", href: "/ratings" },
        { name: "My Favorites", href: "/favorites" },
        { name: "My Dislikes", href: "/dislikes" },
        { name: "Stock Update", href: "/stock-update" },
      ];
  const userNavigation = [
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
    { name: "Logout", href: "/api/auth/logout" },
  ];

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <div className="flex items-center divide-x-2 divide-lime-500 cursor-pointer hover:opacity-75">
                    <div className="flex-shrink-0 pr-1">
                      <Image
                        src="/weedly_logo_simple.png"
                        alt="Weedly"
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className=" pl-2 font-semibold text-lime-600 text-xl">
                      Weedly
                    </span>
                  </div>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-6 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.href === currentRoute
                              ? "bg-lime-400 text-gray-600"
                              : "text-gray-500 hover:bg-lime-300 hover:text-gray-600",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={
                            item.href === currentRoute ? "page" : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                {noUser ? (
                  <Link href="/api/auth/login">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-md text-sm font-medium text-gray-600 bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                      <LoginIcon className="-ml-1 mr-2 h-5 w-5" />
                      Login
                    </button>
                  </Link>
                ) : (
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="p-1 rounded-full text-gray-500 hover:bg-lime-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-lime-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm hover:ring-2 hover:ring-offset-2 hover:ring-offset-white hover:ring-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-lime-500">
                          <span className="sr-only">Open user menu</span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className={classNames(
                              isLoading ? "animate-pulse" : "",
                              "bg-gray-300 h-8 w-8 rounded-full"
                            )}
                            src={user?.picture || ""}
                            alt=""
                            width={32}
                            height={32}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              <Link href={item.href}>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-lime-300 hover:text-gray-600">
                                  {item.name}
                                </a>
                              </Link>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md bg-lime-400 text-gray-500 hover:bg-lime-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-lime-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === currentRoute
                      ? "bg-lime-400 text-gray-600"
                      : "text-gray-500 hover:bg-lime-300 hover:text-gray-600",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.href === currentRoute ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              {noUser ? (
                <div className="px-2">
                  <Link href="/api/auth/login">
                    <button className="group w-full flex justify-center items-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-lime-400 hover:bg-lime-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                      <LoginIcon
                        className="h-6 w-6 pr-2 text-gray-600 group-hover:text-gray-700"
                        aria-hidden="true"
                      />
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={classNames(
                          isLoading ? "animate-pulse" : "",
                          "bg-gray-300 h-10 w-10 rounded-full"
                        )}
                        src={user?.picture || ""}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-gray-600">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto p-1 rounded-full text-gray-500 hover:bg-lime-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-lime-500"
                    >
                      <span className="sr-only">View notification</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-lime-300 hover:text-gray-600"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
