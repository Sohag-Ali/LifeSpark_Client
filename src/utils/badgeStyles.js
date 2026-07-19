// Shared soft-badge color mapping for lesson category/tone/access chips,
// reused across Favorites, MyLessons, and the admin tables. Tailwind needs
// complete static class strings (it can't resolve `bg-${token}/10`
// template interpolation), so every combination is spelled out here once
// instead of being duplicated per-file.
export const DEFAULT_BADGE_CLASS = "bg-base-300 text-base-content border-border";

export const CATEGORY_BADGE_CLASS = {
  Mindset: "bg-primary/10 text-primary border-primary/20",
  Career: "bg-info/10 text-info border-info/20",
  Relationships: "bg-secondary/10 text-secondary border-secondary/20",
  Education: "bg-info/10 text-info border-info/20",
  Health: "bg-error/10 text-error border-error/20",
  "Mistakes Learned": "bg-warning/10 text-warning border-warning/20",
  "Personal Growth": "bg-success/10 text-success border-success/20",
};

export const TONE_BADGE_CLASS = {
  Motivational: "bg-warning/10 text-warning border-warning/20",
  Sad: "bg-info/10 text-info border-info/20",
  Happy: "bg-accent/10 text-accent border-accent/20",
  Inspirational: "bg-primary/10 text-primary border-primary/20",
  Gratitude: "bg-success/10 text-success border-success/20",
  Realization: "bg-secondary/10 text-secondary border-secondary/20",
};

export const ACCESS_BADGE_CLASS = {
  Premium: "bg-warning/10 text-warning border-warning/20",
  Free: "bg-success/10 text-success border-success/20",
};

export const badgeClass = (map, key) => map[key] || DEFAULT_BADGE_CLASS;
