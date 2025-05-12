const formatDateTimeIsoString = (dateIsoString: string): string => {
  const date = new Date(dateIsoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("pt-BR", options);
};

export const dateUtil = {
  formatDateTimeIsoString,
};
