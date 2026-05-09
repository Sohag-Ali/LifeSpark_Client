

const BannedPage = () => {
    return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#0F172A]
        px-4
      "
    >

      <div
        className="
          max-w-xl
          w-full
          bg-[#111827]
          border
          border-rose-500/20
          rounded-[36px]
          p-10
          shadow-2xl
          text-center
        "
      >

        {/* icon */}
        <div
          className="
            w-24
            h-24
            mx-auto
            rounded-full
            bg-rose-500/10
            border
            border-rose-500/20
            flex
            items-center
            justify-center
          "
        >

          <span className="text-5xl">
            🚫
          </span>

        </div>

        {/* title */}
        <h1
          className="
            mt-8
            text-5xl
            font-black
            text-rose-300
          "
        >

          Account Banned

        </h1>

        {/* text */}
        <p
          className="
            mt-5
            text-lg
            leading-8
            text-gray-400
          "
        >

          Your account has been restricted
          by the admin team.

          <br />

          You currently cannot access
          platform features.

        </p>

      </div>

    </div>
  );
};

export default BannedPage;