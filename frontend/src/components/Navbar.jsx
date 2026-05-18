import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon } from "lucide-react";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "sentinels";
    return (
      localStorage.getItem("theme") || document.documentElement.getAttribute("data-theme") || "sentinels"
    );
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* ignore in SSR */
    }
  }, [theme]);

  const isActive = (path) => location.pathname === path;
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg ">
            <svg
              viewBox="0 0 1080 1080"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="m1064.19,0H15.81C7.08,0,0,7.08,0,15.81v1048.37c0,8.73,7.08,15.81,15.81,15.81h1048.37c8.73,0,15.81-7.08,15.81-15.81V15.81c0-8.73-7.08-15.81-15.81-15.81ZM416.46,294.44l6.77-11.76,20.57-35.72c2.42-4.2,6.89-6.79,11.74-6.79l45.25-.05-.05-.09,39.26.04,39.26-.04-.05.09,45.25.05c4.84,0,9.32,2.59,11.74,6.79l20.57,35.72,6.77,11.76c2.42,4.2,2.41,9.37-.01,13.56l-52.1,90.01-32.34,56.02c-2.42,4.2-6.9,6.78-11.75,6.78h-54.68c-4.85,0-9.32-2.58-11.74-6.78l-32.34-56.02-52.1-90.01c-2.43-4.19-2.43-9.36-.02-13.56Zm425.5,172.02l-127.34,220.01-79.05,136.92c-5.92,10.26-16.86,16.57-28.71,16.57h-133.73c-11.84,0-22.78-6.32-28.7-16.57l-79.05-136.92-127.34-220.01c-5.93-10.25-5.94-22.88-.03-33.15l16.55-28.74,50.28-87.31c5.91-10.26,16.85-16.59,28.69-16.6l30.32-.03-13.23,22.97-10.98,19.07c-3.92,6.81-3.91,15.19.02,21.99l84.49,145.98,52.45,90.85c3.93,6.81,11.19,11,19.05,11h88.71c7.86,0,15.12-4.19,19.05-11l52.45-90.85,84.49-145.98c3.94-6.8,3.94-15.18.02-21.99l-10.98-19.07-13.23-22.97,30.32.03c11.84.01,22.78,6.34,28.69,16.6l50.28,87.31,16.55,28.74c5.91,10.26,5.9,22.9-.03,33.15Z"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
              CodeSentinel
            </span>
            <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to={"/problems"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/problems")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Problems</span>
            </div>
          </Link>

          {/* DASHBORD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/dashboard")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Dashbord</span>
            </div>
          </Link>

          {/* THEME TOGGLE */}
          <div className="ml-3 flex items-center">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme((t) => (t === "sentinels" ? "sentinels-light" : "sentinels"))}
              className="relative w-12 h-6 rounded-full border border-primary/20 flex items-center p-1 transition-colors"
            >
              <span
                className={
                  `block w-4 h-4 rounded-full transform transition-all ` +
                  (theme === "sentinels-light" ? "translate-x-6 bg-red-500" : "translate-x-0 bg-white")
                }
              />
            </button>
          </div>

          <div className="ml-4 mt-2">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm">Sign in</button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
