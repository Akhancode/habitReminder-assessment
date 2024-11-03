import moment from "moment";

export function transformData(data) {
  const result = {};

  data.forEach((item) => {
    const category = item.habitObj.category;
    const date = item.createdAt.split("T")[0]; // Extract the date (YYYY-MM-DD)

    // Initialize category if it doesn't exist
    if (!result[category]) {
      result[category] = [];
    }

    // Check if the date already exists for the current category
    const dateEntry = result[category].find((entry) => entry.date === date);

    if (dateEntry) {
      // Increment count if date entry exists
      dateEntry.count += 1;
    } else {
      // Add new date entry with count 1 if it doesn't exist
      result[category].push({ date: date, count: 1 });
    }
  });

  return result;
}

export const getTodayTime = (time) => {
  const [hours, minutes] = time.split(":");
  const today = new Date();
  today.setHours(hours, minutes, 0, 0); // Set time to the specified hour and minute
  return today;
};
export function getTotalPoints(habits) {
  let totalPoints = 0;

  habits.forEach((habit) => {
    if (habit.streak && habit.streak.points) {
      totalPoints += habit.streak.points;
    }
  });

  return totalPoints;
}

export const BASEURLAZURE = "http://localhost:9000";
("http://gomarble-assessment.centralindia.cloudapp.azure.com");

export function getTodayDayShortFormat() {
  return moment().format("ddd");
}
export function getDayShortFormat(dateISO) {
  return moment(dateISO).format("ddd");
}
export function getWeekData(data) {
  const today = moment();
  const dayOfWeek = today.day(); // Sunday = 0, Monday = 1, ..., Saturday = 6

  let weekStart, weekEnd;

  if (dayOfWeek === 0) {
    // Sunday
    weekStart = today.clone().subtract(6, "days"); // Previous Monday
    weekEnd = today.clone();
  } else if (dayOfWeek === 1) {
    // Monday
    weekStart = today.clone();
    weekEnd = today.clone().add(6, "days"); // Coming Sunday
  } else {
    // Tuesday to Saturday
    weekStart = today.clone().subtract(dayOfWeek - 1, "days"); // Previous Monday
    weekEnd = today.clone().add(7 - dayOfWeek, "days"); // Coming Sunday
  }

  // Filter data within the week range
  return data.filter((entry) => {
    const createdAt = moment(entry.createdAt);
    return createdAt.isBetween(weekStart, weekEnd, "day", "[]"); // Inclusive range
  });
}


export function getISODateForDay(day) {
  const weekDays = {};
  const startOfWeek = moment().startOf('isoWeek'); // Get the start of the week (Monday)

  // Loop through each day of the week (0 to 6 for Mon to Sun)
  for (let i = 0; i < 7; i++) {
      const dayKey = startOfWeek.clone().add(i, 'days').format('ddd'); // Get the day's abbreviation
      const isoDate = startOfWeek.clone().add(i, 'days').toISOString(); // Get the ISO date
      weekDays[dayKey] = isoDate; // Assign the ISO date as the value
  }
  //  weekDays
   return(weekDays[day])
}
