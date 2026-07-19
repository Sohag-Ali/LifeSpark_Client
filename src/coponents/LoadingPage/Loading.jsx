

const Loading = ({ message = "Loading, please wait..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100">
            <div className="flex flex-col items-center gap-6 bg-card/60 border border-border backdrop-blur-md rounded-2xl p-8 shadow-2xl w-[min(560px,92%)]">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-brand rounded-full shadow-lg transform motion-safe:animate-[spin_8s_linear_infinite]">
                        <svg className="w-10 h-10 text-primary-content" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-base-content text-lg font-semibold">LifeSpark</h3>
                        <p className="text-muted-foreground text-sm">Preparing your experience</p>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-primary animate-spin" aria-hidden></div>
                    <p className="mt-4 text-base-content text-sm font-medium" role="status" aria-live="polite">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Loading;