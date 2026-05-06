import { Link, NavLink, Outlet } from "react-router";


const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">Life Spark Dashboard</div>
    </nav>
    {/* Page content here */}

    <Outlet></Outlet>
    
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </Link>
        </li>
        
        <li>
            <NavLink to="/dashboard/add-lesson" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Lesson">
              {/* Add Lesson icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
              <span className="is-drawer-close:hidden">Add Lesson</span>
            </NavLink>
        </li>

        {/* List item */}
        <li>
          <NavLink to="/dashboard/my-lessons" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Lessons">
            {/* My Lessons icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
            <span className="is-drawer-close:hidden">My Lessons</span>
          </NavLink>
        </li>

        

        {/* List item */}
        <li>
          <NavLink to="/dashboard/favorites" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Favorites">
            {/* Favorites icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M12 21.35l-1.75 -3.77 3.61 -3.61-1.79 -1.86 3.68 -3.68 3.68 3.68-1.79 1.86 3.61 3.61-1.75 3.77z"></path></svg>
            <span className="is-drawer-close:hidden">Favorites</span>
          </NavLink>
        </li>

        {/* List item */}
        <li>
          <NavLink to="/dashboard/profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
            {/* Profile icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span className="is-drawer-close:hidden">Profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</div>
    );
};

export default DashboardLayout;