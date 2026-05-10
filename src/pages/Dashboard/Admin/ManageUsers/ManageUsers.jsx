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

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  // fetch users
  const { data: users = [], refetch } = useQuery({
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

      background: "#111827",

      color: "#fff",

      showCancelButton: true,

      confirmButtonColor: "#8B5CF6",

      cancelButtonColor: "#374151",

      confirmButtonText: "Yes, Make Admin",

      cancelButtonText: "Cancel",

      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/admin/${id}`);

      if (res.data.modifiedCount) {
        Swal.fire({
          title: "👑 Admin Access Granted",

          text: "User promoted to admin successfully.",

          icon: "success",

          background: "#111827",

          color: "#fff",

          confirmButtonColor: "#8B5CF6",

          timer: 2200,

          showConfirmButton: false,
        });

        refetch();
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

      background: "#111827",

      color: "#fff",

      showCancelButton: true,

      confirmButtonColor: "#EF4444",

      cancelButtonColor: "#374151",

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

            background: "#111827",

            color: "#fff",

            confirmButtonColor: "#8B5CF6",

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

      background: "#111827",

      color: "#fff",

      showCancelButton: true,

      confirmButtonColor: user.isBanned ? "#10B981" : "#EF4444",

      cancelButtonColor: "#374151",

      confirmButtonText: user.isBanned ? "Yes, Unban" : "Yes, Ban",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/ban-toggle/${user._id}`);

      if (res.data.modifiedCount) {
        Swal.fire({
          title: user.isBanned ? "✅ User Unbanned" : "🚫 User Banned",

          icon: "success",

          background: "#111827",

          color: "#fff",

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
    <div className="px-4 md:px-8 py-10">
      {/* heading */}
      <div className="mb-14">
        <div className="flex items-center gap-5">
          <div className=" w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Sparkles size={30} className="text-primary" />
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white">
              <span className="bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent">
                {" "}
                Manage Users
              </span>{" "}
              👥
            </h1>

            <p className="text-gray-400 text-lg mt-3">
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
            bg-gradient-to-br
            from-[#111827]
            to-[#0F172A]
            border
            border-white/10
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-5xl font-black text-indigo-300">
              {users.length}
            </h2>

            <p className="text-gray-400 mt-4">Total Users</p>
          </div>
          <div
            className="
                w-20
                h-20
                rounded-3xl
                bg-indigo-500/10
                border
                border-indigo-500/20
                flex
                items-center
                justify-center
              "
          >
            <PiUsersThreeFill size={40} className="text-indigo-300" />
          </div>
        </div>

        {/* admins */}
        <div
          className="
            bg-gradient-to-br
            from-[#111827]
            to-[#0F172A]
            border
            border-white/10
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-5xl font-black text-amber-300">
              {users.filter((user) => user.role === "admin").length}
            </h2>

            <p className="text-gray-400 mt-4">Total Admins</p>
          </div>

          <div
            className="
                w-20
                h-20
                rounded-3xl
                bg-amber-500/10
                border
                border-amber-500/20
                flex
                items-center
                justify-center
              "
          >
            <MdAdminPanelSettings size={40} className="text-amber-300" />
          </div>
        </div>

        {/* creators */}
        <div
          className="
            bg-gradient-to-br
            from-[#111827]
            to-[#0F172A]
            border
            border-white/10
            rounded-[30px]
            p-8
            shadow-2xl
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-5xl font-black text-emerald-300">
              {users.filter((user) => user.totalLessons > 0).length}
            </h2>

            <p className="text-gray-400 mt-4">Lessons Creators</p>
          </div>

          <div
            className="
                w-20
                h-20
                rounded-3xl
                bg-emerald-500/10
                border
                border-emerald-500/20
                flex
                items-center
                justify-center
              "
          >
            <BookOpen size={40} className="text-emerald-300" />
          </div>
        </div>

        {/* banned users */}
        <div
          className="
    bg-gradient-to-br
    from-[#111827]
    to-[#0F172A]
    border
    border-white/10
    rounded-[30px]
    p-8
    shadow-2xl
    flex
    items-center
    justify-between
  "
        >
          <div>
            <h2 className="text-5xl font-black text-rose-300">
              {users.filter((user) => user.isBanned).length}
            </h2>

            <p className="text-gray-400 mt-4">Banned Users</p>
          </div>

          <div
            className="
      w-20
      h-20
      rounded-3xl
      bg-rose-500/10
      border
      border-rose-500/20
      flex
      items-center
      justify-center
    "
          >
            <FaUsersSlash size={40} className="text-rose-300" />
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
        bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent 
      "
          >
            Users Directory
          </h2>

          <p className="text-gray-400 mt-2">Search users by name or email</p>
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
        text-gray-400
      "
          />

          <input
            type="text"
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" w-full pl-14 pr-5 py-4 rounded-2xl bg-[#111827] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300
      "
          />
        </div>
      </div>

      {/* table */}
      <div
        className="
          overflow-x-auto
          bg-gradient-to-br
          from-[#111827]
          to-[#0F172A]
          border
          border-white/10
          rounded-[32px]
          shadow-2xl
        "
      >
        <table className="table text-white">
          <thead>
            <tr className="border-b border-white/10 text-gray-300">
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
                    <Users size={70} className="text-indigo-400" />

                    {/* title */}
                    <h2
                      className="
              mt-8
              text-4xl
              font-black
              text-white
            "
                    >
                      No Users Found
                    </h2>

                    {/* description */}
                    <p
                      className="
              text-gray-400
              mt-4
              max-w-md
              leading-8
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
                    border-white/5
                    hover:bg-white/[0.03]
                    transition-all
                    duration-300
                  "
                >
                  {/* serial */}
                  <td className="font-semibold text-gray-400">{index + 1}</td>

                  {/* user */}
                  <td className="py-5">
                    <div className="flex items-center gap-5">
                      {/* image */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-20"></div>

                        <img
                          src={
                            user.photo || "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          className="
                            relative
                            w-16
                            h-16
                            rounded-full
                            object-cover
                            border
                            border-white/10
                          "
                        />
                      </div>

                      {/* content */}
                      <div>
                        <h2 className="font-bold text-lg bg-gradient-to-r from-[#D8B4FE] via-[#A78BFA] to-[#818CF8] bg-clip-text text-transparent ">
                          {user.name}
                        </h2>

                        <p className="text-sm text-cyan-400 mt-1">
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
                            px-4
                            py-2
                            rounded-full
                            bg-amber-500/10
                            text-amber-200
                            border
                            border-amber-500/20
                            text-xs
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
                            px-4
                            py-2
                            rounded-full
                            bg-indigo-500/10
                            text-indigo-200
                            border
                            border-indigo-500/20
                            text-xs
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
                        px-4
                        py-2
                        rounded-full
                        bg-emerald-500/10
                        text-emerald-200
                        border
                        border-emerald-500/20
                        text-sm
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
          px-4
          py-2
          rounded-full
          bg-rose-500/10
          text-rose-300
          border
          border-rose-500/20
          text-xs
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
          px-4
          py-2
          rounded-full
          bg-emerald-500/10
          text-emerald-300
          border
          border-emerald-500/20
          text-xs
          font-semibold
        "
                      >
                        Active
                      </span>
                    )}
                  </td>

                  {/* actions */}
                  <td>
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* make admin */}
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="
                              px-5
                              py-3
                              rounded-2xl
                              bg-indigo-500/10
                              text-indigo-200
                              border
                              border-indigo-500/20
                              flex
                              items-center
                              gap-2
                              font-semibold
                              hover:bg-indigo-500
                              hover:text-white
                              transition-all
                              duration-300
                            "
                        >
                          <Shield size={18} />
                          Make Admin
                        </button>
                      )}

                      {/* BAN / UNBAN */}
                      <button
                        onClick={() => handleBanToggle(user)}
                        className={`
        px-5
        py-3
        rounded-2xl
        border
        flex
        items-center
        gap-2
        font-semibold
        transition-all
        duration-300

        ${
          user.isBanned
            ? `
          bg-emerald-500/10
          text-emerald-300
          border-emerald-500/20
          hover:bg-emerald-500
          hover:text-white
          `
            : `
          bg-rose-500/10
          text-rose-300
          border-rose-500/20
          hover:bg-rose-500
          hover:text-white
          `
        }
      `}
                      >
                        {user.isBanned ? "Unban" : "Ban"}

                        {user.isBanned ? "" : <FaBan size={18} />}
                      </button>

                      {/* delete */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="
                          w-12
                          h-12
                          rounded-2xl
                          bg-rose-500/10
                          text-rose-300
                          border
                          border-rose-500/20
                          flex
                          items-center
                          justify-center
                          hover:bg-rose-500
                          hover:text-white
                          transition-all
                          duration-300
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
