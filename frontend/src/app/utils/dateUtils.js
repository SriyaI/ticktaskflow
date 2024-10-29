import { addDays, addWeeks, addMonths, addYears } from "date-fns";

export const getRecurringDates = (startDate, recurrence) => {
  const dates = [];
  let nextDate = new Date(startDate);

  for (let i = 0; i < 5; i++) {  // Generate the next 5 recurring dates
    switch (recurrence) {
      case "daily":
        nextDate = addDays(nextDate, 1);
        break;
      case "weekly":
        nextDate = addWeeks(nextDate, 1);
        break;
      case "monthly":
        nextDate = addMonths(nextDate, 1);
        break;
      case "yearly":
        nextDate = addYears(nextDate, 1);
        break;
      default:
        return [];
    }
    dates.push(nextDate);
  }
  return dates;
};
