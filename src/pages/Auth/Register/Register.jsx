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
  const handleRegister = async(data) => {
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
        await updateUserProfile(data.name, data.photoUrl)
          .then(async() => {
            console.log("Profile updated successfully");
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: data.photoUrl,
            };
            await axiosInstance
              .post("/users", userInfo)
              .then((res) => {
                console.log("User info saved to database:", res.data);
              })
              .catch((error) => {
                console.error("Error saving user info to database:", error);
              });

            navigate(location?.state || "/");
            window.location.reload(); // Redirect to the page they were trying to access or the home page
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });


        Swal.fire({
          title: "Welcome Aboard ✨",
          text: "Your account has been created successfully.",
          icon: "success",
          background: "var(--color-card)",
          color: "var(--color-card-foreground)",
          backdrop: ` rgba(15, 23, 42, 0.7) blur(8px)`,
          showConfirmButton: true,
          confirmButtonText: "Continue",
          confirmButtonColor: "var(--color-primary)",
          customClass: {
            popup:
              "rounded-3xl border border-border backdrop-blur-xl shadow-2xl",
            title: "text-base-content",
            htmlContainer: "text-muted-foreground",
            confirmButton: "px-6 py-3 rounded-xl text-primary-content font-semibold",
          },
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
          background: "var(--color-card)",
          color: "var(--color-card-foreground)",
          backdrop: ` rgba(15, 23, 42, 0.7) blur(8px)`,
          showConfirmButton: true,
          confirmButtonText: "Try Again",
          confirmButtonColor: "var(--color-primary)",
          customClass: {
            popup:
              "rounded-3xl border border-border backdrop-blur-xl shadow-2xl",
            title: "text-base-content",
            htmlContainer: "text-muted-foreground",
            confirmButton: "px-6 py-3 rounded-xl text-primary-content font-semibold",
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
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] bg-card/70 backdrop-blur-lg border border-border relative z-10">
        {/* LEFT SIDE */}
        <div className="bg-card/40 backdrop-blur-xl border-r border-border p-8 md:p-14 flex flex-col justify-center">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-base-content leading-tight">
              Create Your Account ✨
            </h2>
            {/* <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              Create your account and preserve your thoughts,
              wisdom and meaningful life experiences.
            </p> */}
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
            {/* NAME */}
            <div>
              <label className="block mb-2 font-medium text-base-content/80">
                Name
              </label>

              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-base-content placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-hover transition-all duration-300 backdrop-blur-md"
              />

              {errors.name && (
                <span className="text-error text-sm mt-1">
                  Name is required
                </span>
              )}
            </div>

            {/* PHOTO URL */}
            <div>
              <label className="block mb-2 font-medium text-base-content/80">
                Photo URL
              </label>

              <input
                type="text"
                {...register("photoUrl")}
                placeholder="Enter your photo URL"
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-base-content placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-hover transition-all duration-300 backdrop-blur-md"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-medium text-base-content/80">
                Email
              </label>

              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-base-content placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-hover transition-all duration-300 backdrop-blur-md"
              />

              {errors.email?.type === "required" && (
                <p className="text-error text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="flex justify-between mb-2 font-medium text-base-content/80">
                <span>Password</span>

                {/* <span
                  onClick={() => setShow(!show)}
                  className="text-sm cursor-pointer text-primary hover:text-primary/80 transition"
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
                  className="w-full px-4 py-3 pr-14 rounded-2xl bg-input border border-border text-base-content placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-hover transition-all duration-300 backdrop-blur-md"
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-base-content transition"
                >
                  {show ? <Eye size={24} /> : <EyeOff size={24} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-error text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button className="w-full py-3 rounded-2xl bg-gradient-brand hover:brightness-110 text-primary-content font-semibold text-lg hover:scale-[1.02] hover:shadow-glow transition-all duration-300">
              Create Account
            </button>
          </form>

          {/* SOCIAL LOGIN */}
          <div className="mt-6">
            <SocialLogin />
          </div>

          {/* LOGIN LINK */}
          <p className="text-center mt-6 text-base-content/80">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-primary hover:text-primary/80 font-semibold transition"
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
