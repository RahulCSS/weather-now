export function formatToDayAndDate(isoString) {
  const d = new Date(isoString);

  const day = d.toLocaleDateString("en-US", { weekday: "long" });
  const date = d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return { day, date };
}