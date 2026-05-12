import { NavLink, Outlet } from "react-router";
import useUser from "../hooks/useUser";
import Container from "../coponents/Container/Container";
import { BiAddToQueue } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { TbFileLike } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { FaBookMedical } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import LoadingDash from "../coponents/LoadingPage/LoadingDash";
import { Suspense } from "react";
import logoimg from "../assets/logof.png";

const navLinkClass = ({ isActive }) =>
  `
      flex
      items-center
      gap-3
      rounded-2xl
      px-4
      py-3
      transition-all
      duration-300
      ${
        isActive
          ? "bg-[#2A3142] border-[#4B5563] text-[#0dddcc] font-medium shadow-md"
          : "text-gray-300 font-medium hover:shadow-lg hover:shadow-purple-500/20"
      }
    `;

const DashboardLayout = () => {
  const [userData, isLoading] = useUser();
  if (isLoading) {
  return <LoadingDash />;
}

  return (
    <div className="drawer md:drawer-open bg-[#0F172A] text-white min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
    <nav className="navbar sticky top-0 z-50 w-full bg-[#111827]/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-6">

  <div className="flex items-center gap-4">

    <label
      htmlFor="my-drawer-4"
      aria-label="open sidebar"
      className="btn btn-square btn-ghost md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
        className="size-5"
      >
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
        <path d="M9 4v16"></path>
        <path d="M14 10l2 2l-2 2"></path>
      </svg>
    </label>

    <NavLink
      to="/"
      className="
        md:hidden
        text-lg
        font-black
        bg-gradient-to-r
        from-violet-300
        to-indigo-400
        bg-clip-text
        text-transparent
        flex
        items-center
        
      "
    >
      <img src={logoimg} alt="Logo" className="h-10 w-auto md:h-14 object-contain" />
      <span>LifeLessons ✨</span>
    </NavLink>

    <div className="hidden md:block text-lg md:text-xl font-bold bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
      Dashboard
    </div>

    

  </div>
</nav>
        {/* Page content here */}

        <Container>
          <Suspense fallback={<LoadingDash></LoadingDash>}>
            <Outlet />
          </Suspense>
        </Container>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className=" flex min-h-full flex-col items-start bg-[#111827] border-r border-white/10 backdrop-blur-xl is-drawer-close:w-14 is-drawer-open:w-72 transition-all duration-300 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow p-4 space-y-2">
            <li className="hidden md:block  ">
              <NavLink to="/" className={navLinkClass}>
                {/* Home icon */}
                <img src={logoimg} alt="Logo" className="h-8 w-auto  object-contain" />
                <span className="text-xl font-bold bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                  LifeLessons ✨
                </span>
              </NavLink>
            </li>

            {userData && userData?.role === "user" && (
              <>
                {/* Home item */}

                <li className="mt-15 md:mt-0">
                  <NavLink
                    to="/dashboard/user-home"
                    className={navLinkClass}
                    data-tip="Homepage"
                  >
                    {/* Home icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4 "
                    >
                      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Homepage</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-lesson"
                    className={navLinkClass}
                    data-tip="Add Lesson"
                  >
                    {/* Add Lesson icon */}

                    <BiAddToQueue />
                    <span className="is-drawer-close:hidden">Add Lesson</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to="/dashboard/my-lessons"
                    className={navLinkClass}
                    data-tip="My Lessons"
                  >
                    {/* My Lessons icon */}
                    <GiNotebook />
                    <span className="is-drawer-close:hidden">My Lessons</span>
                  </NavLink>
                </li>

                {/* favorite */}
                <li>
                  <NavLink
                    to="/dashboard/favorites"
                    className={navLinkClass}
                    data-tip="Favorites"
                  >
                    {/* Favorites icon */}

                    <TbFileLike />
                    <span className="is-drawer-close:hidden">Favorites</span>
                  </NavLink>
                </li>

                {/* profile */}
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={navLinkClass}
                    data-tip="Profile"
                  >
                    {/* Profile icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="is-drawer-close:hidden">Profile</span>
                  </NavLink>
                </li>
              </>
            )}

            {userData && userData?.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/admin-home"
                    className={navLinkClass}
                    data-tip="Homepage"
                  >
                    {/* Home icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Homepage</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-users"
                    className={navLinkClass}
                    data-tip="Manage Users"
                  >
                    {/* Home icon */}
                    <FaUsersCog />
                    <span className="is-drawer-close:hidden">
                      Manage Users{" "}
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-lessons"
                    className={navLinkClass}
                    data-tip="Manage Lessons"
                  >
                    {/* Home icon */}
                    <FaBookMedical />
                    <span className="is-drawer-close:hidden">
                      Manage Lessons
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/reported-lessons"
                    className={navLinkClass}
                    data-tip="Reported Lessons"
                  >
                    {/* Home icon */}
                    <MdReport />
                    <span className="is-drawer-close:hidden">
                      Reported Lessons
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-lesson"
                    className={navLinkClass}
                    data-tip="Add Lesson"
                  >
                    {/* Add Lesson icon */}

                    <BiAddToQueue />
                    <span className="is-drawer-close:hidden">Add Lesson</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to="/dashboard/my-lessons"
                    className={navLinkClass}
                    data-tip="My Lessons"
                  >
                    {/* My Lessons icon */}
                    <GiNotebook />
                    <span className="is-drawer-close:hidden">My Lessons</span>
                  </NavLink>
                </li>

                {/* favorite */}
                <li>
                  <NavLink
                    to="/dashboard/favorites"
                    className={navLinkClass}
                    data-tip="Favorites"
                  >
                    {/* Favorites icon */}

                    <TbFileLike />
                    <span className="is-drawer-close:hidden">Favorites</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/admin-profile"
                    className={navLinkClass}
                    data-tip="Profile"
                  >
                    {/* Profile icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="is-drawer-close:hidden">Profile</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
