import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import loginImg from "../../../assets/loginImage.jpeg";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiox from "../../../hooks/useAxiox";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiox();

  // Handle Login
  const handleLogin = (data) => {
    console.log(data);
      console.log("FORM DATA:", data);
    loginUser(data.email, data.password)
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

  // check banned user
  const res =
  await axiosInstance.get(

    `/users/email/${user.email}`
  );

  // banned check
  if(res.data?.isBanned){

    return navigate('/banned');
  }

        Swal.fire({
          title: "Login successful!",
          icon: "success",
          background: "rgba(255,255,255,0.08)",
          backdrop: `rgba(0,0,0,0.4)`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          customClass: {
            popup:
              "rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl",
            title: "text-white",
            htmlContainer: "text-gray-300",
          },
        });
        navigate(location?.state || "/"); // Redirect to the page they were trying to access or the home page
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Login Failed!",
          text: "Please check your email and password.",
          icon: "error",

          background: "rgba(15, 23, 42, 0.75)",
          color: "#ffffff",

          backdrop: `
    rgba(0,0,0,0.5)
    blur(10px)
  `,

          showConfirmButton: true,
          confirmButtonText: "Try Again",
          confirmButtonColor: "#7C3AED",

          customClass: {
            popup:
              "rounded-3xl border border-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
            title: "!text-white",
            htmlContainer: "!text-gray-300",
            confirmButton: "rounded-xl px-6 py-3 font-semibold",
          },
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#312E81] to-[#7C3AED] flex items-center justify-center px-4 py-10">
      {/* Main Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
        {/* LEFT SIDE - LOGIN FORM */}
        <div className="bg-white/10 backdrop-blur-xl border-r border-white/10 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white/70">
              Sign In To Your Journey ✨
            </h2>

            {/* <p className="text-gray-200 mt-3">
              Continue your journey of wisdom, growth and life lessons.
            </p> */}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-200">
                Email
              </label>

              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition backdrop-blur-md"
              />

              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-200">
                Password
              </label>

              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition backdrop-blur-md"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}

              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm text-violet-300 hover:text-violet-200 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#4F46E5] hover:from-[#8B5CF6] hover:via-[#7C3AED] hover:to-[#4338CA] text-white font-semibold hover:scale-[1.02] transition duration-300 shadow-lg">
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin />
          </div>

          {/* Register */}
          <p className="text-center mt-6 text-gray-200">
            Don’t have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="text-violet-300 hover:text-violet-200 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE SECTION */}
        <div className="hidden lg:flex relative items-center justify-center overflow-hidden">
          {/* Background Image */}
          <img
            src={loginImg}
            alt="Login Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 text-white px-10 text-center">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Your Journey <br /> Your Lessons
            </h1>

            <p className="text-lg text-gray-200 leading-relaxed">
              Preserve your memories, reflections and life experiences in one
              meaningful digital space.
            </p>

            {/* Small Badge */}
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                📖 12K+ Lessons
              </div>

              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                ⭐ Premium Wisdom
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
