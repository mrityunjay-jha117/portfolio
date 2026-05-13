import { NumberTicker } from "@/components/ui/number-ticker";
import Text3DFlip from "@/components/ui/text-3d-flip";
export default function About() {
  return (
    <div
      id="about_section"
      className="h-auto lg:min-h-screen w-full flex flex-col lg:flex-row items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 justify-center gap-6 sm:gap-8 lg:gap-10 py-16 sm:py-12 select-none"
    >
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-none lg:w-1/2">
        <div className="flex flex-col justify-center items-center lg:items-start w-full text-white">
          <Text3DFlip
            as="h1"
            className="text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-blue-400 text-left mb-3 sm:mb-4"
            textClassName="bg-gray-900 text-blue-400"
            flipTextClassName="bg-gray-900 text-blue-400"
            rotateDirection="top"
          >
            About Me
          </Text3DFlip>
          <h2 className="text-red-400 font-bold text-left mb-2 text-base sm:text-lg lg:text-xl leading-relaxed">
            UnderGraduate in Computer Science Engineering <br />
            <span className="text-red-400">Delhi College of Engineering</span>
          </h2>
          <h2 className="w-full lg:max-w-xl text-left mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
            I'm a full-stack web developer with a passion for 3D web, game
            development, and cybersecurity. I blend engineering precision with
            creative flair—building secure, scalable apps and solving complex
            problems through code and competitive programming.
          </h2>

          {/* Stats Section - Responsive Flex */}
          <div className="flex flex-row flex-wrap items-center justify-start gap-6 sm:gap-8 lg:gap-12 mt-3 mb-4 sm:mb-6 w-full">
            <div className="text-xl sm:text-2xl font-extrabold text-center">
              3+ <br />
              <span className="font-thin text-sm sm:text-base lg:text-lg">
                projects built
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-center">
              500+ <br />
              <span className="font-thin text-sm sm:text-base lg:text-lg">
                problems solved
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-center">
              2 <br />
              <span className="font-thin text-sm sm:text-base lg:text-lg">
                internship done
              </span>
            </div>
          </div>

          {/* Coding Profiles - Simple inline links (dark theme) */}
          <div className="flex z-20 flex-col sm:flex-row flex-wrap justify-start gap-4 sm:gap-6 items-start sm:items-center mt-6 w-full">
            <div className="text-sm sm:text-base text-white">
              <a
                href="https://codeforces.com/profile/silent_cartographer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400  font-semibold cursor-pointer"
              >
                Codeforces
              </a>
              <span className=" ml-2 text-emerald-400">
                Specialist{" "}
                <span className="text-gray-200 font-medium">
                  {" "}
                  <NumberTicker value={1371} />
                </span>
              </span>
            </div>

            <div className="text-sm sm:text-base text-white">
              <a
                href="https://leetcode.com/u/idk_the_answer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 font-semibold  cursor-pointer"
              >
                LeetCode
              </a>
              <span className="text-red-500 ml-2">
                KNIGHT{" "}
                <span className="text-gray-400 font-medium">
                  <NumberTicker value={1860} />
                </span>
              </span>
            </div>
            <div className="text-sm sm:text-base text-orange-400">
              <a
                href="https://codolio.com/profile/silent_cartographer"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-orange-400 font-semibold  cursor-pointer"
              >
                Codolio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Placeholder for 3D model/image */}
      <div className="hidden lg:block w-1/2 flex items-center justify-center mt-6 lg:mt-0">
        <div className="text-center h-30 lg:h-50 bg-gray-800 rounded-2xl border border-gray-700" />
      </div>
    </div>
  );
}
