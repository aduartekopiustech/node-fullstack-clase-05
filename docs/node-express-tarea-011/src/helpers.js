const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function eq(left, right) {
  return left === right;
}

export function formatDate(value) {
  if (typeof value !== "string" || value.length === 0) {
    return "";
  }

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return value;
  }

  return dateFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}
