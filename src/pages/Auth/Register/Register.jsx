import toast from "daisyui/components/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Register = () => {
   const [show, setShow] = useState(false);
   const {register, handleSubmit, formState: {errors}} = useForm();
   const {registerUser, updateUserProfile} = useAuth();

   const location = useLocation();
   const navigate = useNavigate();
   const axiosSecure = useAxiosSecure();
   

   const  handleRegister = (data) => {
    console.log(data);
    registerUser(data.email, data.password, data.name, data.photoUrl)
    .then(result => {
      const user = result.user;
      console.log(user);

      updateUserProfile(data.name, data.photoUrl)
      .then(() => {
        console.log("Profile updated successfully");
        const userInfo = {
          name: data.name,
          email: data.email,
          photo: data.photoUrl
        };
        axiosSecure.post('/users', userInfo)
        .then(res => {
          console.log("User info saved to database:", res.data);
        })
        .catch(error => {
          console.error("Error saving user info to database:", error);
        });

        


        navigate(location?.state || "/"); // Redirect to the page they were trying to access or the home page
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      });

      toast.success("Registration successful!");
    })
    .catch(error => {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    });
   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-6">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {required: true})}
              placeholder="Enter your name"
              className="input input-bordered focus:input-primary w-full"
              required
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              {...register("photoUrl")}
              placeholder="Enter your photo URL"
              className="input input-bordered focus:input-primary w-full"
            />
            
          </div>

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
            <label className="label flex justify-between">
              <span className="label-text">Password</span>
              <span
                onClick={() => setShow(!show)}
                className="text-xs cursor-pointer link"
              >
                {show ? "Hide" : "Show"}
              </span>
            </label>
            <input
              type={show ? "text" : "password"}
                {...register("password", {required: true,
                    minLength: {value: 6, message: "Password must be at least 6 characters"},
                    pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/, message: "Must include uppercase & lowercase letters and a number"}
                })}
              placeholder="Enter your password"
              className="input input-bordered focus:input-primary w-full"
              required
            />
             {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button className="btn btn-primary w-full mt-2">
            Register
          </button>
        </form>

        <SocialLogin></SocialLogin>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link 
          state={location.state}
          to="/login" className="link link-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;