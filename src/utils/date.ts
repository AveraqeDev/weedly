import {
  differenceInDays,
  isDate,
  parse,
  startOfToday,
  format,
} from "date-fns";

export const parseDateString = (_value: any, originalValue: any) => {
  return parseDate(originalValue);
};

export const parseDate = (date: any) => {
  const parsedDate = isDate(date)
    ? date
    : parse(date, "yyyy-MM-dd", new Date());

  return parsedDate;
};

export const exceedsDays = (date: any, numberOfDays: number) => {
  const today = startOfToday();
  const diff = differenceInDays(today, parseDate(date));
  return diff > numberOfDays;
};

export const exceedsToday = (date: any) => {
  return exceedsDays(date, 0);
};

export const formatDate = (date: any) => {
  const formatedDate = isDate(date)
    ? format(date, "yyyy-MM-dd")
    : date.split("T")[0];

  return formatedDate;
};
