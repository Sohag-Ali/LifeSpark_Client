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
          background: "var(--color-card)",
          backdrop: `rgba(0,0,0,0.4)`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          customClass: {
            popup:
              "rounded-3xl border border-border backdrop-blur-xl shadow-2xl",
            title: "text-base-content",
            htmlContainer: "text-muted-foreground",
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

          background: "var(--color-card)",
          color: "var(--color-card-foreground)",

          backdrop: `
    rgba(0,0,0,0.5)
    blur(10px)
  `,

          showConfirmButton: true,
          confirmButtonText: "Try Again",
          confirmButtonColor: "var(--color-primary)",

          customClass: {
            popup:
              "rounded-3xl border border-border backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
            title: "!text-base-content",
            htmlContainer: "!text-muted-foreground",
            confirmButton: "rounded-xl px-6 py-3 font-semibold",
          },
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* background blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-3xl rounded-full"></div>

      {/* Main Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-card/70 backdrop-blur-lg border border-border relative z-10">
        {/* LEFT SIDE - LOGIN FORM */}
        <div className="bg-card/40 backdrop-blur-xl border-r border-border p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-base-content">
              Sign In To Your Journey ✨
            </h2>

            {/* <p className="text-muted-foreground mt-3">
              Continue your journey of wisdom, growth and life lessons.
            </p> */}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-base-content/80">
                Email
              </label>

              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-input border border-border text-base-content placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition backdrop-blur-md"
              />

              {errors.email?.type === "required" && (
                <p className="text-error text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-base-content/80">
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
                className="w-full px-4 py-3 rounded-xl bg-input border border-border text-base-content placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition backdrop-blur-md"
              />

              {errors.password?.type === "required" && (
                <p className="text-error text-sm mt-1">
                  Password is required
                </p>
              )}

              {errors.password?.type === "minLength" && (
                <p className="text-error text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button className="w-full py-3 rounded-xl bg-gradient-brand hover:brightness-110 text-primary-content font-semibold hover:scale-[1.02] transition duration-300 shadow-glow">
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin />
          </div>

          {/* Register */}
          <p className="text-center mt-6 text-base-content/80">
            Don’t have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="text-primary hover:text-primary/80 font-semibold hover:underline"
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
