import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiox from "../../../hooks/useAxiox";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiox();

  // Handle Google Login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(async(result) => {

  console.log(result);

  const user = result.user;

  // firebase token
  const token =
  await user.getIdToken();

  localStorage.setItem(

     'access-token',

     token
  );

  // check banned user
  const checkUser =
  await axiosInstance.get(

    `/users/email/${user.email}`
  );

  // banned user
  if(checkUser.data?.isBanned){

    return navigate('/banned');
  }
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        await axiosInstance
          .post("/users", userInfo)
          .then((res) => {
            console.log("User info saved to database:", res.data);
          })
          .catch((error) => {
            console.error("Error saving user info to database:", error);
          });
        Swal.fire({
          title: "Welcome Back ✨",
          text: "Login successful!",
          icon: "success",

          background: "rgba(15, 23, 42, 0.75)",
          color: "#ffffff",

          backdrop: `rgba(0,0,0,0.5)blur(10px)`,

          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,

          customClass: {
            popup:
              "rounded-3xl border border-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
            title: "!text-white",
            htmlContainer: "!text-gray-300",
          },
        });
        navigate(location?.state || "/"); // Redirect to the page they were trying to access or the home page
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Login Failed!",
          text: "There was an error logging in with Google.",
          icon: "error",
          background: "rgba(15, 23, 42, 0.75)",
          color: "#ffffff",
          backdrop: `rgba(0,0,0,0.5)blur(10px)`,
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
    <div>
      <div className="divider">OR</div>

      {/* Google Login */}
      <button
        className="btn btn-outline flex items-center w-full py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md  justify-center gap-3 text-white font-medium text-lg hover:bg-white/15 transition-all duration-300"
        onClick={handleGoogleLogin}
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
