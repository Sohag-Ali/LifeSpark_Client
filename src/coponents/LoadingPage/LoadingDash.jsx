

const LoadingDash = ({ children }) => {
     return (

    <div
      className="
        min-h-[70vh]
        flex
        items-center
        justify-center
      "
    >

      <div className="text-center">

        {/* spinner */}
        <div
          className="
            w-16
            h-16
            border-4
            border-primary/20
            border-t-primary
            rounded-full
            animate-spin
            mx-auto
          "
        >
        </div>

        <h2
          className="
            mt-6
            text-xl
            font-bold
            text-base-content
          "
        >

          Loading Dashboard...

        </h2>

        {children}

      </div>

    </div>
  );
};

export default LoadingDash;