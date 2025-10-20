export default function Sidenav() {
  const links = [
    {
      href: "https://www.linkedin.com/in/mrityunjay-jha-7b0436303/",
      label: "LinkedIn",
      src: "icons/sidebar_icons/linkedin.png",
    },
    {
      href: "https://x.com/Mrityunjay2027",
      label: "Twitter",
      src: "icons/sidebar_icons/twitter.png",
    },
    {
      href: "https://github.com/mrityunjay-jha117",
      label: "Github",
      src: "icons/sidebar_icons/github2.png",
    },
    {
      href: "https://leetcode.com/u/Mrityunjay2005/",
      label: "LeetCode",
      src: "icons/sidebar_icons/leetcode.png",
    },
    {
      href: "https://codeforces.com/profile/idk_the_answer",
      label: "Codeforces",
      src: "icons/sidebar_icons/codeforces.png",
    },
  ];

  return (
    <aside className="h-full w-full rounded-full  flex flex-col items-center justify-around shadow-lg">
      <ul className="space-y-13">
        {links.map(({ href, label, src }) => (
          <li key={label} className="group relative">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-5 w-5 items-center justify-center rounded-lg text-gray-300"
            >
              <img src={src} alt="NA" className="h-full w-full object-cover"/>
            </a>
            {/* Tooltip on hover */}
            <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
