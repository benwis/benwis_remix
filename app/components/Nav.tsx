import { Link, NavLink } from "@remix-run/react";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Theme, useTheme } from "~/utils/theme-provider";
import { Form } from "@remix-run/react";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: 'posts' },
    { name: 'About Me', href: 'about' },
    { name: 'Portfolio', href: 'portfolio' },
  ]
  
export function Nav({admin = true, email}:{admin?: boolean, email?: string | null}) {

    const [currentTheme, setTheme] = useTheme();
    
    const toggleTheme = () => {
        setTheme((prevTheme) =>
          prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        );
      };

  return (
    <nav className="relative bg-white dark:bg-gray-900 text-gray-700 dark:text-white">
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                      </svg>
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <NavLink key={item.name} to={item.href} className={({ isActive }) => isActive ? "font-medium text-gray-700 dark:text-white decoration-yellow-400 underline" : "font-medium text-gray-700 dark:text-white hover:decoration-yellow-400 hover:underline" } >
                    {item.name}
                  </NavLink>
                ))}
                {admin ? <NavLink to="posts/admin" className="font-medium text-gray-700 dark:text-white hover:decoration-yellow-400 hover:underline">
                    Admin
                </NavLink> : null}
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">          
                <span className="inline-flex rounded-md shadow mx-4">
                { currentTheme == "dark" ? <button
                    onClick={toggleTheme}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 bg-yellow-400 dark:text-text-gray-700 hover:bg-yellow-600"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>
                  </button> : 
                  <button
                  onClick={toggleTheme}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-yellow-400 bg-gray-700 hover:bg-gray-600"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>
                </button>
                  }
                </span>
                <span className="inline-flex rounded-md shadow mx-4">
                  {email ? <Form method="post" action="logout">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 bg-yellow-400 dark:text-text-gray-700 hover:bg-yellow-600"
                    >
                        Log out
                    </button>
                  </Form> :<Link
                    to="login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 bg-yellow-400 dark:text-text-gray-700 hover:bg-yellow-600"
                  >
                    Log in
                  </Link>}
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
                    <Popover.Button className="bg-white dark:bg-gray-900 dark:text-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) => isActive ? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white decoration-yellow-400 underline" : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:decoration-yellow-400 hover:underline" }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <Link
                  to="login"
                  className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 dark:bg-gray-900"
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