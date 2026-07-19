import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import {  useQueryClient } from "@tanstack/react-query";
import useTitle from "../../hooks/useTitle";


const PaymentSuccess = () => {

  const { user } = useAuth();

   const axiosSecure = useAxiosSecure();

   const navigate = useNavigate();
     const queryClient = useQueryClient();
  const confettiPositions = [8, 22, 36, 52, 68, 84];

   useEffect(() => {

      const updatePremiumUser = async() => {

         const res = await axiosSecure.patch(
            `/users/premium/${user.email}`
         );

         console.log(res.data);
           await queryClient.invalidateQueries(['user']);
      };

      if(user?.email){
         updatePremiumUser();
      }

  }, [user, axiosSecure, queryClient]);

    return (
      useTitle("Payment Successful"),
      <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-success/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-info/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Animated Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              {/* Outer pulse ring */}
              <div className="absolute inset-0 rounded-full bg-success/20 animate-ping"></div>

              {/* Inner circle */}
              <div className="absolute inset-0 rounded-full border-4 border-success bg-success/10 flex items-center justify-center shadow-2xl">
                <svg
                  className="w-16 h-16 text-success animate-scaleIn"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-success animate-fadeInDown">
              Payment Successful!
            </h1>

            <div className="space-y-2">
              <p className="text-base-content text-lg font-semibold animate-fadeInUp">
                Welcome to Premium! 🎉
              </p>
              <p className="text-muted-foreground text-base leading-relaxed animate-fadeInUp" style={{ animationDelay: '2s' }}>
                Your payment has been processed successfully. You now have access to all premium features and exclusive content.
              </p>
            </div>

            {/* Premium Features Preview */}
            <div className="bg-success/10 border border-success/30 rounded-lg p-4 mt-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-success font-semibold mb-3">Your Premium Benefits</h3>
              <ul className="text-base-content/80 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Unlimited Lesson Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ad-Free Experience</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-success hover:brightness-110 text-success-content font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg animate-fadeInUp"
            // style={{ animationDelay: '3s' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Explore Premium Content
          </button>

          {/* Loading Text */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            Your premium access is active. Click the button below when you are ready to continue.
          </p>

          {/* Confetti particles */}
          <div className="absolute inset-0 pointer-events-none">
            {confettiPositions.map((left, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-success rounded-full animate-confetti"
                style={{
                  left: `${left}%`,
                  top: '0',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.3);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(20px);
            }
          }
          @keyframes confetti {
            from {
              opacity: 1;
              transform: translateY(0) rotateZ(0deg);
            }
            to {
              opacity: 0;
              transform: translateY(300px) rotateZ(720deg);
            }
          }
          .animate-fadeInDown {
            animation: fadeInDown 0.6s ease-out forwards;
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          .animate-scaleIn {
            animation: scaleIn 0.6s ease-out forwards;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-confetti {
            animation: confetti 3s ease-out forwards;
          }
        `}</style>
      </div>
    );
};


export default PaymentSuccess;