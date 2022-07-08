import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import {
  BellIcon,
  CogIcon,
  HeartIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  StarIcon,
  ThumbDownIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useUser } from "@auth0/nextjs-auth0";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { classNames, getUserInitials } from "../utils/string";
import WeedlyLogo from "../assets/weedly_logo_simple.png";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const currentRoute = router.asPath;

  const noUser = !user && !isLoading;

  const navigation = noUser
    ? [{ name: "Home", href: "/", icon: HomeIcon }]
    : [
        { name: "Home", href: "/", icon: HomeIcon },
        { name: "Ratings", href: "/ratings", icon: StarIcon },
        { name: "Favorites", href: "/favorites", icon: HeartIcon },
        { name: "Dislikes", href: "/dislikes", icon: ThumbDownIcon },
        // TODO: { name: "Stock Update", href: "/stock-update", icon: ClockIcon },
      ];
  const userNavigation = [
    { name: "Profile", href: "/profile", icon: UserIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
    { name: "Logout", href: "/api/auth/logout", icon: LogoutIcon },
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
                      <Image src={WeedlyLogo} alt="" width={40} height={40} />
                    </div>
                    <span className=" pl-2 font-semibold text-lime-600 text-xl">
                      Weedly
                    </span>
                  </div>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-6 flex items-center space-x-4">
                    {navigation.map((item) => {
                      const current = currentRoute === item.href;
                      return (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              current
                                ? "bg-lime-500 text-white"
                                : "text-lime-600 hover:bg-lime-500 hover:text-white",
                              "group px-3 py-2 rounded-md flex items-center text-sm font-medium"
                            )}
                            aria-current={current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                current
                                  ? "text-white"
                                  : "text-lime-600 group-hover:text-white",
                                "h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span className="ml-1">{item.name}</span>
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                {noUser ? (
                  <Link href="/api/auth/login">
                    <button
                      type="button"
                      className="flex bg-lime-500 p-2 rounded-md items-center justify-center text-white hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    >
                      <LoginIcon className="h-6 w-6" aria-hidden="true" />
                      <span>Login</span>
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
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                          <span className="sr-only">Open user menu</span>
                          {user?.picture ? (
                            <Image
                              className="rounded-full"
                              src={user?.picture}
                              alt=""
                              width={32}
                              height={32}
                            />
                          ) : (
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-lime-500">
                              <span className="text-sm font-medium leading-none text-white">
                                {getUserInitials(user?.name || "Weedly User")}
                              </span>
                            </span>
                          )}
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
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    className={classNames(
                                      active ? "bg-lime-500 text-white" : "",
                                      "group flex items-center px-4 py-2 text-sm text-lime-600 hover:text-white hover:bg-lime-500"
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        active
                                          ? "bg-lime-500 text-white"
                                          : "text-lime-600 group-hover:text-white",
                                        "mr-3 h-6 w-6"
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span>{item.name}</span>
                                  </a>
                                </Link>
                              )}
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
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md bg-lime-500 text-white hover:bg-lime-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-lime-500">
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
              {navigation.map((item) => {
                const current = currentRoute === item.href;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      current
                        ? "bg-lime-500 text-white"
                        : "text-lime-600 hover:bg-lime-500 hover:text-white",
                      "group px-3 py-2 rounded-md flex items-center text-base font-medium"
                    )}
                    aria-current={current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        current
                          ? "text-white"
                          : "text-lime-600 group-hover:text-white",
                        "mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span>{item.name}</span>
                  </Disclosure.Button>
                );
              })}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              {noUser ? (
                <div className="px-2">
                  <Link href="/api/auth/login">
                    <button
                      type="button"
                      className="group w-full flex justify-center items-center p-2 rounded-md bg-lime-500 text-white hover:bg-lime-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    >
                      <LoginIcon className="h-6 w-6" aria-hidden="true" />
                      <span>Login</span>
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {user?.picture ? (
                        <Image
                          className="rounded-full"
                          src={user?.picture}
                          alt=""
                          width={40}
                          height={40}
                        />
                      ) : (
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                          <span className="text-sm font-medium leading-none text-white">
                            {getUserInitials(user?.name || "Weedly User")}
                          </span>
                        </span>
                      )}
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
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="group flex px-3 py-2 rounded-md text-base font-medium text-lime-600 hover:bg-lime-500 hover:text-white"
                      >
                        <item.icon
                          className="mr-3 h-6 w-6 text-lime-600 group-hover:text-white"
                          aria-hidden="true"
                        />
                        <span>{item.name}</span>
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
