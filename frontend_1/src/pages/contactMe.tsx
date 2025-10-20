import ContactCard from "../components/ContactCard";

export default function ContactMe() {
  return (
    <div
      id="contact-section"
      className="h-full mb-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-36 mb-6 sm:mb-10 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden text-white select-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
        {/* Left side - Contact Info */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-none lg:w-1/2 flex flex-col justify-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-blue-500">
              Let's
              <br />
              <span className="text-blue-400 lg:text-7xl">CONNECT</span>
            </h1>
            <div className="w-1/3 h-1 bg-red-400 rounded-full mx-auto lg:mx-0"></div>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left">
            Have a project in mind? Want to collaborate? I'm always open to
            discussing new opportunities and creative ideas.
          </p>

          <div className="flex flex-row justify-around space-y-3 sm:space-y-4">
            <div className="flex flex-row items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <a
                href="mailto:mrityunjayjha117@gmail.com"
                className="text-xs sm:text-base text-gray-300 hover:text-red-400 transition-colors break-all"
              >
                mrityunjay.jha2005@gmail.com
                <br />
                +91 8287-299-817
              </a>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs sm:text-base text-gray-300">
                NEW DELHI, INDIA
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form Card */}

        <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
          <ContactCard />
        </div>
      </div>
    </div>
  );
}
