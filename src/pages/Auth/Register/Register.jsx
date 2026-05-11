import { useState } from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import registerImg from "../../../assets/loginImage.jpeg";
import { Eye, EyeOff } from "lucide-react";
import useAxiox from "../../../hooks/useAxiox";

const Register = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiox();

  // handle registration
  const handleRegister = (data) => {
    console.log(data);

    registerUser(data.email, data.password, data.name, data.photoUrl)
      .then(async(result) => {
        const user = result.user;
        // firebase token
const token =
await user.getIdToken();

localStorage.setItem(

   'access-token',

   token
);
        console.log(user);

        // Update user profile with name and photo URL
        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            console.log("Profile updated successfully");
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: data.photoUrl,
            };
            axiosInstance
              .post("/users", userInfo)
              .then((res) => {
                console.log("User info saved to database:", res.data);
              })
              .catch((error) => {
                console.error("Error saving user info to database:", error);
              });

            navigate(location?.state || "/"); // Redirect to the page they were trying to access or the home page
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });


        Swal.fire({
          title: "Welcome Aboard ✨",
          text: "Your account has been created successfully.",
          icon: "success",
          background: "rgba(255,255,255,0.08)",
          color: "#fff",
          backdrop: ` rgba(15, 23, 42, 0.7) blur(8px)`,
          showConfirmButton: true,
          confirmButtonText: "Continue",
          confirmButtonColor: "#7C3AED",
          customClass: {
            popup:
              "rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl",
            title: "text-white",
            htmlContainer: "text-gray-300",
            confirmButton: "px-6 py-3 rounded-xl text-white font-semibold",
          },
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
          background: "rgba(255,255,255,0.08)",
          color: "#fff",
          backdrop: ` rgba(15, 23, 42, 0.7) blur(8px)`,
          showConfirmButton: true,
          confirmButtonText: "Try Again",
          confirmButtonColor: "#7C3AED",
          customClass: {
            popup:
              "rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl",
            title: "text-white",
            htmlContainer: "text-gray-300",
            confirmButton: "px-6 py-3 rounded-xl text-white font-semibold",
          },
        });

      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#312E81] to-[#7C3AED] flex items-center justify-center px-4 py-10">
      {/* Main Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] bg-white/10 backdrop-blur-lg border border-white/10">
        {/* LEFT SIDE */}
        <div className="bg-white/10 backdrop-blur-xl border-r border-white/10 p-8 md:p-14 flex flex-col justify-center">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white/70 leading-tight">
              Create Your Account ✨
            </h2>
            {/* <p className="text-gray-200 mt-4 text-lg leading-relaxed">
              Create your account and preserve your thoughts,
              wisdom and meaningful life experiences.
            </p> */}
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
            {/* NAME */}
            <div>
              <label className="block mb-2 font-medium text-gray-200">
                Name
              </label>

              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-gray-100 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 hover:bg-white/15 transition-all duration-300 backdrop-blur-md"
              />

              {errors.name && (
                <span className="text-red-400 text-sm mt-1">
                  Name is required
                </span>
              )}
            </div>

            {/* PHOTO URL */}
            <div>
              <label className="block mb-2 font-medium text-gray-200">
                Photo URL
              </label>

              <input
                type="text"
                {...register("photoUrl")}
                placeholder="Enter your photo URL"
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-gray-100 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 hover:bg-white/15 transition-all duration-300 backdrop-blur-md"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-medium text-gray-200">
                Email
              </label>

              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-gray-100 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 hover:bg-white/15 transition-all duration-300 backdrop-blur-md"
              />

              {errors.email?.type === "required" && (
                <p className="text-red-400 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="flex justify-between mb-2 font-medium text-gray-200">
                <span>Password</span>

                {/* <span
                  onClick={() => setShow(!show)}
                  className="text-sm cursor-pointer text-violet-300 hover:text-violet-200 transition"
                >
                  {show ? "Hide" : "Show"}
                </span> */}
              </label>

              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/,
                      message:
                        "Must include uppercase & lowercase letters and a number",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-14 rounded-2xl bg-white/10 border border-white/15 text-gray-100 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 hover:bg-white/15 transition-all duration-300 backdrop-blur-md"
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
                >
                  {show ? <Eye size={24} /> : <EyeOff size={24} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#4F46E5] hover:from-[#8B5CF6] hover:via-[#7C3AED] hover:to-[#4338CA] text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(124,58,237,0.45)] transition-all duration-300">
              Create Account
            </button>
          </form>

          {/* SOCIAL LOGIN */}
          <div className="mt-6">
            <SocialLogin />
          </div>

          {/* LOGIN LINK */}
          <p className="text-center mt-6 text-gray-200">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-violet-300 hover:text-violet-200 font-semibold transition"
            >
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex relative items-center justify-center overflow-hidden">
          {/* IMAGE */}
          <img
            src={registerImg}
            alt="Register Visual"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* CONTENT */}
          <div className="relative z-10 text-white px-10 text-center">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Build Your <br /> Digital Wisdom
            </h1>

            <p className="text-lg text-gray-200 leading-relaxed">
              Join a meaningful platform where your lessons, reflections and
              personal growth stories live forever.
            </p>

            {/* BADGES */}
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                🌱 Personal Growth
              </div>

              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                📖 Life Reflections
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
