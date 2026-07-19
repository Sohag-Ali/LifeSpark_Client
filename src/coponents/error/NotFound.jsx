import { Link } from "react-router";




const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-100 px-4 py-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-info/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Main Card */}
        <div className="text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[150px] font-black text-gradient-brand animate-pulse">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-brand mx-auto rounded-full mt-4"></div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Page Not Found
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-info mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>

          {/* Description */}
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-8 mb-12 mt-8">
            <svg className="w-16 h-16 text-info mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-muted-foreground text-lg leading-relaxed">
              It seems like you've wandered into the wilderness. The page might have been moved, deleted, or never existed.
            </p>
          </div>

          {/* Info boxes */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-muted border border-border rounded-xl p-5 hover:bg-hover transition-all duration-300">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold text-base-content mb-1">Wrong URL?</h3>
              <p className="text-muted-foreground text-sm">Check the address bar</p>
            </div>
            <div className="bg-muted border border-border rounded-xl p-5 hover:bg-hover transition-all duration-300">
              <div className="text-2xl mb-2">🗺️</div>
              <h3 className="font-semibold text-base-content mb-1">Get Oriented</h3>
              <p className="text-muted-foreground text-sm">Head back to explore</p>
            </div>
            <div className="bg-muted border border-border rounded-xl p-5 hover:bg-hover transition-all duration-300">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-semibold text-base-content mb-1">Need Help?</h3>
              <p className="text-muted-foreground text-sm">Contact our support team</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-brand hover:brightness-110 text-primary-content font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-glow"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>

            <Link
              to="/lessons"
              className="inline-flex items-center justify-center gap-2 bg-muted hover:bg-hover border border-border text-base-content font-semibold py-4 px-8 rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Explore Lessons
            </Link>
          </div>

          {/* Footer note */}
          <p className="text-muted-foreground text-sm mt-12">
            If this keeps happening, please{" "}
            <a href="mailto:support@lifespark.com" className="text-info hover:text-info/80 underline">
              contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
