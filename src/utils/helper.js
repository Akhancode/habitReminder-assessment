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
