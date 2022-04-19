import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">{/* LOGO */}</div>
            <div className="ml-6 flex space-x-8">
              <Link href="/">
                <a className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
              </Link>
              <Link href="/authenticated-only">
                <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Authenticated Page
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {session?.user ? (
              <>
                <p>Hello {session.user.name || session.user.email}</p>
                <button
                  onClick={() => signOut()}
                  className="ml-4 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link href="/signin">
                  <a className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span>Sign In</span>
                  </a>
                </Link>
                <Link href="/signup">
                  <a className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span>Sign Up</span>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
