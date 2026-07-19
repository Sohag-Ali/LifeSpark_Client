import useTitle from "../../hooks/useTitle";


const PaymentCancel = () => {
  return (
    useTitle("Payment Cancelled"),
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Animated Icon Container */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-error border-r-error/70 animate-spin"></div>

            {/* Inner pulsing circle */}
            <div className="absolute inset-4 rounded-full bg-error/20 animate-pulse"></div>

            {/* Icon center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-error animate-bounce"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-error animate-fadeIn">
            Payment Cancelled
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Your payment was not processed. No charges have been applied to your account.
          </p>

          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
            <p className="text-warning text-sm">
              💡 If this was unexpected, you can retry your payment or contact our support team.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href="/pricing"
            className="w-full px-6 py-3 bg-error hover:brightness-110 text-error-content font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 1119.414 5.414 1 1 0 00-1.414-1.414A5.002 5.002 0 104.659 9.22V5a1 1 0 01-1-1V3a1 1 0 011-1h3a1 1 0 011 1v2a1 1 0 01-1 1H4zm9 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Try Again
          </a>

          <a

            href="/"
            className="w-full px-6 py-3 bg-base-300 hover:bg-hover text-base-content font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Back to Home
          </a>
        </div>

        {/* Support Link */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            Need help?{" "}
            <a
              href="#"
              className="text-info hover:text-info/80 font-semibold transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentCancel;
