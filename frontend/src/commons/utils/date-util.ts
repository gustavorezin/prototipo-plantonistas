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

const formatToDatetimeLocal = (dateIsoString: string) => {
  const date = new Date(dateIsoString);
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
  return localISOTime;
};

export const dateUtil = {
  formatDateTimeIsoString,
  formatToDatetimeLocal,
};
