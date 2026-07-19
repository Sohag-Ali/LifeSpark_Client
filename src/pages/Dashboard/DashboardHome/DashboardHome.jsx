import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  ArrowUpRight,
  Bookmark,
  BookOpen,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useTitle from "../../../hooks/useTitle";
import DashboardHomeSkeleton from "../../../coponents/Skeleton/DashboardHomeSkeleton";

const DashboardHome = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  // fetch stats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-stats/${user.email}`);

      return res.data;
    },
  });
    useTitle("Dashboard Overview");

  // fake chart data
  const chartData = [
    {
      month: "Jan",
      lessons: 2,
    },

    {
      month: "Feb",
      lessons: 5,
    },

    {
      month: "Mar",
      lessons: 3,
    },

    {
      month: "Apr",
      lessons: 7,
    },

    {
      month: "May",
      lessons: 4,
    },
  ];

  if (isLoading) {
    return (
      <div className="px-4 md:px-8 py-10">
        {/* heading skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-muted animate-pulse" />
            <div className="flex-grow space-y-2">
              <div className="w-48 h-8 bg-muted rounded animate-pulse" />
              <div className="w-32 h-4 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
        <DashboardHomeSkeleton />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-10">
      {/* heading */}
      <div className="mb-12">
        <div className="flex items-center gap-4">
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-primary/10
              border
              border-primary/20
              flex
              items-center
              justify-center
            "
          >
            <Sparkles className="text-primary" size={30} />
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gradient-brand">
              Dashboard Overview
            </h1>

            <p className="text-muted-foreground text-lg mt-3">
              Welcome back,{" "}
              <span className="font-semibold text-gradient-brand ">
                {" "}
                {user?.displayName}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* stats cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* total lessons */}
        <div
          className="
            relative
            overflow-hidden
            bg-card
            border
            border-border
            rounded-[30px]
            shadow-2xl
            p-8
            hover:-translate-y-1
            hover:border-primary/30
            transition-all
            duration-300
          "
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground">Total Lessons</p>

              <h2 className="text-5xl font-black text-success mt-5">
                {stats.totalLessons || 0}
              </h2>
            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-primary/10
                border
                border-primary/20
                flex
                items-center
                justify-center
              "
            >
              <BookOpen className="text-primary" size={40} />
            </div>
          </div>
        </div>

        {/* favorites */}
        <div
          className="
            relative
            overflow-hidden
            bg-card
            border
            border-border
            rounded-[30px]
            shadow-2xl
            p-8
            hover:-translate-y-1
            hover:border-primary/30
            transition-all
            duration-300
          "
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground">Saved Lessons</p>

              <h2 className="text-5xl font-black text-warning mt-5">
                {stats.totalFavorites || 0}
              </h2>
            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-warning/10
                border
                border-warning/20
                flex
                items-center
                justify-center
              "
            >
              <Bookmark className="text-warning" size={40} />
            </div>
          </div>
        </div>

        {/* quick actions */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-[30px]
            shadow-2xl
            p-8
          "
        >
          <h2 className="text-2xl font-black text-gradient-brand  mb-8">
            Quick Actions
          </h2>

          <div className="space-y-5">
            {/* add lesson */}
            <Link
              to="/dashboard/add-lesson"
              className="
                flex
                items-center
                justify-between
                w-full
                rounded-2xl
                bg-gradient-brand
                px-5
                py-4
                text-primary-content
                font-semibold
                hover:shadow-xl
                hover:shadow-primary/20
                transition-all
                duration-300
              "
            >
              <div className="flex items-center gap-3">
                <PlusCircle size={22} />
                Add Lesson
              </div>

              <ArrowUpRight size={20} />
            </Link>

            {/* my lessons */}
            <Link
              to="/dashboard/my-lessons"
              className="
                flex
                items-center
                justify-between
                w-full
                rounded-2xl
                bg-muted
                border
                border-border
                px-5
                py-4
                text-secondary
                font-semibold
                hover:border-primary/30
                hover:bg-primary/5
                transition-all
                duration-300
              "
            >
              <div className="flex items-center gap-3">
                <BookOpen size={22} />
                My Lessons
              </div>

              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* recent lessons */}
      <div
        className="
          bg-card
          border
          border-border
          rounded-[32px]
          shadow-2xl
          p-8
          mt-12
        "
      >
        <h2 className="text-3xl font-black text-gradient-brand  mb-10">
          Recently Added Lessons
        </h2>

       <div className="space-y-4 md:space-y-5">
  {stats.recentLessons?.length === 0 ? (
    <div
      className="
        text-center
        py-14
        md:py-20
        bg-muted
        border
        border-border
        rounded-[24px]
        md:rounded-[32px]
        px-4
      "
    >
      {/* icon */}
      <div
        className="
          w-20
          h-20
          md:w-24
          md:h-24
          mx-auto
          rounded-full
          bg-primary/10
          flex
          items-center
          justify-center
        "
      >
        <BookOpen
          size={40}
          className="md:w-[50px] md:h-[50px] text-primary"
        />
      </div>

      {/* title */}
      <h2
        className="
          mt-6
          md:mt-8
          text-2xl
          md:text-4xl
          font-black
          text-base-content
        "
      >
        No Lessons Found
      </h2>

      {/* description */}
      <p
        className="
          text-muted-foreground
          mt-4
          max-w-md
          mx-auto
          leading-7
          md:leading-8
          text-sm
          md:text-base
        "
      >
        You haven’t created any lessons yet
      </p>
    </div>
  ) : (
    stats.recentLessons?.map((lesson) => (
      <div
        key={lesson._id}
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
          bg-muted
          border
          border-border
          rounded-2xl
          p-4
          md:p-5
          hover:border-primary/20
          transition-all
          duration-300
        "
      >
        {/* left content */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* image */}
          <div className="shrink-0">
            <img
              src={lesson.image}
              className="
                w-16
                h-16
                md:w-20
                md:h-20
                rounded-2xl
                object-cover
                border
                border-border
              "
            />
          </div>

          {/* text */}
          <div className="min-w-0">
            <h3
              className="
                font-bold
                text-sm
                md:text-lg
                text-base-content
                line-clamp-1
              "
            >
              {lesson.title}
            </h3>

            <p
              className="
                text-accent
                mt-2
                text-xs
                md:text-sm
              "
            >
              {lesson.category}
            </p>
          </div>
        </div>

        {/* button */}
        <Link
          to={`/lesson-details/${lesson._id}`}
          className="
            w-full
            md:w-auto
            text-center
            px-4
            md:px-5
            py-3
            rounded-2xl
            bg-gradient-brand
            text-primary-content
            text-sm
            font-semibold
            hover:shadow-xl
            hover:shadow-primary/20
            transition-all
            duration-300
          "
        >
          View
        </Link>
      </div>
    ))
  )}
</div>
      </div>

      {/* analytics */}
      <div
        className="
          bg-card
          border
          border-border
          rounded-[32px]
          shadow-2xl
          p-8
          mt-12
        "
      >
        <div className="mb-10">
          <h2 className="text-3xl font-black text-gradient-brand ">
            Monthly Contributions
          </h2>

          <p className="text-muted-foreground mt-3">Your lesson activity overview</p>
        </div>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />

              <YAxis stroke="var(--color-muted-foreground)" />

              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.75rem",
                  color: "var(--color-card-foreground)",
                }}
              />

              <Bar dataKey="lessons" radius={[12, 12, 0, 0]} fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
