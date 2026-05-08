const Footer = () => {
  return (
    <footer className="">
      <div className=" px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-800 pb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                LS
              </div>
              <div>
                <h3 className="text-xl font-semibold">LifeSpark</h3>
                <p className="text-sm text-gray-400">
                  Learning resources & community
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Helping learners grow with quality tutorials, expert contributors,
              and thoughtful feedback.
            </p>

            <div className="text-sm space-y-1">
              <p className="text-gray-400">support@lifespark.com</p>
              <p className="text-gray-400">+8801728918054</p>
            </div>
          </div>

          {/* Company Links */}
          <nav aria-label="Company" className="space-y-2">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>
                <a className="hover:text-white" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources / Legal */}
          <nav aria-label="Resources" className="space-y-2">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>
                <a className="hover:text-white" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Terms
                </a>
              </li>
            </ul>
          </nav>

          {/* Newsletter + Social */}
          <div className="space-y-3">
            <h4 className="font-semibold">Stay up to date</h4>
            <p className="text-sm text-gray-400">
              Subscribe to receive product news and updates.
            </p>

            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Subscribe to newsletter"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="input input-sm input-bordered w-full bg-gray-800 text-gray-100"
              />
              <button className="btn btn-sm btn-primary" type="submit">
                Subscribe
              </button>
            </form>

            <div className="pt-2">
              <div className="flex items-center gap-3" aria-hidden="false">
                <a
                  href="https://www.linkedin.com/in/sohag-ali-7b1061284?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded hover:bg-gray-800"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gray-300"
                  >
                    <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06 1.14 0 2.07.92 2.07 2.06 0 1.14-.93 2.07-2.07 2.07zM20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67h-3.56V9h3.42v1.56h.05c.48-.9 1.63-1.86 3.35-1.86 3.58 0 4.24 2.36 4.24 5.43v6.32z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/14bkG6xmEha/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded hover:bg-gray-800"
                  aria-label="Facebook"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gray-300"
                  >
                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.2 10.44 22v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.84h2.74l-.44 2.9h-2.3V22C18.34 21.2 22 17.1 22 12.07z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded hover:bg-gray-800"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gray-300"
                  >
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153Zm-1.29 19.493h2.039L6.486 3.24H4.298l13.313 17.406Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sohag___s?igsh=NzZzYXI3Znl1dmRq"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded hover:bg-gray-800"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-300"
                  >
                    <path
                      d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/Sohag-Ali"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded hover:bg-gray-800"
                  aria-label="GitHub"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gray-300"
                  >
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.38-3.87-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.28 5.69.42.36.8 1.08.8 2.18v3.24c0 .31.21.67.8.56A11.52 11.52 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} LifeSpark. Developed by Sohag. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
