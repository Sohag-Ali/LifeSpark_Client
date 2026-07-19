import { CheckCircle, Crown, XCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";


const Pricing = () => {
  useTitle("Pricing");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  const handleUpgrade = async () => {
    try {
      console.log("button clicked");
      const res = await axiosSecure.post(
        "/create-checkout-session",
        {
          email: user?.email
        }
      );

      // redirect stripe checkout
      window.location.replace(res.data.url);

    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className="min-h-screen bg-base-100  py-20 px-4 relative overflow-hidden">

      {/* background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 blur-3xl rounded-full"></div>

      <div className="bg-base-100">

        {/* heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">

          <span className="text-primary uppercase tracking-[4px] font-semibold">
            Pricing Plans
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-base-content mt-5 leading-tight">
            Upgrade Your Learning Experience
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-8">
            Unlock premium features, create unlimited lessons,
            and enjoy a more powerful LifeSpark experience.
          </p>

        </div>

        {/* pricing cards */}
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* FREE PLAN */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-border
              bg-card/60
              backdrop-blur-xl
              p-10
              hover:-translate-y-2
              hover:border-primary/30
              hover:shadow-primary/20
              hover:shadow-2xl
              transition-all
              duration-500
            "
          >

            {/* glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div className="w-14 h-14 rounded-2xl bg-base-300 flex items-center justify-center">

                  <Crown className="text-base-content" />

                </div>

                <div>

                  <h2 className="text-3xl font-black text-base-content">
                    Free Plan
                  </h2>

                  <p className="text-muted-foreground mt-1">
                    Perfect for beginners
                  </p>

                </div>

              </div>

              {/* price */}
              <div className="mt-10">

                <h1 className="text-6xl font-black text-base-content">
                  ৳0
                </h1>

                <p className="text-muted-foreground mt-2">
                  Forever free access
                </p>

              </div>

              {/* divider */}
              <div className="h-[1px] bg-border my-10"></div>

              {/* features */}
              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/80">
                    Access Public Lessons
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/80">
                    Create Limited Lessons
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/80">
                    Basic Dashboard Access
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <XCircle className="text-error" />
                  <span className="text-muted-foreground">
                    Premium Lesson Creation
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <XCircle className="text-error" />
                  <span className="text-muted-foreground">
                    Priority Lesson Listing
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <XCircle className="text-error" />
                  <span className="text-muted-foreground">
                    Ad-Free Experience
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <XCircle className="text-error" />
                  <span className="text-muted-foreground">
                    Premium Badge
                  </span>
                </div>

              </div>

              {/* button */}
              <button
                className="
                  btn
                  w-full
                  mt-12
                  rounded-full
                  border
                  border-border
                  bg-base-200
                  hover:bg-hover
                  text-base-content
                "
              >
                Current Plan
              </button>

            </div>
          </div>

          {/* PREMIUM PLAN */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-primary/30
              bg-gradient-to-br
              from-primary/10
              to-secondary/10
              backdrop-blur-xl
              p-10
              hover:-translate-y-2
              hover:shadow-primary/30
              hover:shadow-2xl
              transition-all
              duration-500
            "
          >

            {/* popular badge */}
            <div
              className="
                absolute
                top-6
                right-6
                px-5
                py-2
                rounded-full
                bg-gradient-brand
                text-primary-content
                text-sm
                font-semibold
                shadow-lg
              "
            >
              Most Popular ✨
            </div>

            {/* glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5"></div>

            <div className="relative z-10">

              {/* title */}
              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-yellow-400
                    to-orange-500
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  "
                >

                  <Crown className="text-black" />

                </div>

                <div>

                  <h2 className="text-3xl font-black text-base-content">
                    Premium Plan
                  </h2>

                  <p className="text-muted-foreground mt-1">
                    Lifetime premium access
                  </p>

                </div>

              </div>

              {/* price */}
              <div className="mt-10">

                <h1 className="text-6xl font-black text-base-content">
                  ৳1500
                </h1>

                <p className="text-primary mt-2">
                  One-time payment only
                </p>

              </div>

              {/* divider */}
              <div className="h-[1px] bg-border my-10"></div>

              {/* features */}
              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/90">
                    Unlimited Lesson Creation
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/90">
                    Create Premium Lessons
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/90">
                    Priority Lesson Listing
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/90">
                    Ad-Free Experience
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/90">
                    Premium Badge
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/90">
                    Premium Dashboard Features
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-success" />
                  <span className="text-base-content/90">
                    Lifetime Access
                  </span>
                </div>

              </div>

              {/* button */}
              <button
                onClick={handleUpgrade}
                className="
                  btn
                  border-0
                  bg-gradient-brand
                  hover:brightness-110
                  text-primary-content
                  w-full
                  rounded-full
                  mt-12
                  text-lg
                  shadow-glow
                "
              >
                Upgrade to Premium ⭐
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;
