
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();

    const handleGoogleLogin = () => {
        signInWithGoogle()
        .then(result => {
            console.log(result);
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