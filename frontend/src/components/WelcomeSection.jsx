import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
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
              <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-xl text-base-content/60 ml-16">
              Ready to level up your coding skills?
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl transition-all duration-200 hover:opacity-90"
          >
            <div className="flex items-center gap-3 text-white font-bold text-lg">
              <ZapIcon className="w-6 h-6" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
