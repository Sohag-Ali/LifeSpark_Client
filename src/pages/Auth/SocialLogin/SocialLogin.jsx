
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleGoogleLogin = () => {
        signInWithGoogle()
        .then(result => {
            console.log(result);
            const user = result.user;
            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
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
            console.error(error);
        });
    };

    return (
        <div>
            <div className="divider">OR</div>
            
                    {/* Google Login */}
                    <button className="btn btn-outline w-full flex items-center gap-2" onClick={handleGoogleLogin}>
                      <FcGoogle size={20} />
                      Continue with Google
                    </button>
        </div>
    );
};

export default SocialLogin;