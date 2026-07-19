import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  BookOpen,
  Crown,
  Search,
  Shield,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUsersSlash } from "react-icons/fa";
import { useState } from "react";
import useTitle from "../../../../hooks/useTitle";
import TableSkeleton from "../../../../coponents/Skeleton/TableSkeleton";
//import { useQueryClient } from "@tanstack/react-query";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  // const queryClient = useQueryClient();

  // fetch users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const res = await axiosSecure.get("/users");

      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.toLowerCase()),
  );

  // make admin
  const handleMakeAdmin = async (id) => {
    const result = await Swal.fire({
      title: "Make Admin?",

      text: "This user will get full admin access.",

      icon: "warning",

      background: "var(--color-card)",

      color: "var(--color-card-foreground)",

      showCancelButton: true,

      confirmButtonColor: "var(--color-primary)",

      cancelButtonColor: "var(--color-base-300)",

      confirmButtonText: "Yes, Make Admin",

      cancelButtonText: "Cancel",

      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/admin/${id}`);

      if (res.data.modifiedCount) {
        // await queryClient.invalidateQueries({
        //   queryKey: ["admin"],
        // });

        // await queryClient.invalidateQueries({
        //   queryKey: ["users"],
        // });

        await refetch();
        Swal.fire({
          title: "👑 Admin Access Granted",

          text: "User promoted to admin successfully.",

          icon: "success",

          background: "var(--color-card)",

          color: "var(--color-card-foreground)",

          confirmButtonColor: "var(--color-primary)",

          timer: 2200,

          showConfirmButton: false,
        });

        await refetch();
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete user
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",

      text: "This user will be permanently removed from the platform.",

      icon: "warning",

      background: "var(--color-card)",

      color: "var(--color-card-foreground)",

      showCancelButton: true,

      confirmButtonColor: "var(--color-error)",

      cancelButtonColor: "var(--color-base-300)",

      confirmButtonText: "Yes, Delete",

      cancelButtonText: "Cancel",

      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}`);

        if (res.data.deletedCount) {
          Swal.fire({
            title: "🗑️ User Deleted",

            text: "User removed successfully.",

            icon: "success",

            background: "var(--color-card)",

            color: "var(--color-card-foreground)",

            confirmButtonColor: "var(--color-primary)",

            timer: 2200,

            showConfirmButton: false,
          });

          refetch();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ban / unban user
  const handleBanToggle = async (user) => {
    const result = await Swal.fire({
      title: user.isBanned ? "Unban User?" : "Ban User?",

      text: user.isBanned
        ? "User will regain platform access."
        : "User will lose platform access.",

      icon: "warning",

      background: "var(--color-card)",

      color: "var(--color-card-foreground)",

      showCancelButton: true,

      confirmButtonColor: user.isBanned ? "var(--color-success)" : "var(--color-error)",

      cancelButtonColor: "var(--color-base-300)",

      confirmButtonText: user.isBanned ? "Yes, Unban" : "Yes, Ban",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/ban-toggle/${user._id}`);

      if (res.data.modifiedCount) {
        Swal.fire({
          title: user.isBanned ? "✅ User Unbanned" : "🚫 User Banned",

          icon: "success",

          background: "var(--color-card)",

          color: "var(--color-card-foreground)",

          timer: 2000,

          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    useTitle("Manage Users"),
    (
      <div className="px-4 md:px-8 py-10">
        {/* heading */}
        <div className="mb-14">
          <div className="flex items-center gap-5">
            <div className=" w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles size={30} className="text-primary" />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-base-content">
                <span className="text-gradient-brand">
                  {" "}
                  Manage Users
                </span>{" "}
                👥
              </h1>

              <p className="text-muted-foreground text-lg mt-3">
                Manage all registered users
              </p>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* total users */}
          <div
            className="
            bg-card
            border
            border-border
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
          >
            <div>
              <h2 className="text-5xl font-black text-info">
                {users.length}
              </h2>

              <p className="text-muted-foreground mt-4">Total Users</p>
            </div>
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-info/10
                border
                border-info/20
                flex
                items-center
                justify-center
              "
            >
              <PiUsersThreeFill size={40} className="text-info" />
            </div>
          </div>

          {/* admins */}
          <div
            className="
            bg-card
            border
            border-border
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
          >
            <div>
              <h2 className="text-5xl font-black text-warning">
                {users.filter((user) => user.role === "admin").length}
              </h2>

              <p className="text-muted-foreground mt-4">Total Admins</p>
            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-warning/10
                border
                border-warning/20
                flex
                items-center
                justify-center
              "
            >
              <MdAdminPanelSettings size={40} className="text-warning" />
            </div>
          </div>

          {/* creators */}
          <div
            className="
            bg-card
            border
            border-border
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
          >
            <div>
              <h2 className="text-5xl font-black text-success">
                {users.filter((user) => user.totalLessons > 0).length}
              </h2>

              <p className="text-muted-foreground mt-4">Lessons Creators</p>
            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-success/10
                border
                border-success/20
                flex
                items-center
                justify-center
              "
            >
              <BookOpen size={40} className="text-success" />
            </div>
          </div>

          {/* banned users */}
          <div
            className="
    bg-card
    border
    border-border
    rounded-[30px]
    p-8
    shadow-2xl
    flex
    items-center
    justify-between
  "
          >
            <div>
              <h2 className="text-5xl font-black text-error">
                {users.filter((user) => user.isBanned).length}
              </h2>

              <p className="text-muted-foreground mt-4">Banned Users</p>
            </div>

            <div
              className="
      w-20
      h-20
      rounded-3xl
      bg-error/10
      border
      border-error/20
      flex
      items-center
      justify-center
    "
            >
              <FaUsersSlash size={40} className="text-error" />
            </div>
          </div>
        </div>

        {/* search */}
        <div
          className="
    mb-8
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-5
  "
        >
          {/* left */}
          <div>
            <h2
              className="
        text-2xl
        font-black
        text-gradient-brand
      "
            >
              Users Directory{" "}
              <span className="text-muted-foreground">{filteredUsers.length}</span>
            </h2>

            <p className="text-muted-foreground mt-2">Search users by name or email</p>
          </div>

          {/* search input */}
          <div className="relative w-full md:w-[400px]">
            <Search
              size={20}
              className="
        absolute
        left-5
        top-1/2
        -translate-y-1/2
        text-muted-foreground
      "
            />

            <input
              type="text"
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className=" w-full pl-14 pr-5 py-4 rounded-2xl bg-input border border-border text-base-content placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300
      "
            />
          </div>
        </div>

        {/* table */}
        {isLoading ? (
          <TableSkeleton rowsCount={5} colsCount={6} />
        ) : (
          <div
            className="
              w-full
              overflow-x-auto
              scrollbar-thin
              bg-card
              border
              border-border
              rounded-[32px]
              shadow-2xl
            "
          >
            <table className="table min-w-[950px] text-base-content">
    <thead>
      <tr className="border-b border-border text-muted-foreground text-xs md:text-sm">
        <th className="py-6">#</th>

        <th>User</th>

        <th>Role</th>

        <th>Lessons</th>

        <th>Status</th>

        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredUsers.length === 0 ? (
        <tr>
          <td
            colSpan="6"
            className="
              text-center
              py-20
            "
          >
            <div className="flex flex-col items-center">
              {/* icon */}
              <Users size={70} className="text-primary" />

              {/* title */}
              <h2
                className="
                  mt-8
                  text-3xl
                  md:text-4xl
                  font-black
                  text-base-content
                "
              >
                No Users Found
              </h2>

              {/* description */}
              <p
                className="
                  text-muted-foreground
                  mt-4
                  max-w-md
                  leading-8
                  text-sm
                  md:text-base
                "
              >
                No matching users available
              </p>
            </div>
          </td>
        </tr>
      ) : (
        filteredUsers.map((user, index) => (
          <tr
            key={user._id}
            className="
              border-b
              border-border
              hover:bg-hover
              transition-all
              duration-300
            "
          >
            {/* serial */}
            <td className="font-semibold text-muted-foreground text-xs md:text-sm">
              {index + 1}
            </td>

            {/* user */}
            <td className="py-5">
              <div className="flex items-center gap-3 md:gap-5">
                {/* image */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-20"></div>

                  <img
                    src={
                      user.photo ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    className="
                      relative
                      w-12
                      h-12
                      md:w-16
                      md:h-16
                      rounded-full
                      object-cover
                      border
                      border-border
                    "
                  />
                </div>

                {/* content */}
                <div>
                  <h2
                    className="
                      font-bold
                      text-sm
                      md:text-lg
                      text-gradient-brand
                    "
                  >
                    {user.name}
                  </h2>

                  <p className="text-xs md:text-sm text-info mt-1 break-all">
                    {user.email}
                  </p>
                </div>
              </div>
            </td>

            {/* role */}
            <td>
              {user.role === "admin" ? (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    md:px-4
                    py-2
                    rounded-full
                    bg-warning/10
                    text-warning
                    border
                    border-warning/20
                    text-[10px]
                    md:text-xs
                    font-semibold
                  "
                >
                  <Crown size={14} />
                  Admin
                </span>
              ) : (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    md:px-4
                    py-2
                    rounded-full
                    bg-primary/10
                    text-primary
                    border
                    border-primary/20
                    text-[10px]
                    md:text-xs
                    font-semibold
                  "
                >
                  <Users size={14} />
                  User
                </span>
              )}
            </td>

            {/* lessons */}
            <td>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  md:px-4
                  py-2
                  rounded-full
                  bg-success/10
                  text-success
                  border
                  border-success/20
                  text-xs
                  md:text-sm
                  font-semibold
                "
              >
                {user.totalLessons}
              </div>
            </td>

            {/* status */}
            <td>
              {user.isBanned ? (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    md:px-4
                    py-2
                    rounded-full
                    bg-error/10
                    text-error
                    border
                    border-error/20
                    text-[10px]
                    md:text-xs
                    font-semibold
                  "
                >
                  Banned
                </span>
              ) : (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    md:px-4
                    py-2
                    rounded-full
                    bg-success/10
                    text-success
                    border
                    border-success/20
                    text-[10px]
                    md:text-xs
                    font-semibold
                  "
                >
                  Active
                </span>
              )}
            </td>

            {/* actions */}
            <td>
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  items-start
                  md:items-center
                  gap-2
                "
              >
                {/* make admin */}
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="
                      px-3
                      md:px-5
                      py-2
                      md:py-3
                      rounded-2xl
                      bg-primary/10
                      text-primary
                      border
                      border-primary/20
                      flex
                      items-center
                      gap-2
                      text-xs
                      md:text-sm
                      font-semibold
                      hover:bg-primary
                      hover:text-primary-content
                      transition-all
                      duration-300
                    "
                  >
                    <Shield size={16} />
                    Make Admin
                  </button>
                )}

                {/* ban/unban */}
                <button
                  onClick={() => handleBanToggle(user)}
                  className={`
                    px-3
                    md:px-5
                    py-2
                    md:py-3
                    rounded-2xl
                    border
                    flex
                    items-center
                    gap-2
                    text-xs
                    md:text-sm
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      user.isBanned
                        ? `
                        bg-success/10
                        text-success
                        border-success/20
                        hover:bg-success
                        hover:text-success-content
                      `
                        : `
                        bg-error/10
                        text-error
                        border-error/20
                        hover:bg-error
                        hover:text-error-content
                      `
                    }
                  `}
                >
                  {user.isBanned ? "Unban" : "Ban"}

                  {user.isBanned ? "" : <FaBan size={16} />}
                </button>

                {/* delete */}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="
                    w-10
                    h-10
                    md:w-12
                    md:h-12
                    rounded-2xl
                    bg-error/10
                    text-error
                    border
                    border-error/20
                    flex
                    items-center
                    justify-center
                    hover:bg-error
                    hover:text-error-content
                    transition-all
                    duration-300
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
)}
      </div>
    )
  );
};

export default ManageUsers;
