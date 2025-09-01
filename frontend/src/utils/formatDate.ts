export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "rs-RS",
    options
  );
  return formattedDate.replace(/\//g, " ");
};
