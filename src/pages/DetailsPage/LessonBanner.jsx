import AuthorSection from "./AuthorSection";
import EngagementSection from "./EngagementSection";
import InteractionButton from "./InteractionButton";
import LessonMetadata from "./LessonMetadata";

// Tailwind's scanner needs complete, static class strings — it can't see
// through `bg-${token}/10` template interpolation — so each combination is
// spelled out in full here rather than built dynamically.
const SOFT_BADGE_CLASS = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  info: "bg-info/10 text-info border-info/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
};

const CATEGORY_TOKEN = {
  Mindset: "primary",
  Career: "info",
  Relationships: "secondary",
  "Personal Growth": "success",
};

const TONE_TOKEN = {
  Motivational: "warning",
  Sad: "info",
  Happy: "accent",
  Gratitude: "success",
  Realization: "secondary",
};

const softBadgeClass = (token = "accent") => SOFT_BADGE_CLASS[token] || SOFT_BADGE_CLASS.accent;

const LessonBanner = ({ lesson, refetch }) => {
   return (
    <div
      className="
        bg-card
        border
        border-border
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
            from-card
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
            className={`px-4 py-2 rounded-full text-xs font-semibold border ${softBadgeClass(
              CATEGORY_TOKEN[lesson.category]
            )}`}
          >
            {lesson.category}
          </span>

          {/* emotional tone */}
          <span
            className={`px-4 py-2 rounded-full text-xs font-semibold border ${softBadgeClass(
              TONE_TOKEN[lesson.emotionalTone] || "primary"
            )}`}
          >
            {lesson.emotionalTone}
          </span>

          {/* access */}
          <span
            className={`px-4 py-2 rounded-full text-xs font-semibold border ${softBadgeClass(
              lesson.accessLevel === "Premium" ? "warning" : "success"
            )}`}
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
            text-gradient-brand
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
              text-accent
              mb-5
            "
          >
            Full Story / Insight
          </h2>

          <p
            className="
              text-base-content/90
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

        {/* <div>
          <SimilarLesson lesson={lesson}></SimilarLesson>
        </div> */}


      </div>

    </div>
  );
};

export default LessonBanner;
