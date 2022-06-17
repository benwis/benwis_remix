import { Link } from "@remix-run/react";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: 'posts' },
    { name: 'About Me', href: 'about' },
    { name: 'Portfolio', href: 'portfolio' },

  ]
  
export function Nav(admin: boolean = false) {
  return (
    <nav className="relative bg-gray-50 dark:bg-gray-900 dark:text-white overflow-hidden">
      <div className="relative pt-6 pb-16 md:pb-6 sm:pb-24">
        <Popover>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="relative flex items-center justify-between sm:h-10" aria-label="Global">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  {/* <a href="/">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </a> */}
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-50  dark:bg-gray-900 dark:text-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:decoration-yellow-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href} className="font-medium text-white hover:decoration-yellow-400">
                    {item.name}
                  </Link>
                ))}
                {admin ? <Link to="posts/admin" className="font-medium text-white hover:decoration-yellow-400">
                    Admin
                </Link> : null}
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">          
                <span className="inline-flex rounded-md shadow mx-4">
                <button
                    id="theme-toggle"
                    type="button"
                    className="text-gray-500 dark:text-gray-400 hover:decoration-yellow-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                >
                <svg
                    id="theme-toggle-dark-icon"
                    className="w-5 h-5 hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    ></path>
                </svg>
                <svg
                    id="theme-toggle-light-icon"
                    className="w-5 h-5 hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    ></path>
                </svg>
                </button>
                </span>
                <span className="inline-flex rounded-md shadow mx-4">
                  <Link
                    to="login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:decoration-yellow-400"
                  >
                    Log in
                  </Link>
                </span>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white  dark:bg-gray-900 ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div className="-mr-2">
                    <Popover.Button className="bg-white  dark:bg-gray-900 dark:text-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:decoration-yellow-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:decoration-yellow-400"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <Link
                  to="login"
                  className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:decoration-yellow-400"
                >
                  Log in
                </Link>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </nav>
  );
}