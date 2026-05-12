import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import { HiUser } from "react-icons/hi2";
import { CgLogOut } from "react-icons/cg";
import logoimg from "../../../assets/logof.png";

const navLinkClass = ({ isActive }) =>
      `
      pb-1 border-b-2 transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-extrabold "
                : "text-gray-200 font-semibold border-transparent hover:text-violet-300 hover:border-violet-300"
      }
    `
    ;

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [userData] = useUser();

  // Handle Logout
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        // remove token
      localStorage.removeItem(

         'access-token'
      );

        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={navLinkClass}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/public-lessons"
          className={navLinkClass}
        >
          Public Lessons
        </NavLink>
      </li>

      {/* pricing for free users */}
      {user && !userData?.isPremium && (
        <li>
          <NavLink
            to="/pricing"
            className={navLinkClass}
          >
            Pricing
          </NavLink>
        </li>
      )}
      {/* premium badge */}
      {userData?.isPremium && (
        <li>
          <button className="btn btn-warning btn-sm ">Premium ⭐</button>
        </li>
      )}

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/add-lesson"
              className={navLinkClass}
            >
              Add Lesson
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-lessons"
              className={navLinkClass}
            >
              My Lessons
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="flex items-center text-lg md:text-2xl font-bold bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
          <img  className="hidden md:block h-10 w-auto md:h-14 object-contain" src={logoimg} alt="Logo" />
          <span className="">LifeLessons ✨</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal items-center gap-5 px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {/* IF USER LOGGED IN */}
        {user ? (
          <div className="dropdown dropdown-end">
            {/* Avatar */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring-2 ring-violet-400/40 hover:ring-violet-400 transition">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[999] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] bg-[#1E1B4B]/90 backdrop-blur-xl border border-white/10 rounded-2xl w-60 text-white"
            >
              <li className="mb-2 border-b border-white/10 pb-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-[16px] text-violet-300">
                    {user.displayName || "User"}
                  </span>
                </div>
              </li>

              <li>
                <Link
                  to={
                    userData?.role === "admin"
                      ? "/dashboard/admin/admin-profile"
                      : "/dashboard/profile"
                  }
                  className="hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <HiUser /> Profile
                </Link>
              </li>

              <li>
                <Link to="/dashboard"
                 className="hover:bg-white/10 rounded-xl transition-all duration-300"
                 >📊 Dashboard</Link>
              </li>

              <li className="mt-2 border-t border-white/10 pt-2">
                <button onClick={handleLogout} className="text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300">
                  <CgLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* IF NOT LOGGED IN */
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-outline px-5 py-2 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition backdrop-blur-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary px-5 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#4F46E5] text-white hover:scale-[1.03] transition-all duration-300 shadow-[0_10px_30px_rgba(124,58,237,0.35)]"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
