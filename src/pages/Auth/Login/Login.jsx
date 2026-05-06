import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import toast from "daisyui/components/toast";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";



const Login = () => {
const {register, handleSubmit, formState: {errors}} = useForm();
const {loginUser} = useAuth();
const location = useLocation();
const navigate = useNavigate();
const  handleLogin = (data) => {
  console.log(data);
  loginUser(data.email, data.password)
  .then(result => {
    const user = result.user;
    console.log(user);
    toast.success("Login successful!");
    navigate(location?.state || "/"); // Redirect to the page they were trying to access or the home page
  })
  .catch(error => {
    console.error(error);
    toast.error("Login failed. Please check your credentials and try again.");
  });
}

         return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-6">
        
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {required: true})}
              placeholder="Enter your email"
              className="input input-bordered focus:input-primary w-full"
              required
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {required: true,
                minLength: {value: 6,
                message: "Password must be at least 6 characters"
              }})
              }
              placeholder="Enter your password"
              className="input input-bordered focus:input-primary w-full"
              required
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
            )}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary w-full mt-2">
            Login
          </button>
        </form>

        <SocialLogin></SocialLogin>

        {/* Register Link */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link
           state={location.state}
           to="/register" className="link link-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;