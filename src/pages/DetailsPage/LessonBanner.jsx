import AuthorSection from "./AuthorSection";
import EngagementSection from "./EngagementSection";
import InteractionButton from "./InteractionButton";
import LessonMetadata from "./LessonMetadata";


const LessonBanner = ({ lesson, refetch }) => {
   return (
    <div
      className="
        bg-gradient-to-br
        from-[#111827]
        to-[#0F172A]
        border
        border-white/10
        shadow-2xl
        rounded-[32px]
        overflow-hidden
      "
    >

      {/* IMAGE */}
      <div className="relative">

        <img
          src={lesson.image}
          alt={lesson.title}
          className="
            w-full
            h-[300px]
            md:h-[500px]
            object-cover
          "
        />

        {/* overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#0F172A]
            via-black/20
            to-transparent
          "
        ></div>

      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-10">

        {/* badges */}
        <div className="flex flex-wrap gap-3 mb-6">

          {/* category */}
          <span
            className={`
              px-4
              py-2
              rounded-full
              text-xs
              font-semibold
              border

              ${
                lesson.category === "Mindset"
                  ? "bg-violet-500/10 text-violet-200 border-violet-500/20"

                  : lesson.category === "Career"
                  ? "bg-sky-500/10 text-sky-200 border-sky-500/20"

                  : lesson.category === "Relationships"
                  ? "bg-pink-500/10 text-pink-200 border-pink-500/20"

                  : lesson.category === "Personal Growth"
                  ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"

                  : "bg-indigo-500/10 text-indigo-200 border-indigo-500/20"
              }
            `}
          >
            {lesson.category}
          </span>

          {/* emotional tone */}
          <span
            className={`
              px-4
              py-2
              rounded-full
              text-xs
              font-semibold
              border

              ${
                lesson.emotionalTone === "Motivational"
                  ? "bg-yellow-500/10 text-yellow-200 border-yellow-500/20"

                  : lesson.emotionalTone === "Sad"
                  ? "bg-blue-500/10 text-blue-200 border-blue-500/20"

                  : lesson.emotionalTone === "Happy"
                  ? "bg-orange-500/10 text-orange-200 border-orange-500/20"

                  : lesson.emotionalTone === "Gratitude"
                  ? "bg-green-500/10 text-green-200 border-green-500/20"

                  : lesson.emotionalTone === "Realization"
                  ? "bg-pink-500/10 text-pink-200 border-pink-500/20"

                  : "bg-purple-500/10 text-purple-200 border-purple-500/20"
              }
            `}
          >
            {lesson.emotionalTone}
          </span>

          {/* access */}
          <span
            className={`
              px-4
              py-2
              rounded-full
              text-xs
              font-semibold
              border

              ${
                lesson.accessLevel === "Premium"
                  ? "bg-amber-500/10 text-amber-200 border-amber-500/20"

                  : "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
              }
            `}
          >
            {lesson.accessLevel}
          </span>

        </div>

        {/* TITLE */}
        <h1
          className="
            text-3xl
            md:text-5xl
            font-black
            leading-tight
            text-white
          "
        >
          {lesson.title}
        </h1>

        {/* description */}
        <div className="mt-10">

          <h2
            className="
              text-2xl
              font-bold
              text-white
              mb-5
            "
          >
            Full Story / Insight
          </h2>

          <p
            className="
              text-gray-300
              text-lg
              leading-10
              whitespace-pre-line
            "
          >
            {lesson.description}
          </p>

        </div>

        <div>
         <LessonMetadata lesson={lesson}></LessonMetadata>
        </div>

        <div>
         <InteractionButton lesson={lesson}  refetch={refetch}></InteractionButton>
        </div>

        <div>
         <EngagementSection lesson={lesson}></EngagementSection>
        </div>

        <div>
         <AuthorSection lesson={lesson}></AuthorSection>
        </div>


      </div>

    </div>
  );
};

export default LessonBanner;